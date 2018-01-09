import React from 'react'
import { Container, Message, Button, Input } from 'semantic-ui-react'
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
			qs: Persist.get('qs', ''),
		}
		this.querySetAction = this.querySetAction.bind(this)
	}

	componentDidMount() {
		const qs = this.state.qs
		this.props.dispatch(makeActiveLink('/courses'))
		if (isLogin()) {
			this.props.dispatch(loadCourses(`page=${this.state.page}${qs ? `&${qs}` : ''}`))
		}
	}

	querySetAction(obj) {
		const p = obj.pagination.number
		const qs = obj.qs.toString()
		const qsP = `${p ? `&page=${p}` : ''}${qs ? `&${qs}` : ''}`
		const ordering = obj.ordering ? `&ordering=${obj.ordering}` : ''
		switch (obj.type) {
			case 'ORDERING':
				this.props.dispatch(loadCourses(`${ordering}${qsP}`))
			break;
			case 'CHANGE_PAGE':
				this.props.dispatch(loadCourses(`${ordering}${qsP}`))
			break;
			case 'NEXT_PAGE':
				const page = getParamByName(obj.pagination.dataNext, 'page') || 1
				this.props.dispatch(loadCourses(`page=${page}${ordering}&${qs}`))
			break;
			case 'PREV_PAGE':
				const pagePrev = getParamByName(obj.pagination.dataPrev, 'page') || 1
				this.props.dispatch(loadCourses(`page=${pagePrev}${ordering}&${qs}`))
			break;
			case 'INPUT':
				this.props.dispatch(loadCourses(`${ordering}&${qs}`))
			break;
		}
	}

	render() {
		const { getList, getList_error } = this.props.state.course
		return <Container text fluid>
			{getList_error && (
				<Message negative>
					<Message.Header>{_('Error has occurred')}</Message.Header>
					<p>{getList_error} ({this.state.page})</p>
					<Button onClick={() => {
						Persist.remove('qs')
						Persist.remove('course-page')
						this.goto('page=1', {})
					}}>{_('Return to the first page')}</Button>
				</Message>
			)}
			<Table4You
				className='ui olive selectable table'
				dataset={getList}
				nameResultSet='results'
				initialQs={this.state.qs}
				onChange={this.querySetAction}
				orderingButton={{
					component: e => (
						<Button size='mini' onClick={() => e.onClick(e.element.ordering)}>
							{e.element.title}
						</Button>
					),
				}}
				pagination={{
					params: {
						next: 'next',
						previous: 'previous',
						count: 'count',
						perPage: 4,
					},
					className: 'ui pagination menu mini',
					props: {},
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
				columns={[
					{
						name: 'id',
						title: _('Code'),
						component: item => <BtnView to={`/courses/${item.id}`}>{item.id}</BtnView>,
						input: {
							component: (opt) => <Input size='mini' type="text" name={opt.name} {...opt}/>,
							inputProps: { placeholder: 'Ingrese código' },
						},
						ordering: 'id',
					},
					{
						name: 'course_template.name',
						title: _('Course'),
						input: {
							component: (opt) => <Input size='mini' type="text" name={opt.name} {...opt}/>,
							name: 'course_template__name__icontains',
							inputProps: { placeholder: 'Ingrese nombre' },
						},
						ordering: 'course_template__name',
					},
					{
						name: 'carrer.name',
						title: _('Carrer'),
						input: {
							component: (opt) => <Input size='mini' type="text" name={opt.name} {...opt}/>,
							name: 'carrer__name__icontains',
							inputProps: { placeholder: 'Ingrese nombre' },
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
