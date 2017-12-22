import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { withRouter } from 'react-router';
import _ from '../../texts'

const activeItems = [
  {
    name: '/courses',
    match: ['^/courses$', '^/courses/[0-9]+$'],
  },
  {
    name: '/students',
    match: ['^/students$', '^/students/[0-9]+$'],
  },
  {
    name: '/',
    match: ['^/$'],
  },
]

class Header extends Component {
  state = {}

  constructor(props) {
    super(props)
    const pathname = this.props.location.pathname
    let isFind = null
    let active = ''
    activeItems.forEach(e => e.match.forEach(f => {
      const _f = new RegExp(f)
      const result = pathname.match(_f);
      if (result) {
        isFind = result
        active = e.name
      }
    }))

    this.state = {
      pathname: '',
      activeItem: active,
    }
  }

  componentWillUnmount() {
    this.setState({
      pathname: '',
      activeItem: '',
    })
  }
  setActive() {
    const pathname = this.props.location.pathname
    let isFind = null
    let active = ''
    activeItems.forEach(e => e.match.forEach(f => {
      const _f = f
      const result = pathname.match(_f);
      if (result) {
        isFind = result
        active = e.name
      }
    }))

    this.setState({
      pathname,
      activeItem: active,
    })
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name }, () => {
      this.props.history.push(name);
    })
  }

  makeMenu = (title, name) => {
    const { activeItem } = this.state
    if (Array.isArray(activeItem)) {

    }
    return (
      <Menu.Item
        name={name}
        active={activeItem === name}
        onClick={this.handleItemClick}
      >
        {_(title)}
      </Menu.Item>
    )
  }

  makeActive() {
    const pathname = this.props.location.pathname
    if (pathname !== this.state.pathname) {
      this.setActive()
    }
  }

  render() {
    this.makeActive()
    return (
      <Menu>
        {this.makeMenu('Home', '/')}
        {this.makeMenu('Courses', '/courses')}
        {this.makeMenu('Students', '/students')}
      </Menu>
    )
  }
}

export default withRouter(Header);
