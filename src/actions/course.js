import api from '../api/Course'


export const loadCourseSuccess = (course, dispatch) => {
  return {
    type: 'LOAD_COURSE_GET_SUCCESS',
    payload: course,
  }
}

export const loadCourse = id => {
  return dispatch => {
    dispatch({
      type: 'LOAD_COURSE_GET_REQUEST',
      payload: null,
    })
    return api.get(id).then(course => {
      dispatch(loadCourseSuccess(course, dispatch));
    }).catch(error => {
      dispatch({
        type: 'LOAD_COURSE_GET_ERROR',
        payload: error,
      })
    })
  }
}

/************************/

export const loadCoursesSuccess = courses => {
  return {
    type: 'LOAD_COURSE_GET_LIST_SUCCESS',
    payload: courses,
  }
}

export const loadCourses = (qs) => {
  return dispatch => {
    dispatch({
      type: 'LOAD_COURSE_GET_LIST_REQUEST',
      payload: null,
    });
    return api.getAll(qs).then(courses => {
      dispatch(loadCoursesSuccess(courses, ));
    }).catch(error => {
      dispatch({
        type: 'LOAD_COURSE_GET_LIST_ERROR',
        payload: error,
      })
    })
  }
}
