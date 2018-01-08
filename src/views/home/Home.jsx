import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Container, Header } from 'semantic-ui-react'
import _ from '../../texts'
import { makeActiveLink } from '../../actions/common'


class Home extends React.Component {

  componentDidMount() {
    this.props.dispatch(makeActiveLink('/home'))
  }

  render() {
    return (
      <Container text fluid>
        <Header as='h2'>{_('Home')}</Header>
        <p>Bienvenido al sistema de Evaluación por Competencias</p>
      </Container>
    )
  }
}

Home.propTypes = {
  dispatch: PropTypes.func,
}

const mapStateToProps = state => ({
  state: state,
});

export default connect(mapStateToProps)(Home)
