import React from 'react'
import { Breadcrumb, Container, Header, Button, Checkbox, Form, Loader, Dimmer } from 'semantic-ui-react'
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
    }
  }

  componentDidMount() {
    this.props.dispatch(makeActiveLink('/courses'))
    this.props.dispatch(loadCourse(this.props.match.params.id))
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      item: nextProps.state.courses.get,
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
    const { item } = this.state

    return item ? (
      <Container text>
        <Breadcrumb>
          <Link to="/courses" className="section">{_('Courses')}</Link>
          <Breadcrumb.Divider />
          <Breadcrumb.Section active>{item.name}</Breadcrumb.Section>
        </Breadcrumb>
        <Header as='h2'>{_('Course')}</Header>
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
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
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
