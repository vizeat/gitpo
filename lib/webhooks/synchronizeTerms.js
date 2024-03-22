const rp = require('request-promise')

module.exports = ({ HOOKS }) => async (projectId) =>
  Promise.all(HOOKS[projectId].map(({ SYNC }) => rp({ method: 'GET', url: SYNC })))
