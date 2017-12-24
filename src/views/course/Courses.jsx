import React from 'react'
import { Container, Header, Loader, Dimmer, Breadcrumb, Icon, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import _ from '../../texts'
import { loadCourses } from '../../actions/course'
import { extractNumbers, genderToIcon } from '../../utils/helpers'
import { makeActiveLink } from '../../actions/common';


class Courses extends React.Component {

  constructor(props) {
    super(props)

    this.handlerGotoPage = this.handlerGotoPage.bind(this)
  }
  componentDidMount() {
    this.props.dispatch(makeActiveLink('/courses'))
    this.props.dispatch(loadCourses())
  }

  handlerGotoPage(str : string) {
    const number = extractNumbers(str)
    this.props.dispatch(loadCourses(number))
  }

  render() {
    const { list } = this.props.state.course
    return (
      <Container text>
        <Breadcrumb>
          <Breadcrumb.Section active>{_('Courses')}</Breadcrumb.Section>
        </Breadcrumb>
        <Header as='h2'>{_('Courses')}</Header>
        {list.results.map(item => (
          <p key={extractNumbers(item.url)}>
            <Link to={`/courses/${extractNumbers(item.url)}`}>
              <Icon name={genderToIcon(item.gender)} size='large' circular />
              {item.name}
            </Link>
          </p>
        ))}
        {list.results.length === 0 && (
          <Dimmer active inverted>
            <Loader inverted>{_('Loading')}</Loader>
          </Dimmer>
        )}

        <Button.Group>
          <Button
            onClick={() => { this.handlerGotoPage(list.previous); }}
            labelPosition='left'
            icon='left chevron'
            content='Anterior'
            disabled={!list.previous}
          />
          <Button
            onClick={() => { this.handlerGotoPage(list.next); }}
            labelPosition='right'
            icon='right chevron'
            content='Siguiente'
            disabled={!list.next}
          />
        </Button.Group>
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
