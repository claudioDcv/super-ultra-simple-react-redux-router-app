import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, Form, Container, Card } from 'semantic-ui-react'

import { makeActiveLink } from '../../actions/common'

import { actions } from '../../auth_module_connect'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }

    this.handlerChange = this.handlerChange.bind(this)
    this.handlerSubmit = this.handlerSubmit.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(makeActiveLink('/login'))
  }

  handlerChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.state.auth.get) {
      if (nextProps.state.auth.get.token) {
        this.props.history.push('/home')
      }
    }
  }

  handlerSubmit() {
    this.props.dispatch(actions.makeLoginAction(this.state))
  }

  render() {
    return (
      <Container text>
        <Card style={{ margin: 'auto' }}>
          <Card.Content header='Login' />
          <Card.Content extra>
            <Form onSubmit={this.handlerSubmit}>
              <Form.Field>
                <label>Username</label>
                <input name="username" onChange={this.handlerChange} placeholder='First Name' value={this.state.user} />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input name="password" onChange={this.handlerChange} placeholder='Last Name' value={this.state.password}/>
              </Form.Field>
              <Button type='submit'>Submit</Button>
            </Form>
          </Card.Content>
        </Card>
      </Container>
    )
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
}

const mapStateToProps = state => ({
  state: state,
});

export default connect(mapStateToProps)(Login)
