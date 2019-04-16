module.exports = require('rc')('gitpo', {
  API_TOKEN: '<your POEditor API key>',
  HOOKS: {
    '<projectId>': {
      IMPORT: '<webhook_url>', // only one language needed as we import TERMS only
      SYNC: '<webhook_url>', // only one language needed as we import TERMS only
      EXPORT: {
        fr: '<webhook_url>',
        en: '<webhook_url>',
      },
    },
  },
})
