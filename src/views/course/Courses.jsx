import React from 'react'
import { Container, Message, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { loadCourses } from '../../actions/course'
import { makeActiveLink } from '../../actions/common'
import { isLogin, getParamByName } from '../../utils/helpers'
import Persist from '../../utils/Persist'
import Table4You from '../../components/table4you/Table4You'
import _ from '../../texts'

import BtnView from '../../components/ui/BtnView'
import BtnEdit from '../../components/ui/BtnEdit'


class Courses extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      page: Persist.get('course-page', '1'),
    }

    this.goto = this.goto.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(makeActiveLink('/courses'))
    if (isLogin()) {
      this.props.dispatch(loadCourses(`page=${this.state.page}`))
    }
  }

  goto = param => {
    const p = Persist.set('course-page', getParamByName(param, 'page') || 1)
    this.setState({ page: p })
    this.props.dispatch(loadCourses(`page=${p}`))
  }

  render() {
    const { getList, getList_error } = this.props.state.course
    return (
      <Container text>
        {getList_error && (
          <Message negative>
            <Message.Header>{_('Error has occurred')}</Message.Header>
            <p>{getList_error} ({this.state.page})</p>
            <Button onClick={this.goto}>{_('Return to the first page')}</Button>
          </Message>
        )}
        <Table4You
          className='ui olive selectable table'
          dataset={getList}
          nameResultSet='results'
          pagination={{
            params: {
              next: 'next',
              previous: 'previous',
              count: 'count',
            },
            actions: {
              next: this.goto,
              previous: this.goto,
            },
          }}
          id='id'
          action={{
            title: _('Actions'),
            component: item => (
              <div>
                <BtnView to={`/courses/${item.id}`} />
                <BtnEdit to={`/courses/${item.id}/edit`} />
              </div>
            ),
          }}
          columns={[
            {
              name: 'id',
              title: _('Code'),
              component: item => <BtnView to={`/courses/${item.id}`} >{item.id}</BtnView>,
            },
            {
              name: 'course_template.name',
              title: _('Course'),
            },
            {
              name: 'carrer.name',
              title: _('Carrer'),
            },
          ]}
        />
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
