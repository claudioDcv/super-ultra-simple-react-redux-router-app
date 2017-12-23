import { apiUrl } from '../conf/config'

const endpoint = `${apiUrl}/people`

class Course {
  static getAll() {
    return fetch(`${endpoint}/`).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static get(id : number) {
    return fetch(`${endpoint}/${id}/`).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }
}

export default Course;
