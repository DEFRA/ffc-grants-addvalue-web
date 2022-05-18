beforeEach(async () => {

  process.env.SITE_VERSION='addvalue'
  process.env.PORT="3600"
  process.env.DEBUG="*"
  process.env.SERVICE_BUS_HOST="SNDFFCINFSB1001.servicebus.windows.net"
  process.env.SERVICE_BUS_PASSWORD="y44k/5in27gEE/HoNBP9tX943lPBKAcfZaBtzKCSqS0="
  process.env.SERVICE_BUS_USER="RootManageSharedAccessKey"
  process.env.PROJECT_DETAILS_QUEUE_ADDRESS="ffc-grants-av-project-details-sc "
  process.env.CONTACT_DETAILS_QUEUE_ADDRESS="ffc-grants-av-contact-details-sc"
  process.env.COOKIE_PASSWORD='$2b$10$aKkJ7EesF8pbIz0JwNqSsOpPQQqnc0dg7ZKsJYDNc95UkE.k3lfnW'
  process.env.BACKEND_POLLING_HOST="http://localhost:3021/"
  process.env.NODE_ENV="test"
  process.env.SITE_URL="localhost:3600"
  process.env.GOOGLE_TAG_MANAGER_KEY='GTM-WJ5C78H'
  process.env.GOOGLE_TAG_MANAGER_SERVER_KEY='UA-179628664-4'
  process.env.SITE_VERSION=''
  process.env.URL_PREFIX='/adding-value'
  process.env.START_PAGE_URL='/adding-value/start'
  process.env.APPINSIGHTS_INSTRUMENTATIONKEY="e3a6bce5-44ef-4531-a187-46d0c608061f"
  process.env.REDIS_HOSTNAME="DEVFFCINFRD1001.redis.cache.windows.net"
  process.env.REDIS_PORT="6382"
  process.env.REDIS_PASSWORD="gdD6CrvADyYLorEeCMzD0wUNN60gIYxcfaZ85e+byUU="
  process.env.REDIS_PARTITION="ffc-grants-addvalue-web"
  process.env.SERVER_TIMEOUT="5"
  process.env.LOGIN_REQUIRED='sdfgsdfgsdfgsdf'
  process.env.AUTH_USERNAME="grants"
  process.env.AUTH_PASSWORD_HASH="grants"
  process.env.SESSION_CACHE_TTL="1200000"

  // ...
  // Set reference to server in order to close the server during teardown.
  const createServer = require('../app/server')
  const mockSession = {
    getCurrentPolicy: (request, h) => true,
    createDefaultPolicy: (h) => true,
    updatePolicy: (request, h, analytics) => null,
    validSession: (request) => global.__VALIDSESSION__ ?? true,
    sessionIgnorePaths: []
  }

  jest.mock('../app/cookies/index', () => mockSession)

  const server = await createServer()
  await server.start()
  global.__SERVER__ = server
  global.__VALIDSESSION__ = true
  global.__URLPREFIX__ = require('../app/config/server').urlPrefix
})
