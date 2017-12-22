import courseApi from '../api/Course';

export function loadCourseSuccess(course) {
  return {
    type: 'LOAD_COURSE_GET_SUCCESS',
    payload: course};
}

export function loadCourse(id) {
  return function(dispatch) {
    dispatch({
      type: 'LOAD_COURSE_GET_REQUEST',
      payload: null,
    });
    return courseApi.get(id).then(course => {
      dispatch(loadCourseSuccess(course));
    }).catch(error => {
      throw(error);
    });
  };
}

/***********************/

export function loadCoursesSuccess(courses) {
  return {
    type: 'LOAD_COURSE_LIST_SUCCESS',
    payload: courses};
}

export function loadCourses() {
  return function(dispatch) {
    dispatch({
      type: 'LOAD_COURSE_LIST_REQUEST',
      payload: null,
    });
    return courseApi.getAll().then(courses => {
      dispatch(loadCoursesSuccess(courses));
    }).catch(error => {
      throw(error);
    });
  };
}
