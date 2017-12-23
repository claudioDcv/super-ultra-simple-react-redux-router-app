const key = 'fJnBsMrrZQ80UPIIP3iQJTGNMsRkNJ3C'
const lang = 'es'
const api = (query) => `https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${query} Star Wars&limit=1&offset=0&rating=G&lang=${lang}`

class Giphy {
  static get(text: string) {
    return fetch(api(text)).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }
}

export default Giphy;
