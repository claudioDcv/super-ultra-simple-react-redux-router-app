import axios from 'axios'

import { api } from '../conf/config'
import { secure } from '../auth_module_connect'

const endpoint = `${api}/courses`


class Course {

  static getAll(q) {
    const qsFormat = q ? `?${q}` : ''
    return secure.secureRequest((config) => axios(config), {
      lib: {
        url: `${endpoint}/${qsFormat}`,
        method: 'GET',
      },
      authorization: true,
    })
    .then(response => {
      return secure.secureResponse(response, response.status).data
    })
    .catch(error => error)
  }

  static get(id) {
    return secure.secureRequest((config) => axios(config), {
      lib: {
        url: `${endpoint}/${id}/`,
        method: 'GET',
      },
      authorization: true,
    })
    .then(response => {
      return secure.secureResponse(response, response.status).data
    })
    .catch(error => error)
  }

}

export default Course
