import courseApi from '../api/Course'
import { loadGiphy } from './giphy'

export function loadCourseSuccess(course, dispatch) {
  dispatch(loadGiphy(course.name))
  return {
    type: 'LOAD_COURSE_GET_SUCCESS',
    payload: course,
  }
}

export function loadCourse(id) {
  return function(dispatch) {
    dispatch({
      type: 'LOAD_COURSE_GET_REQUEST',
      payload: null,
    })
    return courseApi.get(id).then(course => {
      dispatch(loadCourseSuccess(course, dispatch));
    }).catch(error => {
      dispatch({
        type: 'LOAD_COURSE_GET_ERROR',
        payload: error,
      })
    })
  }
}

/***********************/

export function loadCourses(query) {

  function loadCoursesSuccess(courses) {
    return {
      type: 'LOAD_COURSE_LIST_SUCCESS',
      payload: courses,
    }
  }

  return function(dispatch) {
    dispatch({
      type: 'LOAD_COURSE_LIST_REQUEST',
      payload: null,
    })
    return courseApi.getAll(query).then(courses => {
      dispatch(loadCoursesSuccess(courses))
    }).catch(error => {
      dispatch({
        type: 'LOAD_COURSE_LIST_ERROR',
        payload: error,
      })
    })
  }
}
