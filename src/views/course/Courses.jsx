import React from 'react'
import { Container, Message, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { loadCourses } from '../../actions/course'
import { makeActiveLink } from '../../actions/common'
import { isLogin, getParamByName } from '../../utils/helpers'
import Persist from '../../utils/Persist'
import Table4You, { getCurrentNumber, getMaxCountNumber } from '../../components/table4you'
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
		this.handlerInputQS = this.handlerInputQS.bind(this)
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

	gotoNumber = n => {
		const p = Persist.set('course-page', n)
		this.setState({ page: p })
		this.props.dispatch(loadCourses(`page=${p}`))
	}

	handlerInputQS(queryString) {
		console.log(queryString, this.state);
		alert(queryString)
		// this.gotoNumber(1)
	}

	render() {
		const { getList, getList_error } = this.props.state.course
		return <Container text>
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
						perPage: 4,
					},
					actions: {
						next: this.goto,
						previous: this.goto,
						gotoNumber: this.gotoNumber,
					},
					adjacentItem: 4,
					getCurrentNumber: getCurrentNumber,
					getMaxCountNumber: getMaxCountNumber,
				}}
				id='id'
				action={{
					title: _('Actions'),
					component: item => (
						<div>
							<BtnView to={`/courses/${item.id}`}/>
							<BtnEdit to={`/courses/${item.id}/edit`}/>
						</div>
					),
				}}
				handlerInputQS={this.handlerInputQS}
				columns={[
					{
						name: 'id',
						title: _('Code'),
						component: item => <BtnView to={`/courses/${item.id}`}>{item.id}</BtnView>,
						input: {
							component: (opt) => <input type="text" name={opt.name} {...opt}/>,
						},
					},
					{
						name: 'course_template.name',
						title: _('Course'),
						input: {
							component: (opt) => <input type="text" name={opt.name} {...opt}/>,
							name: 'course_template__name',
						},
					},
					{
						name: 'carrer.name',
						title: _('Carrer'),
						input: {
							component: (opt) => <input type="text" name={opt.name} {...opt}/>,
							name: 'carrer__name',
							inputProps: {},
						},
					},
				]}
			/>
		</Container>
	}
}

Courses.propTypes = {
	dispatch: PropTypes.func,
}

const mapStateToProps = state => ({
	state: state,
});

export default connect(mapStateToProps)(Courses)
