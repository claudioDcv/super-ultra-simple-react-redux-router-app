import axios from 'axios'

import { api } from '../conf/config'
import { secure } from '../auth_module_connect'

const endpoint = `${api}/course-templates`


class CourseTemplate {

  static getAll(q, opt = {}) {
    const type = opt.type ? `&${opt.type}` : ''
    const qsFormat = q ? `?${q}${type}` : ''
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

  static edit(data) {
    return secure.secureRequest((config) => axios(config), {
      lib: {
        url: `${endpoint}/${data.id}/`,
        method: 'PUT',
        data,
      },
      authorization: true,
    })
    .then(response => {
      return secure.secureResponse(response, response.status).data
    })
    .catch(error => error)
  }

}

export default CourseTemplate
