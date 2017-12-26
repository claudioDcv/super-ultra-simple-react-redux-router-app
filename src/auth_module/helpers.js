const NAME_VARIABLE_TOKEN = 'token'
const NAME_VARIABLE_DATE_TOKEN = 'date-token'
const storage = window.localStorage

export const getStateOrLocalToken = (token) => {
  let t = token
  if (!t) {
    t = storage.getItem(NAME_VARIABLE_TOKEN)
  }
  if (t) {
    if (t.token) {
      t = token
    }
  }
  return t
}


export const getStateOrLocalDateToken = (date) => {
  let d = date
  if (!d) {
    d = storage.getItem(NAME_VARIABLE_DATE_TOKEN)
    if (d) {
      d = parseInt(d, 10)
    }
  }
  return d
}

export const setLocalToken = token => {
  storage.setItem(NAME_VARIABLE_TOKEN, token)
}

export const setLocalDateToken = date => {
  storage.setItem(NAME_VARIABLE_DATE_TOKEN, date)
}

export const clearSession = () => {
  storage.removeItem(NAME_VARIABLE_TOKEN)
  storage.removeItem(NAME_VARIABLE_DATE_TOKEN)
}
