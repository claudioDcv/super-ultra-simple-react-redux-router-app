import api from '../api/CourseTemplate';

export function loadCourseTemplatesSuccess(courseTemplates) {
  return {
    type: 'LOAD_COURSE_TEMPLATE_GET_SUCCESS',
    payload: courseTemplates};
}

export function loadCourseTemplates() {
  return function(dispatch) {
    dispatch({
      type: 'LOAD_COURSE_TEMPLATE_GET_REQUEST',
      payload: null,
    });
    return api.getAll().then(courseTemplates => {
      dispatch(loadCourseTemplatesSuccess(courseTemplates, ));
    }).catch(error => {
      dispatch({
        type: 'LOAD_COURSE_TEMPLATE_GET_ERROR',
        payload: error,
      });
    });
  };
}
