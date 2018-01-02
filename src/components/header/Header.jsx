import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'semantic-ui-react'
import { withRouter } from 'react-router';
import { connect } from 'react-redux'

import { makeActiveLink } from '../../actions/common';

import _ from '../../texts'
import { clearSession } from '../../auth_module/helpers'
import Persist from '../../utils/Persist'


import { actions } from '../../auth_module_connect'

class Header extends Component {
  state = {}

  constructor(props) {
    super(props)

    this.state = {
      active: '',
    }
    this.handleItemClick = this.handleItemClick.bind(this)
  }

  componentWillUnmount() {

  }

  check = (nextProps) => {
    if (nextProps.state.active.item !== '/login') {
      if (!nextProps.state.auth.isLogged) {
        const name = '/login'
        this.setState({ activeItem: name }, () => {
          this.props.dispatch(makeActiveLink(name, () => {
            this.props.history.push(name)
            clearSession()
          }));
        })
      }
    }
  }

  componentWillMount() {
    if (this.props.history.location.pathname === '/') {
      this.props.dispatch(actions.logoff('ui'))
    }
  }

  componentWillReceiveProps(nextProps) {
    this.check(nextProps)
  }

  handleItemClick = (e, { name }) => {
    Persist.clearAll()
    const self = this
    if (name === '/logout') {
      name = '/login'
      this.props.dispatch(actions.logoff('ui'))
    }
    this.setState({ activeItem: name }, () => {
      this.props.dispatch(makeActiveLink(name, () => {
        self.props.history.push(name);
      }));
    })
  }

  makeMenu = (title, name) => {
    const { item } = this.props.state.active;
    return (
      <Menu.Item
        name={name}
        active={item === name}
        onClick={this.handleItemClick}
      >
        {_(title)}
      </Menu.Item>
    )
  }

  render() {
    const { isLogged } = this.props.state.auth
    return (
      <Menu>
        {!isLogged && this.makeMenu('Login', '/login')}

        {isLogged && this.makeMenu('Home', '/home')}
        {isLogged && this.makeMenu('Courses', '/courses')}
        {isLogged && this.makeMenu('Students', '/students')}
        {isLogged && this.makeMenu('Course Template', '/course-templates')}
        {isLogged && this.makeMenu('Logout', '/logout')}
      </Menu>
    )
  }
}

Header.propTypes = {
  dispatch: PropTypes.func,
  match: PropTypes.object,
}

const mapStateToProps = state => ({
  state: state,
});

export default connect(mapStateToProps)(withRouter(Header));
