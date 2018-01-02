import React from 'react'

const Th = props => {
  const { element } = props
  return (
    <th
      className={element.titleClassName || null}
      style={element.titleStyle || null}
    >
      {element.title || element.name}
    </th>
  )
}

export default Th
