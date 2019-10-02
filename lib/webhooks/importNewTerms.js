const rp = require('request-promise')

module.exports = ({ HOOKS }) => async (projectId) => rp({ method: 'GET', url: HOOKS[projectId].IMPORT })
