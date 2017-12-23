import { apiUrl } from '../conf/config'

const endpoint = `${apiUrl}/people`

class Course {
  static getAll(query = '1') {
    return fetch(`${endpoint}/?page=${query}`).then(response => {
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
