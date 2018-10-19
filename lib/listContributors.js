const rp = require('request-promise')

module.exports = ({ API_TOKEN }) => () =>
  rp({
    method: 'POST',
    url: 'https://api.poeditor.com/v2/contributors/list',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    form: {
      api_token: API_TOKEN,
    },
  })
    .then(JSON.parse)
    .then((data) =>
      data.result.contributors.map(({ name, email, permissions }) => ({
        name,
        email,
        projects: permissions.map(
          ({ project: { name }, type, languages = ['de', 'en', 'es', 'fr', 'it', 'zh-CN', 'zh-TW'] }) =>
            `${type} | (${languages.sort().join(', ')}) > ${name}`
        ),
      }))
    )
