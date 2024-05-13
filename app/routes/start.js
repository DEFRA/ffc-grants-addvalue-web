const urlPrefix = require('../config/server').urlPrefix
const currentPath = `${urlPrefix}/start`
const nextPath = `${urlPrefix}/nature-of-business`
const { GRANT_PERCENTAGE, GRANT_PERCENTAGE_SOLAR } = require('../helpers/grant-details')

module.exports = {
  method: 'GET',
  path: currentPath,
  handler: (request, h) => {
    return h.view('home', { button: { nextLink: nextPath, text: 'Start now' }, grantPercentage: GRANT_PERCENTAGE, grantSolarPercentage: GRANT_PERCENTAGE_SOLAR })
  }
}
