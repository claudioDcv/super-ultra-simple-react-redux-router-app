import api from '../api/CourseTemplate'


export const loadCourseTemplateSuccess = (courseTemplate, dispatch) => {
  return {
    type: 'LOAD_COURSE_TEMPLATE_GET_SUCCESS',
    payload: courseTemplate,
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


/****** EDIT *******/

export const loadCourseTemplateEditSuccess = (courseTemplate, dispatch) => {
  return {
    type: 'LOAD_COURSE_TEMPLATE_GET_SUCCESS',
    payload: courseTemplate,
  }
}

export const loadCourseTemplateEdit = data => {
  return dispatch => {
    dispatch({
      type: 'LOAD_COURSE_TEMPLATE_EDIT_REQUEST',
      payload: null,
    })
    return api.edit(data).then(courseTemplate => {
      dispatch(loadCourseTemplateEditSuccess(courseTemplate, dispatch));
    }).catch(error => {
      dispatch({
        type: 'LOAD_COURSE_TEMPLATE_EDIT_ERROR',
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
