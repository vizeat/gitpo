const rp = require('request-promise')

module.exports = ({ API_TOKEN }) => (projectId, languages) =>
  Promise.all(
    languages.map((lng) =>
      rp({
        method: 'GET',
        url: `https://poeditor.com/api/webhooks/github?api_token=${API_TOKEN}&id_project=${projectId}&language=${
          lng
        }&operation=export_terms_and_translations`,
      })
    )
  )
