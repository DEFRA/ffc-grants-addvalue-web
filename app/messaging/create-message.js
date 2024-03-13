const createMessage = (body, type, options) => {
  return {
    body,
    type,
    source: 'ffc-grants-addvalue-web',
    ...options
  }
}

module.exports = createMessage
