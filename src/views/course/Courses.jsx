import React from 'react'
import { Container, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import _ from '../../texts'
import { loadCourses } from '../../actions/course'


class Courses extends React.Component {

  componentDidMount() {
    this.props.dispatch(loadCourses())
  }
  render() {
    return (
      <Container text>
        <Header as='h2'>{_('Courses')}</Header>
        {this.props.state.courses.list.results.map(e => (
          <p key={e.id}>
            <Link to={`/courses/${e.id}`}>{e.name}</Link>
          </p>
        ))}

      </Container>
    )
  }
}

Courses.propTypes = {
  distpath: PropTypes.func,
}

const mapStateToProps = state => ({
  state: state,
});

export default connect(mapStateToProps)(Courses)
