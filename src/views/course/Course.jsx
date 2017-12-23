import React from 'react'
import { Breadcrumb, Image, Container, Icon, Header, Segment, Button, Checkbox, Form, Loader, Dimmer } from 'semantic-ui-react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

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

  componentWillReceiveProps(nextProps) {
    this.setState({
      item: nextProps.state.courses.get,
      error: nextProps.state.courses.get_error,
    })
  }

  handlerChange(event) {
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
          {item.gender === 'male' && (<Icon name='male' size='mini' circular />)}
          {item.gender === 'female' && (<Icon name='female' size='mini' circular />)}
          {item.gender === 'n/a' && (<Icon name='question' size='mini' circular />)}
          {item.gender === 'hermaphrodite' && (<Icon name='question' size='large' circular />)}
          {item.gender === 'none' && (<Icon name='question' size='large' circular />)}
          {_('Course')} {item.name}
        </Header>

        <Image src={image[0].images['downsized'].url} size='medium' rounded />

        <Form>
          <Form.Field>
            <label>URL</label>
            <input placeholder='First Name' value={item.url} onChange={this.handlerChange} />
          </Form.Field>
          <Form.Field>
            <label>Nombre</label>
            <input placeholder='Last Name' value={item.name}  onChange={this.handlerChange} />
          </Form.Field>
          <Form.Field>
            <Checkbox label='I agree to the Terms and Conditions' />
          </Form.Field>
          <Button type='submit'>Submit</Button>
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
