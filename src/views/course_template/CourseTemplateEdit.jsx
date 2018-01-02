import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Breadcrumb, Container, Header, Segment, Loader, Dimmer, Form, Button } from 'semantic-ui-react'

import _ from '../../texts'
import { loadCourseTemplate, loadCourseTemplateEdit } from '../../actions/courseTemplate'
import { makeActiveLink } from '../../actions/common';
import Input from '../../components/form4you/Input'


class CourseTemplateEdit extends React.Component {

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
    this.props.dispatch(makeActiveLink('/course-templates'))
    this.props.dispatch(loadCourseTemplate(this.props.match.params.id))
  }

  componentWillReceiveProps(nextProps : object) {
    this.setState({
      item: nextProps.state.courseTemplate.get,
      error: nextProps.state.courseTemplate.get_error,
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
    this.props.dispatch(loadCourseTemplateEdit(this.state.item))
  }

  disabled() {
    const { item } = this.state
    const itemProp = this.props.state.courseTemplate.get
    let isNull = false

    if (JSON.stringify(itemProp) === JSON.stringify(item)) return true

    Object.keys(item).forEach(e => {
      const el = item[e]
      if (el === null || el === '' || el === 0) isNull = true
    })

    return isNull
  }

  render() {
    const { item, error } = this.state
    return item ? (
      <Container text>
        <Breadcrumb>
          <Link to="/course-templates" className="section">{_('Course Templates')}</Link>
          <Breadcrumb.Divider />
          <Breadcrumb.Section active>{item.name}</Breadcrumb.Section>
        </Breadcrumb>
        <Header as='h2'>
          <small>{_('Course Template')}</small>
        </Header>
        <Form onSubmit={this.submit}>
          <Input type='hidden' item={item} onChange={this.change} name='id' />
          <Input title='Código' item={item} onChange={this.change} name='code' />
          <Input title='Nombre' item={item} onChange={this.change} name='name' />

          <Button disabled={this.disabled()}>Enviar</Button>
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

CourseTemplateEdit.propTypes = {
  dispatch: PropTypes.func,
  match: PropTypes.object,
}

const mapStateToProps = state => ({
  state: state,
});

export default connect(mapStateToProps)(CourseTemplateEdit)
