const rp = require('request-promise')

module.exports = ({ API_TOKEN }) => (projectId) =>
  rp({
    method: 'GET',
    url: `https://poeditor.com/api/webhooks/github?api_token=${API_TOKEN}&id_project=${
      projectId
    }&language=en&operation=sync_terms_and_translations`,
  })
