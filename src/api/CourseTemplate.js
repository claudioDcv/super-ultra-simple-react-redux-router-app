import { api } from '../conf/config'
import request from './request'

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

}

export default CourseTemplate
