import { api } from '../conf/config'
import { request } from '../auth_module_connect'

const endpoint = `${api}/course-templates/`

class CourseTemplate {
  static getAll() {
    return request({
      url: endpoint,
      method: 'GET',
      authorization: true,
    })
    .then(response => {
      return response
    }).catch(error => {
      return error
    });
  }

  static get(id) {
    return request({
      url: `${endpoint}${id}/`,
      method: 'GET',
      authorization: true,
    })
    .then(response => {
      return response
    }).catch(error => {
      return error
    });
  }

}

export default CourseTemplate
