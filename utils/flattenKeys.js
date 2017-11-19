const _ = require('lodash')

/**
 * Flatten a deep object into a one level object with it’s path as key
 * Last key is used as value
 * @param  {Object} object                    The object to be flattened
 * @param  {String} [separator='.']           The key separator
 * @param  {Function} [keyProcessor=identity] A processing function applied to each element forming the path
 * @return {Object}                           The resulting flat object
 * @example
 *         flatten ({ x: { y: z }, a: { b: { c: d } } }, '.', (x) => `"${x}"`)
 *      => { '"x"': y , '"a"."b"': c }
 */
function flattenKeys (object, separator = '.', keyProcessor = (x) => x) {
  const _flatten = (value, key, path = '') => {
    return _.isString(value)
      ? [{ [path]: key }]
      : _.map(value, (v, k) =>
        [].concat(..._flatten(v, k, path ? `${path}${separator}${keyProcessor(key)}` : `${keyProcessor(key)}`))
      )
  }
  return [].concat(..._.map(object, (val, key) => [].concat(..._flatten(val, key))))
}

module.exports = flattenKeys
