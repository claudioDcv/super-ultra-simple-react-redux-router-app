import React from 'react'
import { Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { loadCourseTemplates } from '../../actions/courseTemplate'
import { makeActiveLink } from '../../actions/common'
import { isLogin } from '../../utils/helpers'
import Table4You from '../../components/table4you/Table4You'
import _ from '../../texts'

import BtnView from '../../components/ui/BtnView'
import BtnEdit from '../../components/ui/BtnEdit'


class CourseTemplates extends React.Component {

  componentDidMount() {
    this.props.dispatch(makeActiveLink('/course-templates'))
    if (isLogin()) {
      this.props.dispatch(loadCourseTemplates())
    }
  }

  render() {
    const { getList } = this.props.state.courseTemplate
    return (
      <Container text fluid>
        <Table4You
          className='ui olive selectable table'
          dataset={getList}
          nameResultSet='results'
          id='id'
          action={{
            title: _('Actions'),
            component: item => (
              <div>
                <BtnView to={`/course-templates/${item.id}`} />
                <BtnEdit to={`/course-templates/${item.id}/edit`} />
              </div>
            ),
          }}
          columns={[
            {
              name: 'id',
              title: _('Code'),
              component: item => <BtnView to={`/course-templates/${item.id}`} >{item.id}</BtnView>,
            },
            {
              name: 'name',
              title: _('Name'),
              titleClassName: '',
              titleStyle: { color: '#000000' },
              className: '',
              style: {
                color: '#000000',
              },
            }
          ]}
        />
      </Container>
    )
  }
}

CourseTemplates.propTypes = {
  dispatch: PropTypes.func,
}

const mapStateToProps = state => ({
  state: state,
});

export default connect(mapStateToProps)(CourseTemplates)
