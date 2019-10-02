const rp = require('request-promise')

module.exports = ({ HOOKS }) => async (projectId, languages) =>
  Promise.all(languages.map((lng) => rp({ method: 'GET', url: HOOKS[projectId].EXPORT[lng] })))
