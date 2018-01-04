/**
 * @author <claudio.dcv@gmail.com> Claudio Esteban Rojas Rodrìguez
 * @copyright <claudio.dcv@gmail.com> Claudio Esteban Rojas Rodrìguez
 * @version 1.0.0
 */

/**
 *
 * @type {Storage}
 */
const ls = window.localStorage


class Persist {
  /**
   *
   * @param key
   * @param def
   * @returns {any | string}
   */
  static get(key, def = '') {
    const data = JSON.parse(ls.getItem(`@persist:${key}`))
    return data || def
  }

  /**
   *
   * @param key {string}
   * @param data
   * @returns {*}
   */
  static set(key, data) {
    ls.setItem(`@persist:${key}`, JSON.stringify(data))
    return data
  }

  /**
   *
   * @param key {string}
   */
  static remove(key = '') {
    const k = key.replace('@persist:', '')
    return ls.removeItem(`@persist:${k}`)
  }

  /**
   *
   * @returns {Array}
   */
  static getAll() {
    const elements = ls
    const elmsMatch = []
    Object.keys(elements).forEach(e => {
      const key = e.replace('@persist:', '')
      const val = Persist.get(key)
      if (val) {
        elmsMatch.push({
          key,
          val,
        })
      }
    })
    return elmsMatch
  }

  /**
   *
   * @returns {boolean}
   */
  static clearAll() {
    const elements = Persist.getAll()
    for (let elm of elements) {
        Persist.remove(elm.key)
    }
    return true
  }
}

export default Persist
