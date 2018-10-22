const conf = require('./config')
const addContributor = require('./lib/api/addContributor')(conf)
const cleanTranslationJSON = require('./lib/cleanTranslationJSON')
const importNewTerms = require('./lib/webhooks/importNewTerms')(conf)
const listContributors = require('./lib/api/listContributors')(conf)
const listProjectLanguages = require('./lib/api/listProjectLanguages')(conf)
const listProjects = require('./lib/api/listProjects')(conf)
const removeContributor = require('./lib/api/removeContributor')(conf)
const synchronizeTerms = require('./lib/webhooks/synchronizeTerms')(conf)
const updateTranslations = require('./lib/webhooks/updateTranslations')(conf)
const viewProject = require('./lib/api/viewProject')(conf)

module.exports = {
  addContributor,
  cleanTranslationJSON,
  importNewTerms,
  listContributors,
  listProjectLanguages,
  listProjects,
  removeContributor,
  synchronizeTerms,
  updateTranslations,
  viewProject,
}
