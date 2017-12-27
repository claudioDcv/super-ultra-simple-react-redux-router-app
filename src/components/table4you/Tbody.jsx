import React from 'react'

export default (props) => {
  const { dataset, action, columns, nameResultSet, id, idFunction } = props.options
  return (
    <tbody>
      {dataset[nameResultSet].map((e, i) => (
        <tr key={idFunction ? idFunction(e) : (e[id] || i)}>
          {columns.map((f, i) => (
              <td key={i} className={f.className || null} style={f.style || null}>
                {f.component ? f.component(e) : e[f.name]}
              </td>
          ))}
          <td>{action.component(e)}</td>
        </tr>
      ))}
    </tbody>
  )
}
