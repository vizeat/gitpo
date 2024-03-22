const rp = require('request-promise')

module.exports = ({ HOOKS }) => async (projectId) =>
  Promise.all(HOOKS[projectId].map(({ IMPORT }) => rp({ method: 'GET', url: IMPORT })))
