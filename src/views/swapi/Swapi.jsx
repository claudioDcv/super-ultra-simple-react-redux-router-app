import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Breadcrumb, Image, Container, Icon, Header, Segment, Button, Form, Loader, Dimmer } from 'semantic-ui-react'

import _ from '../../texts'
import { loadCourse } from '../../actions/course'
import { makeActiveLink } from '../../actions/common';
import { genderToIcon} from '../../utils/helpers'


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

  handlerChange(event : object) {
    const name = event.target.name
    const value = event.target.value

    this.setState({
      [name]: value
    })
  }

  render() {
    const { item, error } = this.state
    const image = this.props.state.giphy.get.data
    return image && item ? (
      <Container text>
        <Breadcrumb>
          <Link to="/courses" className="section">{_('Courses')}</Link>
          <Breadcrumb.Divider />
          <Breadcrumb.Section active>{item.name}</Breadcrumb.Section>
        </Breadcrumb>
        <Header as='h2'>
          <small><Icon name={genderToIcon(item.gender)} />{_('Course')}</small><br />  {item.name}
        </Header>

        <Image src={image[0].images['downsized'].url} size='medium' rounded />

        <Form>
          <Form.Field>
            <label>{_('URL')}</label>
            <input placeholder='First Name' value={item.url} onChange={this.handlerChange} />
          </Form.Field>
          <Form.Field>
            <label>{_('Name')}</label>
            <input placeholder='Last Name' value={item.name}  onChange={this.handlerChange} />
          </Form.Field>
          <Button type='submit'>{_('Submit')}</Button>
        </Form>
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

Course.propTypes = {
  dispatch: PropTypes.func,
  match: PropTypes.object,
}

const mapStateToProps = state => ({
  state: state,
});

export default connect(mapStateToProps)(Course)
