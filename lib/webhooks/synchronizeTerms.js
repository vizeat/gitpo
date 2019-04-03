const rp = require('request-promise')

module.exports = ({ API_TOKEN }) => (projectId) => {
  console.log('Sorry this doesnt work at the moment as POEditor has updated its webhooks API...')
  // rp({
  //   method: 'GET',
  //   url: `https://poeditor.com/api/webhooks/github?api_token=${API_TOKEN}&id_project=${projectId}&language=en&operation=sync_terms_and_translations`,
  // })
}
