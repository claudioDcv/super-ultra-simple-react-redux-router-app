import React from 'react'

const componentInput = (element, onChange) => {
  if (!element.input) return null
  if (!element.input.component) return null
  if (!element.input.name && !element.name) return null

  const name = element.input.name || element.name
  const inputProps = element.input.inputProps || {}
  const props = {
      ...inputProps,
      onChange,
      name,
  }
  return element.input.component(props)
}

const Th = props => {
  const { element, onChange } = props
  return (
    <th
      className={element.titleClassName || null}
      style={element.titleStyle || null}
    >
      {element.title || element.name}
      {componentInput(element, onChange)}
    </th>
  )
}

export default Th
