import { apiUrl } from '../conf/config'

const endpoint = `${apiUrl}/people`

class Swapi {
  static getAll(query : string = '1') {
    return fetch(`${endpoint}/?page=${query}`)
    .then(response => response.json())
    .catch(error => error)
  }

  static get(id : number) {
    return fetch(`${endpoint}/${id}/`)
    .then(response => response.json())
    .catch(error => error)
  }
}

export default Course
