const conf = require('./config')
const addContributor = require('./lib/addContributor')(conf)
const cleanTranslationJSON = require('./lib/cleanTranslationJSON')
const importNewTerms = require('./lib/importNewTerms')(conf)
const listContributors = require('./lib/listContributors')(conf)
const listProjectLanguages = require('./lib/listProjectLanguages')(conf)
const listProjects = require('./lib/listProjects')(conf)
const removeContributor = require('./lib/removeContributor')(conf)
const synchronizeTerms = require('./lib/synchronizeTerms')(conf)
const updateTranslations = require('./lib/updateTranslations')(conf)
const viewProject = require('./lib/viewProject')(conf)

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
