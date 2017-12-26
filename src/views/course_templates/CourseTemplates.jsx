import React from 'react'
import { Container, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

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
        <Table4You
          dataset={getList}
          action={item => (
            <Link to={`/course-templates/${item.id}`}>
              <Icon name='eye' />
            </Link>
          )}
          columns={{
            id: item => (
              <Link to={`/course-templates/${item.id}`}>
                {item.id}
              </Link>
            ),
            name: item => item.name,
          }}
        />
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
