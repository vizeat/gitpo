const _ = require('lodash')

/**
 * Whenever a key and a value are the same string, we replace the value by an empty string
 * @param  {Object} object input
 * @return {Object}        clean output
 */
function emptyIdenticalKeyVal(object) {
  const result = JSON.parse(JSON.stringify(object)) // Deep Clone
  const _clean = (value, key, object) => {
    if (_.isString(value)) {
      value === key ? (object[key] = '') : (object[key] = value)
    } else {
      _.each(value, _clean)
    }
  }
  _.each(result, _clean)
  return result
}

module.exports = emptyIdenticalKeyVal
