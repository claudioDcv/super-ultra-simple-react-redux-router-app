const ls = window.localStorage

class Persist {
  static get(key, def = '') {
    const data = JSON.parse(ls.getItem(`@persist:${key}`))
    return data || def
  }

  static set(key, data) {
    ls.setItem(`@persist:${key}`, JSON.stringify(data))
    return data
  }

  static remove(key = '') {
    const k = key.replace('@persist:', '')
    return ls.removeItem(`@persist:${k}`)
  }

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

  static clearAll() {
    const elements = Persist.getAll()
    for (let elm of elements) {
        Persist.remove(elm.key)
    }
    return true
  }
}

export default Persist
