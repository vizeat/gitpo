const rp = require('request-promise')

module.exports = ({ API_TOKEN }) => (email, name, projects, languages) =>
  Promise.all(
    projects.map(async (id) =>
      Promise.all(
        languages.map(async (language) =>
          rp({
            method: 'POST',
            url: 'https://api.poeditor.com/v2/contributors/add',
            headers: {
              'content-type': 'application/x-www-form-urlencoded',
            },
            form: {
              api_token: API_TOKEN,
              admin: 0,
              id,
              name,
              email,
              language,
            },
          })
        )
      )
    )
  )
