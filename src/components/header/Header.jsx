import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'semantic-ui-react'
import { withRouter } from 'react-router';
import { connect } from 'react-redux'

import { makeActiveLink } from '../../actions/common';

import _ from '../../texts'


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
      if (nextProps.state.auth.signOff) {
        this.handleItemClick({}, { name: '/login' })
      }
    }
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {
    this.check(nextProps)
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name }, () => {
      this.props.dispatch(makeActiveLink(name, () => {
        this.props.history.push(name);
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
    const { signOff } = this.props.state.auth
    return (
      <Menu>
        {signOff && this.makeMenu('Login', '/login')}

        {!signOff && this.makeMenu('Home', '/')}
        {!signOff && this.makeMenu('Courses', '/courses')}
        {!signOff && this.makeMenu('Students', '/students')}
        {!signOff && this.makeMenu('Course Template', '/course-templates')}
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
