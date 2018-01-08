import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Breadcrumb, Container, Header, Segment, Loader, Dimmer } from 'semantic-ui-react'

import _ from '../../texts'
import { loadCourse } from '../../actions/course'
import { makeActiveLink } from '../../actions/common';


class Course extends React.Component {

  constructor(props : object) {
    super(props)

    this.state = {
      item: null,
      error: null,
    }
  }

  componentDidMount() {
    this.props.dispatch(makeActiveLink('/courses'))
    this.props.dispatch(loadCourse(this.props.match.params.id))
  }

  componentWillReceiveProps(nextProps : object) {
    this.setState({
      item: nextProps.state.course.get,
      error: nextProps.state.course.get_error,
    })
  }

  render() {
    const { item, error } = this.state
    return item ? (
      <Container text fluid>
        <Breadcrumb>
          <Link to="/courses" className="section">{_('Courses')}</Link>
          <Breadcrumb.Divider />
          <Breadcrumb.Section active>
            {item.course_template.name}
          </Breadcrumb.Section>
        </Breadcrumb>
        <Header as='h2'>
          <small>{_('Course')}</small><br /> {item.course_template.name}
        </Header>
        {item.id}
      </Container>
    ) : (
      !error ? (
        <Dimmer active inverted>
          <Loader inverted>{_('Loading')}</Loader>
        </Dimmer>
      ) : (
        <Container text fluid>
          <Segment inverted color='red' tertiary>
            {error}
          </Segment>
        </Container>
      )
    )
  }
}

Course.propTypes = {
  dispatch: PropTypes.func,
  match: PropTypes.object,
}

const mapStateToProps = state => ({
  state: state,
});

export default connect(mapStateToProps)(Course)
