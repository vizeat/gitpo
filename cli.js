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
} = require('./gitpo')

let languages = []

inquirer
  .prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do',
      choices: [
        { name: 'View Project Details', value: 'view' },
        { name: 'Update Code (POEditor → GitHub)', value: 'update' },
        { name: 'Update POEditor (GitHub → POEditor)', value: 'terms' },
        { name: 'Remove default Translations', value: 'clean' },
      ],
    },
    {
      when: ({ action }) => action !== 'clean',
      type: 'list',
      name: 'project',
      message: 'What project would you like to work on',
      choices: async () => {
        const projects = await listProjects()
        return projects.map(({ name, id: value }) => ({ name, value }))
      },
    },

    {
      when: ({ action }) => action === 'clean',
      type: 'input',
      name: 'file',
      message: 'Where is the file to work on ?',
    },
    {
      when: ({ action }) => action === 'clean',
      type: 'confirm',
      name: 'override',
      message: 'Override existing file ? (if not, a file will be created next to the existing one)',
      default: false,
    },
    {
      when: async ({ action, project }) => {
        languages = await listProjectLanguages(project)
        return action === 'update'
      },
      type: 'checkbox',
      name: 'languages',
      message: 'Which Language(s) would you like to update',
      choices: async () => languages.map(({ name, code }) => ({ name, value: code })),
    },
    {
      when: ({ action }) => action === 'terms',
      type: 'confirm',
      name: 'destructiveUpdate',
      message: 'Would you like to remove obsolete terms? (⚠ Destructive Update ⚠)',
      default: false,
    },
  ])
  .then(({ project, action, languages, file, override, destructiveUpdate }) => {
    switch (action) {
      case 'view':
        viewProject(project).then((res) => console.log(pj.render(res)))
        break
      case 'terms':
        destructiveUpdate
          ? synchronizeTerms(project)
            .then(() => console.log('Syncing done'))
            .catch(() => console.log('Something went wrong'))
          : importNewTerms(project)
            .then(() => console.log('Import done'))
            .catch(() => console.log('Something went wrong'))
        break
      case 'update':
        updateTranslations(project, languages)
          .then(() => console.log('Languages updated'))
          .catch(() => console.log('Something went wrong'))
        break
      case 'clean':
        cleanTranslationJSON(file, override)
          .then(() => console.log('File ready'))
          .catch(() => console.log('Something went wrong'))
        break
      default:
        console.log('Sorry, I did not get what it is that you want...')
    }
  })
