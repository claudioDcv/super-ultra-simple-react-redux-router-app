import React from 'react'
import { Container, Header, Loader, Dimmer, Breadcrumb, Icon, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import _ from '../../texts'
import { loadCourses } from '../../actions/course'
import { extractNumbers, genderToIcon } from '../../utils/helpers'
import { makeActiveLink } from '../../actions/common';

import Table4You from '../../components/table4you/Table4You'
import BtnView from '../../components/ui/BtnView'

const makeColumns = [
  {
    name: 'id',
    title: 'Código',
    component: item => <BtnView to={`/courses/${extractNumbers(item.url)}`} >{extractNumbers(item.url)}</BtnView>,
  },
  {
    name: 'gender',
    title: 'Genero',
    component: item => <Icon name={genderToIcon(item.gender)} />,
  },
  {
    name: 'name',
    title: 'Nombre',
  }
]


class Courses extends React.Component {

  constructor(props) {
    super(props)

    this.handlerGotoPage = this.handlerGotoPage.bind(this)
  }
  componentDidMount() {
    this.props.dispatch(makeActiveLink('/courses'))
    this.props.dispatch(loadCourses())
  }

  handlerGotoPage(str : string) {
    const number = extractNumbers(str)
    this.props.dispatch(loadCourses(number))
  }

  render() {
    const { list } = this.props.state.course
    return (
      <Container text>
        <Breadcrumb>
          <Breadcrumb.Section active>{_('Courses')}</Breadcrumb.Section>
        </Breadcrumb>
        <Header as='h2'>{_('Courses')}</Header>
        <Table4You
          className='ui red selectable table'
          dataset={list}
          nameResultSet='results'
          id='id'
          idFunction={item => extractNumbers(item.url)}
          action={{
            title: 'Acción',
            component: item => <BtnView to={`/courses/${extractNumbers(item.url)}`} />,
          }}
          columns={makeColumns}
        />
        {list.results.length === 0 && (
          <Dimmer active inverted>
            <Loader inverted>{_('Loading')}</Loader>
          </Dimmer>
        )}

        <Button.Group>
          <Button
            onClick={() => { this.handlerGotoPage(list.previous); }}
            labelPosition='left'
            icon='left chevron'
            content='Anterior'
            disabled={!list.previous}
          />
          <Button
            onClick={() => { this.handlerGotoPage(list.next); }}
            labelPosition='right'
            icon='right chevron'
            content='Siguiente'
            disabled={!list.next}
          />
        </Button.Group>
      </Container>
    )
  }
}

Courses.propTypes = {
  dispatch: PropTypes.func,
}

const mapStateToProps = state => ({
  state: state,
});

export default connect(mapStateToProps)(Courses)
