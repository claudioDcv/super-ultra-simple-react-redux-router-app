import React from 'react'
import PropTypes from 'prop-types'
import Table from './Table'
import { cleanBlankKeys } from './utils'
import { objToQS } from './index'

class Table4You extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			dataset: null,
			inputQueryString: '',
		}
		this.handlerInputOnChange = this.handlerInputOnChange.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.dataset) {
			this.setState({ dataset: nextProps.dataset })
		}
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
			if (this.props.handlerInputQS) this.props.handlerInputQS(queryString)
		})
	}

	render() {
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
