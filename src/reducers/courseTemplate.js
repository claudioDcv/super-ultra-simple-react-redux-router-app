import { makeReducerResource } from './generic'

const initialState = {
  get: null,
  get_error: null,
  getList: null,
  getList_error: null,
}

export default function courseTemplateReducer(state = initialState, action) {
  return makeReducerResource('LOAD_COURSE_TEMPLATE_GET', action, state, initialState)
}
