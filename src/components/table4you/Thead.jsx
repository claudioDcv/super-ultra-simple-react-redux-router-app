import React from 'react'

import Th from './Th'


const Thead = props => {
	const { action, columns, handlerInputOnChange, inputQueryString, onChangeOrdering, orderingButton } = props.options

	return (
		<thead>
		<tr>
			{columns.map((f, i) => <Th orderingButton={orderingButton} key={i} onChangeOrdering={onChangeOrdering} onChange={handlerInputOnChange} element={f} inputQueryString={inputQueryString} />)}
			{action && (
				<th>
					{action.title}
				</th>
			)}
		</tr>
		</thead>
	)
}

export default Thead
