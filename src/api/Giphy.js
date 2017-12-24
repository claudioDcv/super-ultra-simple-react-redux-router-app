const api = 'https://api.giphy.com/v1'
const key = 'fJnBsMrrZQ80UPIIP3iQJTGNMsRkNJ3C'
const lang = 'es'
const additionalString = ''// 'Star Wars'
const endpoint = (query) => `${api}/gifs/search?api_key=${key}&q=${query}${additionalString}&limit=1&offset=0&rating=G&lang=${lang}`

class Giphy {
  static get(text: string) {
    return fetch(endpoint(text)).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }
}

export default Giphy;
