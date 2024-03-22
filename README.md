# GITPO

Small utility to manage translations for POEditor projects linked to GitHub repositories: trigger [import/export/sync...](https://poeditor.com/help/how_to_use_the_github_webhook) webhooks manually or programatically.

This is not a full API client and does not intend to be.
For this you should checkout [node-poeditor](https://github.com/mwiesmueller/node-poeditor) or other solutions.

## Install

```
yarn add gitpo
```

Add a `.gitporc` with the followings:

```json
{
  "API_TOKEN": "<your POEditor API key>",
  "HOOKS": {
    "<projectId>": [{
      "IMPORT": "<webhook_url>",
      "SYNC": "<webhook_url>",
      "EXPORT": {
        "fr": "<webhook_url>",
        "en": "<webhook_url>"
      }
    }]
  }
}
```

The `HOOKS` need to be defined on POEditor, this is due to a change on POEditor's side which prevent us from building the hooks url or creating them automatically through API calls.
Check [POEditor WebHooks guide](https://poeditor.com/help/how_to_use_the_github_webhook) for more information.

## Usage

### CLI Usage

This package provide a CLI powered by [Inquirer](https://github.com/sboudrias/Inquirer.js)

```
? What would you like to do: (Use arrow keys)
❯ View Project Details
  Update Code (POEditor → GitHub)
  Update POEditor (GitHub → POEditor)
  Remove default Translations
  Manage contributors
```

You'll be able to trigger webhooks from POEditor to run associated actions.

**Remove default Translations** is a utility to which you need to pass a JSON file path and that will remove values that are the same as the keys.
eg:

```json
{
  "hello world": "hello world",
  "this key will not be cleaned": "because the value is different"
}
```

will be turned into

```json
{
  "hello world": "",
  "this key will not be cleaned": "because the value is different"
}
```

As we use gettext based i18n solution and english fallback in our transaltion files, this help remove english fallbacks from our output files when we need to reprocess them.

---

### Programatical Usage

```js
const {
  addContributor,
  cleanTranslationJSON,
  importNewTerms,
  listContributors,
  listProjectLanguages,
  listProjects,
  removeContributor,
  synchronizeTerms,
  updateTranslations,
  viewProject
} = require("gitpo");

const languages = await listProjectLanguages(projectId);
console.log(languages);

// [
//   { name: 'English',
//     code: 'en',
//     translations: 2067,
//     percentage: 100,
//     updated: '2017-11-16T09:14:45+0000' },
//   { name: 'French',
//     code: 'fr',
//     translations: 1456,
//     percentage: 70.44,
//     updated: '2017-11-16T11:33:54+0000' },
// ]
```

---

### Reference

All functions are async and return a Promise.

#### Utility

##### cleanTranslationJSON(file, override)

| Type     | Param      | Description                                                  |
| -------- | ---------- | ------------------------------------------------------------ |
| _String_ | `file`     | is a path to the file to clean                               |
| _Bool_   | `override` | should override the existing file or not, default to `false` |

Clean JSON translation file of any default value:

```json
{
  "hello world": "hello world",
  "this key will not be cleaned": "because the value is different"
}
```

will be turned into

```json
{
  "hello world": "",
  "this key will not be cleaned": "because the value is different"
}
```

It will create a file next to the input if override is set to false, eg: `en.json` → `en.clean.json`)

#### Webhooks

Manual trigger of webhooks to update POEditor from a Github repository & vice versa.

##### importNewTerms(projectId)

| Type     | Param       | Description             |
| -------- | ----------- | ----------------------- |
| _Number_ | `projectId` | The POEditor project id |

Run the `import_translations` webhook on the given project (see: [POEdtor Webhook Documentation](https://poeditor.com/help/how_to_use_the_github_webhook))

#### synchronizeTerms(projectId)

| Type     | Param       | Description             |
| -------- | ----------- | ----------------------- |
| _Number_ | `projectId` | The POEditor project id |

Run the `sync_terms_and_translations` webhook on the given project (see: [POEdtor Webhook Documentation](https://poeditor.com/help/how_to_use_the_github_webhook))

#### updateTranslations(projectId, languages)

| Type     | Param       | Description             |
| -------- | ----------- | ----------------------- |
| _Number_ | `projectId` | The POEditor project id |
| _Array_  | `languages` | List of language code   |

Run the `export_terms_and_translations` webhook on the given project and languages (see: [POEdtor Webhook Documentation](https://poeditor.com/help/how_to_use_the_github_webhook))

:warning: To complete this action, one call per language will be made.

#### API

##### listProjectLanguages(projectId)

| Type     | Param       | Description             |
| -------- | ----------- | ----------------------- |
| _Number_ | `projectId` | The POEditor project id |

List languages for a given project (see: [POEdtor API Documentation](https://poeditor.com/docs/api#languages_list))

Example of value returned on `Promise.resolve`

```json
[
  {
    "name": "English",
    "code": "en",
    "translations": 2067,
    "percentage": 100,
    "updated": "2017-11-16T09:14:45+0000"
  },
  {
    "name": "French",
    "code": "fr",
    "translations": 1456,
    "percentage": 70.44,
    "updated": "2017-11-16T11:33:54+0000"
  }
]
```

#### listProjects()

List projects you can access (see: [POEdtor API Documentation](https://poeditor.com/docs/api#projects_list))

Example of value returned on `Promise.resolve`

```json
[
  {
    "id": 1111,
    "name": "Project Name",
    "public": 0,
    "open": 0,
    "created": "2014-06-06T12:00:00+0000"
  }
]
```

#### viewProject(projectId)

| Type     | Param       | Description             |
| -------- | ----------- | ----------------------- |
| _Number_ | `projectId` | The POEditor project id |

Get the details of a given project (see: [POEdtor API Documentation](https://poeditor.com/docs/api#projects_view))

Example of value returned on `Promise.resolve`

```json
[
  {
    "id": 1111,
    "name": "Project Name",
    "public": 0,
    "open": 0,
    "created": "2014-06-06T12:00:00+0000"
  }
]
```

#### listContributors()

List contributors to your projects

Example of value returned on `Promise.resolve`

```json
[
  {
    "name": "Alice",
    "email": "alice@example.com",
    "permissions": [
      {
        "project": {
          "id": 1111,
          "name": "Project Name"
        },
        "type": "administrator"
      }
    ],
    "created": "2014-06-06T12:00:00+0000"
  },
  {
    "name": "Bob",
    "email": "bob@example.com",
    "permissions": [
      {
        "project": {
          "id": 1111,
          "name": "Project Name"
        },
        "type": "contributor",
        "languages": ["fr", "en"]
      }
    ],
    "created": "2014-06-06T12:00:00+0000"
  }
]
```

#### addContributors(email, fullname, projects, languages)

| Type     | Param       | Description                 |
| -------- | ----------- | --------------------------- |
| _String_ | `email`     | Contributor's email address |
| _String_ | `fullname`  | Contributor's fullname      |
| _Array_  | `projects`  | List of POEditor project id |
| _Array_  | `languages` | List of language code       |

Add the given contributor to the list of project / language.

:warning: **NOTE:** An assumption is made here that may require some changes to support a more general use case:

- All projects have all the same languages
  _or_
- Poeditor API will ignore addition to non existing languages for a given project

**These cases where not tested**

:warning: An API call is made for every language in every project.

#### removeContributors(email, projects, languages)

| Type     | Param       | Description                 |
| -------- | ----------- | --------------------------- |
| _String_ | `email`     | Contributor's email address |
| _Array_  | `projects`  | List of POEditor project id |
| _Array_  | `languages` | List of language code       |

Remove the given contributor from the list of project / language.

:warning: **NOTE:** An assumption is made here that may require some changes to support a more general use case:

- All projects have all the same languages
  _or_
- Poeditor API will ignore addition to non existing languages for a given project

**These cases where not tested**

:warning: An API call is made for every language in every project.

---

## Contributing

Format code using the provided `yarn fmt` command

## License

MIT
