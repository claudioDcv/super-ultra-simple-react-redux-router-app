import React from 'react'
import { Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { loadCourseTemplates } from '../../actions/courseTemplate'
import { makeActiveLink } from '../../actions/common'
import { isLogin } from '../../utils/helpers'
import Table4You from '../../components/table4you/Table4You'


class CourseTemplates extends React.Component {

  componentDidMount() {
    this.props.dispatch(makeActiveLink('/course-templates'))
    if (isLogin()) {
      this.props.dispatch(loadCourseTemplates())
    }
  }

  render() {
    const { getList } = this.props.state.courseTemplate
    return (
      <Container text>
        <Table4You dataset={getList} />
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
