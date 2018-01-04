import Table from './Table4You';
import { getParamByName } from './utils'

export default Table;

/**
 *
 * @param prev {}
 * @param next
 * @returns {number}
 */
export const getCurrentNumber = (prev, next) => {
	return parseInt(prev ? (getParamByName(prev, 'page') || 1) : 0, 10) + 1
};

/**
 *
 * @param prev
 * @param next
 * @param count
 * @param perPage
 * @returns {number}
 */
export const getMaxCountNumber = (prev, next, count, perPage) => (count / perPage | 0) + (count % perPage > 0 ? 1 : 0)


export const objToQS = (obj) => {
  const str = [];
  for(let p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  return str.join('&');
}