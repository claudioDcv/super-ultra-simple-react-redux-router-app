import React from 'react'
import PropTypes from 'prop-types'
import Table from './Table'
import {cleanBlankKeys, qsToObj } from './utils'
import { objToQS } from './index'

class Table4You extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			dataset: null,
			inputQueryString: props.initialQs ? qsToObj(props.initialQs) : '',
			ordering: 'id',
			qs: {
				object: {},
				str: '',
				toString: () => '',
			},
			pagination: {},
		}
		this.handlerInputOnChange = this.handlerInputOnChange.bind(this)
		this.onChangeOrdering = this.onChangeOrdering.bind(this)
		this.onChange = this.onChange.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.dataset) {
			this.setState({ dataset: nextProps.dataset })
		}
	}

	onChange(obj) {
		const o = {
			...obj,
			pagination: this.state.pagination,
		}
		this.props.onChange(o)
	}
	onChangeOrdering(ordering) {
		this.setState(prevState => {
			const p = prevState
			if (p.ordering === ordering) {
				p.ordering = `-${ordering}`
			} else {
				p.ordering = ordering
			}
			return p
		}, () => {
			this.onChange({
				type: 'ORDERING',
				qs: this.state.queryString || {
					object: {},
					str: '',
					toString: () => '',
				},
				ordering: this.state.ordering,
			})
		})
	}

	handlerInputOnChange(event) {
		const name = event.target.name
		const value = event.target.value

		this.setState(prevState => {

			const s = prevState;
			const iqs = s.inputQueryString

			s.inputQueryString = {
				...iqs,
				[name]: value,
			}
			s.inputQueryString = cleanBlankKeys(s.inputQueryString)
			return s
		}, () => {
			const queryString = {
				object: this.state.inputQueryString,
				str: objToQS(this.state.inputQueryString),
				toString: () => objToQS(this.state.inputQueryString)
			}
			if (this.props.onChange) {
				this.setState({
					queryString,
				}, () => {
					this.onChange({
						type: 'INPUT',
						qs: queryString,
						ordering: this.state.ordering,
						pagination: this.state.pagination,
					})
				})
			}
		})
	}


	render() {

		const onChangePagination = (type, obj) => {
			this.setState({
				pagination: obj,
			}, () => {
				this.onChange({
					type,
					pagination: obj,
					qs: {
						object: this.state.inputQueryString,
						str: objToQS(this.state.inputQueryString),
						toString: () => objToQS(this.state.inputQueryString)
					},
					ordering: this.state.ordering,
				})
			})

		}

		const { action, columns, className, nameResultSet, id, idFunction, pagination } = this.props
		const { dataset } = this.state
		return dataset ? (
			<Table
				options={{
					handlerInputOnChange: this.handlerInputOnChange,
					action,
					columns,
					className,
					nameResultSet,
					id,
					idFunction,
					dataset,
					pagination,
					inputQueryString: this.state.inputQueryString,
					onChangeOrdering: this.onChangeOrdering,
					onChangePagination: (type, obj) => {
						onChangePagination(type, obj)
					},
					orderingButton: this.props.orderingButton,
				}}
			/>
		) : (
			<span />
		)
	}
}

Table4You.propTypes = {
	dataset: PropTypes.object,
}

export default Table4You
