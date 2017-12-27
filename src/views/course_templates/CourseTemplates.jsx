import React from 'react'
import { Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { loadCourseTemplates } from '../../actions/courseTemplate'
import { makeActiveLink } from '../../actions/common'
import { isLogin } from '../../utils/helpers'
import Table4You from '../../components/table4you/Table4You'

import BtnView from '../../components/ui/BtnView'


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
      <Container text>
        <Table4You
          className='ui olive selectable table'
          dataset={getList}
          nameResultSet='results'
          id='id'
          action={{
            title: 'Acción',
            component: item => <BtnView to={`/course-templates/${item.id}`} />,
          }}
          columns={[
            {
              name: 'id',
              title: 'Código',
              component: item => <BtnView to={`/course-templates/${item.id}`} >{item.id}</BtnView>,
            },
            {
              name: 'name',
              title: 'Nombre',
              titleClassName: '',
              titleStyle: { color: 'green' },
              className: '',
              style: {
                color: 'red',
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
