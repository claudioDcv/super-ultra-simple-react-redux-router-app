import React from 'react'
import { Container, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeActiveLink } from '../../actions/common';

import _ from '../../texts'

class Students extends React.Component {

  componentDidMount() {
    this.props.dispatch(makeActiveLink('/students'))
  }

  render() {
    return (
      <Container text fluid>
        <Header as='h2'>{_('Students')}</Header>
        <Link to="/students/1">1</Link>
      </Container>
    )
  }
}

export default connect()(Students)
