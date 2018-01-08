import React from 'react'

import Th from './Th'


const Thead = props => {
	const { action, columns, handlerInputOnChange, inputQueryString } = props.options
	return (
		<thead>
		<tr>
			{columns.map((f, i) => <Th key={i} onChange={handlerInputOnChange} element={f} inputQueryString={inputQueryString} />)}
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
