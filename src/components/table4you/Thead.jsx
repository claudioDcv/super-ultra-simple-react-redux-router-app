import React from 'react'

import Th from './Th'
const Thead = props => {
  const { action, columns } = props.options
  return (
    <thead>
      <tr>
        {columns.map((f, i) => <Th key={i} element={f} />)}
        {action && <th>{action.title}</th>}
      </tr>
    </thead>
  )
}

export default Thead
