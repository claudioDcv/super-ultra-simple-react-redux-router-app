import React from 'react'

export default (props) => {
  const { action, columns } = props.options
  return (
    <thead>
      <tr>
          {columns.map((f, i) => (
              <th key={i} className={f.titleClassName || null} style={f.titleStyle || null}>
                {f.title || f.name}
              </th>
          ))}
        <th>{action.title}</th>
      </tr>
    </thead>
  )
}
