import React from 'react'
import { Container, Header, Loader, Dimmer, Breadcrumb } from 'semantic-ui-react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import _ from '../../texts'
import { loadCourses } from '../../actions/course'
import { extractNumbers } from '../../utils/helpers'
import { makeActiveLink } from '../../actions/common';


class Courses extends React.Component {

  componentDidMount() {
    this.props.dispatch(makeActiveLink('/courses'))
    this.props.dispatch(loadCourses())
  }
  render() {
    return (
      <Container text>
        <Breadcrumb>
          <Breadcrumb.Section active>{_('Courses')}</Breadcrumb.Section>
        </Breadcrumb>
        <Header as='h2'>{_('Courses')}</Header>
        {this.props.state.courses.list.results.map(e => (
          <p key={extractNumbers(e.url)}>
            <Link to={`/courses/${extractNumbers(e.url)}`}>{e.name}</Link>
          </p>
        ))}
        {this.props.state.courses.list.results.length === 0 && (
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        )}
      </Container>
    )
  }
}

Courses.propTypes = {
  dispatch: PropTypes.func,
}

const mapStateToProps = state => ({
  state: state,
});

export default connect(mapStateToProps)(Courses)
