import React from 'react'
import { Container, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


import _ from '../../texts'

class Students extends React.Component {

  render() {
    return (
      <Container text>
        <Header as='h2'>{_('Students')}</Header>
        <Link to="/students/1">1</Link>
      </Container>
    )
  }
}

export default connect()(Students)
