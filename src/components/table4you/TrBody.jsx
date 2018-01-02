import React from 'react'
import { dot } from './utils'

const TrBody = props => {
  const { action, columns, e } = props
  return (
    <tr>
      {columns.map((f, i) => (
          <td key={i} className={f.className || null} style={f.style || null}>
            {f.component ? f.component(e) : dot(e, f.name)}
          </td>
      ))}
      {action && <td>{action.component(e)}</td>}
    </tr>
  )
}

export default TrBody
