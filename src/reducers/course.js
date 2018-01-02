import { makeReducerResource } from './generic'

const initialState = {
  get: null,
  get_error: null,
  getList: null,
  getList_error: null,
}

export default function courseReducer(state = initialState, action) {
  return makeReducerResource('LOAD_COURSE_GET', action, state, initialState)
}
