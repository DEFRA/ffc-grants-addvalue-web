const Hapi = require('@hapi/hapi')
const nunjucks = require('nunjucks')
const path = require('path')
const { version } = require('../package.json')
const vision = require('@hapi/vision')
const inert = require('@hapi/inert')
const config = require('./config/server')
const crumb = require('@hapi/crumb')
const Uuid = require('uuid')
const protectiveMonitoringServiceSendEvent = require('./services/protective-monitoring-service')
const cacheConfig = require('./config/cache')
const catbox = cacheConfig.useRedis ? require('@hapi/catbox-redis') : require('@hapi/catbox-memory')
const authConfig = require('./config/auth')

require('dotenv').config()

async function createServer () {
  const server = Hapi.server({
    port: process.env.PORT,
    cache: [{
      name: 'session',
      provider: {
        constructor: catbox,
        options: cacheConfig.catboxOptions
      }
    }]
  })

  if (authConfig.enabled) {
    await server.register(require('./plugins/auth'))
  }

  await server.register(inert)
  await server.register(vision)
  await server.register(require('./plugins/cookies'))
  await server.register(require('./plugins/error-pages'))
  await server.register({
    plugin: require('./plugins/header'),
    options: {
      keys: [
        { key: 'X-Frame-Options', value: 'deny' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Access-Control-Allow-Origin', value: server.info.uri },
        { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
        { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
        { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
        { key: 'Strict-Transport-Security', value: 'max-age=31536000;' },
        { key: 'Cache-Control', value: 'no-cache' },
        { key: 'Referrer-Policy', value: 'no-referrer' },
        {
          key: 'Content-Security-Policy',
          value: getSecurityPolicy()
        }
      ]
    }
  })
  // GTM Server side
  await server.register({
    plugin: require('./plugins/gapi'),
    options: {
      propertySettings: [
        {
          id: config.googleTagManagerServerKey,
          key: config.analyticsPropertyApi,
          hitTypes: ['pageview']
        }
      ],
      sessionIdProducer: async request => {
        return request.yar ? request.yar.id : Uuid.v4()
      },
      batchSize: 20,
      batchInterval: 15000
    }
  })
  // Session cache redis with yar
  await server.register([
    {
      plugin: require('@hapi/yar'),
      options: {
        maxCookieSize: cacheConfig.useRedis ? 0 : 1024,
        storeBlank: true,
        cache: {
          cache: 'session',
          expiresIn: cacheConfig.expiresIn
        },
        cookieOptions: {
          password: config.cookiePassword,
          isSecure: config.cookieOptions.isSecure,
          ttl: cacheConfig.expiresIn
        },
        customSessionIDGenerator: function (request) {
          const sessionID = Uuid.v4()
          protectiveMonitoringServiceSendEvent(request, sessionID, 'FTF-SESSION-CREATED', '0701')
          return sessionID
        }
      }
    },
    {
      plugin: crumb,
      options: {
        cookieOptions: {
          isSecure: config.cookieOptions.isSecure
        }
      }
    }]
  )

  const routes = [].concat(
    require('./routes/healthy'),
    require('./routes/healthz'),
    require('./routes/start'),
    require('./routes/login'),
    require('./routes/assets'),
    require('./routes/cookies'),
    require('./routes/accessibility'),
    require('./routes/session-timeout'),
    ...require('./routes')
  )
  server.route(routes)

  server.views({
    engines: {
      njk: {
        compile: (src, options) => {
          const template = nunjucks.compile(src, options.environment)
          return context => template.render(context)
        }
      }
    },
    relativeTo: __dirname,
    compileOptions: {
      environment: nunjucks.configure([
        path.join(__dirname, 'templates'),
        path.join(__dirname, 'assets', 'dist'),
        'node_modules/govuk-frontend/'
      ])
    },
    path: './templates',
    context: {
      appVersion: version,
      assetpath: '/assets',
      govukAssetpath: '/assets',
      serviceName: 'FFC Grants Service',
      pageTitle: 'FFC Grants Service',
      googleTagManagerKey: config.googleTagManagerKey,
      analyticsTagKey: config.analyticsTagKey
    }
  })

  return server

  function getSecurityPolicy () {
    return "default-src 'self';" +
            "object-src 'none';" +
            "script-src  'unsafe-hashes' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com/ https://www.google-analytics.com https://www.googletagmanager.com/gtm.js" +
            "form-action 'self';" +
            "base-uri 'self';" +
            "connect-src 'self' https://www.google-analytics.com;" +
            "style-src 'self' 'unsafe-inline' https://tagmanager.google.com https://fonts.googleapis.com;" +
            "img-src 'self' data: ssl.gstatic.com www.gstatic.com www.google-analytics.com"
  }
}
module.exports = createServer
