const rp = require('request-promise')

module.exports = ({ API_TOKEN }) => (projectId, language) =>
  rp({
    method: 'POST',
    url: 'https://api.poeditor.com/v2/terms/list',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    form: {
      api_token: API_TOKEN,
      id: projectId,
      language,
    },
  })
    .then(JSON.parse)
    .then((data) => data.result.terms)
