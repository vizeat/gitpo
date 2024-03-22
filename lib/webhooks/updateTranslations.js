const rp = require('request-promise')

module.exports = ({ HOOKS }) => async (projectId, languages) =>
  Promise.all(
    HOOKS[projectId].reduce(
      (acc, { EXPORT }) => [...acc, ...languages.map((lng) => rp({ method: 'GET', url: EXPORT[lng] }))],
      [],
    ),
  )
