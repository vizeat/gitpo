const rp = require('request-promise')

module.exports = ({ HOOKS }) => (projectId) => rp({ method: 'GET', url: HOOKS[projectId]['IMPORT'] })
