import store from '../store'

export const extractNumbers = (str : string) => {
  const numberPattern = /\d+/g;
  if (str) {
    return str.match( numberPattern )
  }
  return str
}

export const genderToIcon = (gender : string) => {
  const options = {
    male: 'male',
    female: 'female',
    'n/a': 'question',
    hermaphrodite: 'question',
    none: 'question',
  }
  return options[gender] || 'question'
}

export const isLogin = () => store.getState().auth.isLogged

export const dot = (obj, str) => str.split('.').reduce((o,i) => o[i], obj)

export const getParamByName = (urlParam, nameParam) => {
  let url = urlParam;
  let name = nameParam;
  if (!url) url = window.location.href;
  name = name.replace(/[[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};
