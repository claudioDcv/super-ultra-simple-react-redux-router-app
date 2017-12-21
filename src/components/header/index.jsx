import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { withRouter } from 'react-router';
import _ from '../../texts'

class Header extends Component {
  state = {}

  constructor(props) {
    super(props)
    const activeItem = this.props.location.pathname.replace('/', '')
    this.state = {
      activeItem,
    }
  }
  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name }, () => {
      this.props.history.push(`/${name}`);
    })
  }

  makeMenu = (title, name) => {
    const { activeItem } = this.state
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
  render() {
    return (
      <Menu>
        {this.makeMenu('Home', '')}
        {this.makeMenu('Course Template', 'course-templates')}
        {this.makeMenu('Students', 'students')}
      </Menu>
    )
  }
}

export default withRouter(Header);
