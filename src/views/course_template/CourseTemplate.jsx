import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Breadcrumb, Container, Header, Segment, Loader, Dimmer } from 'semantic-ui-react'

import _ from '../../texts'
import { loadCourseTemplate } from '../../actions/courseTemplate'
import { makeActiveLink } from '../../actions/common';


class CourseTemplate extends React.Component {

  constructor(props : object) {
    super(props)

    this.state = {
      item: null,
      error: null,
    }
  }

  componentDidMount() {
    this.props.dispatch(makeActiveLink('/course-templates'))
    this.props.dispatch(loadCourseTemplate(this.props.match.params.id))
  }

  componentWillReceiveProps(nextProps : object) {
    this.setState({
      item: nextProps.state.courseTemplate.get,
      error: nextProps.state.courseTemplate.get_error,
    })
  }

  render() {
    const { item, error } = this.state
    return item ? (
      <Container text>
        <Breadcrumb>
          <Link to="/course-templates" className="section">{_('Course Templates')}</Link>
          <Breadcrumb.Divider />
          <Breadcrumb.Section active>{item.name}</Breadcrumb.Section>
        </Breadcrumb>
        <Header as='h2'>
          <small>{_('Course Template')}</small><br /> {item.name}
        </Header>

      </Container>
    ) : (
      !error ? (
        <Dimmer active inverted>
          <Loader inverted>{_('Loading')}</Loader>
        </Dimmer>
      ) : (
        <Container text>
          <Segment inverted color='red' tertiary>
            {error}
          </Segment>
        </Container>
      )
    )
  }
}

CourseTemplate.propTypes = {
  dispatch: PropTypes.func,
  match: PropTypes.object,
}

const mapStateToProps = state => ({
  state: state,
});

export default connect(mapStateToProps)(CourseTemplate)
