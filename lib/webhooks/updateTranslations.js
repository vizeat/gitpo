const rp = require('request-promise')
const Promise = require('bluebird')
module.exports = ({ API_TOKEN }) => (projectId, languages) =>
  Promise.map(
    languages,
    (lng) =>
      Promise.delay(
        1000,
        rp({
          method: 'GET',
          url: `https://poeditor.com/api/webhooks/github?api_token=${API_TOKEN}&id_project=${projectId}&language=${lng}&operation=export_terms_and_translations`,
        }).then(() => console.log(`Language updated: ${lng}`))
      ),
    { concurrency: 1 }
  )
