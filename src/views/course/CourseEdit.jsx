import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Breadcrumb, Container, Header, Segment, Loader, Dimmer, Form } from 'semantic-ui-react'

import _ from '../../texts'
import { loadCourse } from '../../actions/course'
import { makeActiveLink } from '../../actions/common'
import { Select, Input } from '../../components/form4you'

import apiCarrer from '../../api/Carrer'
import apiCourseTemplate from '../../api/CourseTemplate'


class CourseEdit extends React.Component {

  constructor(props : object) {
    super(props)

    this.state = {
      item: null,
      error: null,
    }

    this.change = this.change.bind(this)
    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(makeActiveLink('/courses'))
    this.props.dispatch(loadCourse(this.props.match.params.id))
  }

  componentWillReceiveProps(nextProps : object) {
    this.setState({
      item: nextProps.state.course.get,
      error: nextProps.state.course.get_error,
    })
  }

  change(event) {
    const { name, value } = event.target
    this.setState(prevState => ({
      ...prevState,
      item: {
        ...prevState.item,
        [name]: value,
      },
    }))
  }

  submit(event) {
    event.preventDefault()
  }

  render() {
    const { item, error } = this.state
    return item ? (
      <Container text>
        <Breadcrumb>
          <Link to="/courses" className="section">{_('Courses')}</Link>
          <Breadcrumb.Divider />
          <Breadcrumb.Section active>
            {item.course_template.name}
          </Breadcrumb.Section>
        </Breadcrumb>
        <Header as='h2'>
          <small>{_('Course')}</small><br /> {item.course_template.name}
        </Header>

        <Form onSubmit={this.submit}>
          <Input
            item={item}
            name='id'
            title='Código'
            onChange={this.change}
          />

          <Select
            item={item}
            name='carrer'
            title='Carrera'
            onChange={this.change}
            api={apiCarrer.getAll}
          />

          <Select
            item={item}
            name='course_template'
            title='Plantilla e Curso'
            onChange={this.change}
            api={apiCourseTemplate.getAll}
          />
        </Form>

      </Container>
    ) : (
      !error ? (
        <Dimmer active inverted>
          <Loader inverted>{_('Loading')}</Loader>
        </Dimmer>
      ) : (
        <Container text>
          <Segment inverted color='red' tertiary>
            {error}
          </Segment>
        </Container>
      )
    )
  }
}

CourseEdit.propTypes = {
  dispatch: PropTypes.func,
  match: PropTypes.object,
}

const mapStateToProps = state => ({
  state: state,
});

export default connect(mapStateToProps)(CourseEdit)
