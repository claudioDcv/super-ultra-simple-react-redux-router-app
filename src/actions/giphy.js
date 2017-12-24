import giphyApi from '../api/Giphy';

export function loadGiphySuccess(giphy) {
  return {
    type: 'LOAD_GIPHY_GET_SUCCESS',
    payload: giphy,
  }
}

export function loadGiphy(query) {
  return function(dispatch) {
    dispatch({
      type: 'LOAD_GIPHY_GET_REQUEST',
      payload: null,
    });
    return giphyApi.get(query).then(giphy => {
      dispatch(loadGiphySuccess(giphy));
    }).catch(error => {
      dispatch({
        type: 'LOAD_GIPHY_GET_ERROR',
        payload: error,
      })
    })
  }
}
