const rp = require('request-promise')

// NOTE: An assumption is made here that may require some changes to support a more general use case:
// All projects have all the same languages OR poeditor API will ignore deletion to non existing languages for a given project
// this cases where not tested
module.exports = ({ API_TOKEN }) => (email, projects, languages) =>
  Promise.all(
    projects.map(async (id) =>
      Promise.all(
        languages.map(async (language) =>
          rp({
            method: 'POST',
            url: 'https://api.poeditor.com/v2/contributors/remove',
            headers: {
              'content-type': 'application/x-www-form-urlencoded',
            },
            form: {
              api_token: API_TOKEN,
              id,
              email,
              language,
            },
          })
            .then(() => console.log(`removed from ${language} in project ${id}`))
            .catch((err) => {
              console.log(`failed to remove from ${language} in project ${id}`)
              console.error(err)
            }),
        ),
      ),
    ),
  )
