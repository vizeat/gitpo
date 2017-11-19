const fs = require('fs')
const emptyIdenticalKeyVal = require('../utils/emptyIdenticalKeyVal')

module.exports = (file, override = false) => {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'))
  const clean = emptyIdenticalKeyVal(data)
  const cleanFilename = override
    ? file
    : file.slice(0, file.lastIndexOf('.')) + '.clean' + file.slice(file.lastIndexOf('.'))
  return Promise.resolve().then(() => fs.writeFileSync(cleanFilename, JSON.stringify(clean, null, 2)))
}
