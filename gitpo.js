const conf = require('./config')
const cleanTranslationJSON = require('./lib/cleanTranslationJSON')
const importNewTerms = require('./lib/importNewTerms')(conf)
const listProjectLanguages = require('./lib/listProjectLanguages')(conf)
const listProjects = require('./lib/listProjects')(conf)
const synchronizeTerms = require('./lib/synchronizeTerms')(conf)
const updateTranslations = require('./lib/updateTranslations')(conf)
const viewProject = require('./lib/viewProject')(conf)
const listContributors = require('./lib/listContributors')(conf)
const addContributor = require('./lib/addContributor')(conf)

module.exports = {
  cleanTranslationJSON,
  importNewTerms,
  listProjectLanguages,
  listProjects,
  synchronizeTerms,
  updateTranslations,
  viewProject,
  listContributors,
  addContributor,
}
