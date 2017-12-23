import React from 'react'
import { Container, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'

import { makeActiveLink } from '../../actions/common';

import _ from '../../texts'

class Student extends React.Component {

  componentDidMount() {
    this.props.dispatch(makeActiveLink('/students'))
  }

  render() {
    return (
      <Container text>
        <Header as='h2'>{_('Students')}</Header>
        Student 1
      </Container>
    )
  }
}

export default connect()(Student)
