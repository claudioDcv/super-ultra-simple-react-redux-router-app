export function  makeActiveLink(active : string, cb : Function) {
  return {
    type: 'SET_ACTIVE_LINK',
    payload: active,
    cb: cb || false,
  };
}
