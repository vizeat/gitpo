const rp = require('request-promise')

module.exports = ({ API_TOKEN }) => (projectId) =>
  rp({
    method: 'POST',
    url: 'https://api.poeditor.com/v2/projects/view',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    form: {
      api_token: API_TOKEN,
      id: projectId,
    },
  })
    .promise()
    .then(JSON.parse)
    .then((res) => res.result)
