import React from 'react'
import { Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { loadCourseTemplates } from '../../actions/courseTemplate';
import { makeActiveLink } from '../../actions/common';


class CourseTemplates extends React.Component {

  componentDidMount() {
    this.props.dispatch(makeActiveLink('/course-templates'))
    if (!this.props.state.auth.signOff) {
      this.props.dispatch(loadCourseTemplates())
    }
  }


  render() {
    const { getList } = this.props.state.courseTemplate
    return (
      <Container text>
        {getList.map(e => (
          <li key={e.id}>{e.name}</li>
        ))}
      </Container>
    )
  }
}

CourseTemplates.propTypes = {
  dispatch: PropTypes.func,
}

const mapStateToProps = state => ({
  state: state,
});

export default connect(mapStateToProps)(CourseTemplates)
