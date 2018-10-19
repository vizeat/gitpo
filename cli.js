#!/usr/bin/env node

const inquirer = require('inquirer')
const pj = require('prettyjson')

const {
  listProjects,
  listProjectLanguages,
  cleanTranslationJSON,
  importNewTerms,
  synchronizeTerms,
  updateTranslations,
  viewProject,
  listContributors,
  addContributor,
} = require('./gitpo')

const {
  PROJECT_VIEW,
  PROJECT_UPDATE,
  PROJECT_TERMS,
  PROJECT_CLEAN,
  CONTRIBUTORS,
  CONTRIBUTORS_LIST,
  CONTRIBUTORS_ADD,
  CONTRIBUTORS_DELETE,
} = require('./utils/konstants')

let languages = []

inquirer
  .prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do',
      choices: [
        { name: 'View Project Details', value: PROJECT_VIEW },
        { name: 'Update Code (POEditor → GitHub)', value: PROJECT_UPDATE },
        { name: 'Update POEditor (GitHub → POEditor)', value: PROJECT_TERMS },
        { name: 'Remove default Translations', value: PROJECT_CLEAN },
        { name: 'Manage contributors', value: CONTRIBUTORS },
      ],
    },
    {
      when: ({ action }) => action === CONTRIBUTORS,
      type: 'list',
      name: 'action',
      message: 'What would you like to do',
      choices: [
        { name: 'List collaborators', value: CONTRIBUTORS_LIST },
        { name: 'Add collaborator', value: CONTRIBUTORS_ADD },
        { name: 'Delete collaborator', value: CONTRIBUTORS_DELETE },
      ],
    },
    {
      when: ({ action }) => action === CONTRIBUTORS_ADD,
      type: 'input',
      name: 'email',
      message: 'Email:',
    },
    {
      when: ({ action }) => action === CONTRIBUTORS_ADD,
      type: 'input',
      name: 'fullname',
      message: 'Full Name:',
    },
    {
      when: ({ action }) => action === PROJECT_CLEAN,
      type: 'input',
      name: 'file',
      message: 'Where is the file to work on ?',
    },
    {
      when: ({ action }) => action === PROJECT_CLEAN,
      type: 'confirm',
      name: 'override',
      message: 'Override existing file ? (if not, a file will be created next to the existing one)',
      default: false,
    },
    {
      when: ({ action }) => action !== PROJECT_CLEAN && action !== CONTRIBUTORS_LIST && action !== CONTRIBUTORS_ADD,
      type: 'list',
      name: 'project',
      message: 'Select a project',
      choices: async () => {
        const projects = await listProjects()
        return projects.map(({ name, id: value }) => ({ name, value }))
      },
    },
    {
      when: ({ action }) => action === CONTRIBUTORS_ADD,
      type: 'checkbox',
      name: 'projects',
      message: 'Select project(s)',
      choices: async () => {
        const projects = await listProjects()
        return projects.map(({ name, id: value }) => ({ name, value }))
      },
    },
    {
      when: async ({ action, project, projects }) => {
        if ([PROJECT_UPDATE, CONTRIBUTORS_ADD].includes(action)) {
          if (projects && !project) {
            project = projects[0] // NOTE: assuming all projects have the same language set here
          }
          languages = await listProjectLanguages(project)
          return true
        }
        return false
      },
      type: 'checkbox',
      name: 'languages',
      message: 'Select Language(s)',
      choices: async () => languages.map(({ name, code }) => ({ name, value: code })),
    },
    {
      when: ({ action }) => action === PROJECT_TERMS,
      type: 'confirm',
      name: 'destructiveUpdate',
      message: 'Would you like to remove obsolete terms? (⚠ Destructive Update ⚠)',
      default: false,
    },
  ])
  .then(({ project, action, languages, file, override, destructiveUpdate, email, fullname, projects }) => {
    switch (action) {
      case PROJECT_VIEW:
        viewProject(project).then((res) => console.log(pj.render(res)))
        break
      case PROJECT_TERMS:
        destructiveUpdate
          ? synchronizeTerms(project)
            .then(() => console.log('Syncing done'))
            .catch(() => console.log('Something went wrong'))
          : importNewTerms(project)
            .then(() => console.log('Import done'))
            .catch(() => console.log('Something went wrong'))
        break
      case PROJECT_UPDATE:
        updateTranslations(project, languages)
          .then(() => console.log('Languages updated'))
          .catch(() => console.log('Something went wrong'))
        break
      case PROJECT_CLEAN:
        cleanTranslationJSON(file, override)
          .then(() => console.log('File ready'))
          .catch(() => console.log('Something went wrong'))
        break
      case CONTRIBUTORS_LIST:
        listContributors().then((res) => console.log(pj.render(res)))
        break
      case CONTRIBUTORS_ADD:
        addContributor(email, fullname, projects, languages).then(() => console.log('Contributor added'))
        break
      default:
        console.log('Sorry, I did not get what it is that you want...')
    }
  })
