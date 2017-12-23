export function  makeActiveLink(active, cb) {
  return {
    type: 'SET_ACTIVE_LINK',
    payload: active,
    cb: cb || false,
  };
}
