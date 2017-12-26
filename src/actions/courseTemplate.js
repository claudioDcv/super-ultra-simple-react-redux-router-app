import api from '../api/CourseTemplate'


export const loadCourseTemplateSuccess = (courseTeplate, dispatch) => {
  return {
    type: 'LOAD_COURSE_TEMPLATE_GET_SUCCESS',
    payload: courseTeplate,
  }
}

export const loadCourseTemplate = id => {
  return dispatch => {
    dispatch({
      type: 'LOAD_COURSE_TEMPLATE_GET_REQUEST',
      payload: null,
    })
    return api.get(id).then(courseTemplate => {
      dispatch(loadCourseTemplateSuccess(courseTemplate, dispatch));
    }).catch(error => {
      dispatch({
        type: 'LOAD_COURSE_TEMPLATE_GET_ERROR',
        payload: error,
      })
    })
  }
}

/************************/

export const loadCourseTemplatesSuccess = courseTemplates => {
  return {
    type: 'LOAD_COURSE_TEMPLATE_GET_LIST_SUCCESS',
    payload: courseTemplates,
  }
}

export const loadCourseTemplates = () => {
  return dispatch => {
    dispatch({
      type: 'LOAD_COURSE_TEMPLATE_GET_LIST_REQUEST',
      payload: null,
    });
    return api.getAll().then(courseTemplates => {
      dispatch(loadCourseTemplatesSuccess(courseTemplates, ));
    }).catch(error => {
      dispatch({
        type: 'LOAD_COURSE_TEMPLATE_GET_LIST_ERROR',
        payload: error,
      })
    })
  }
}
