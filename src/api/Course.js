const endpoint = 'https://swapi.co/api/people'

class Course {
  static getAll() {
    return fetch(`${endpoint}/`).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static get(id) {
    return fetch(`${endpoint}/${id}/`).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }
}

export default Course;
