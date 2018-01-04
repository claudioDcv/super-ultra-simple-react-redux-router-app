/**
 *
 * @param obj {object}
 * @param str {string}
 * @returns {any}
 */
export const dot = (obj, str) => str.split('.').reduce((o,i) => o[i], obj)

/**
 *
 * @param url {string}
 * @param nameParam {string}
 * @returns {*}
 */
export const getParamByName = (url = window.location.href, nameParam) => {
  let name = nameParam;
  name = name.replace(/[[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const clone = obj => JSON.parse(JSON.stringify(obj))

export const cleanBlankKeys = obj => {
  const o = clone(obj)
  for (var propName in o) {
    if (o[propName] === null || o[propName] === undefined || o[propName] === '') {
      delete o[propName];
    }
  }
  return o
}