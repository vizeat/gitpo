const rp = require('request-promise')

module.exports = ({ API_TOKEN }) => () =>
  rp({
    method: 'POST',
    url: 'https://api.poeditor.com/v2/projects/list',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    form: {
      api_token: API_TOKEN,
    },
  })
    .then(JSON.parse)
    .then((data) => data.result.projects)
