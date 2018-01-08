import React from 'react'

const componentInput = (element, onChange, inputQueryString) => {

  if (!element.input) return null
  if (!element.input.component) return null
  if (!element.input.name && !element.name) return null

  const name = element.input.name || element.name
  const value = inputQueryString ? (inputQueryString[name] ? inputQueryString[name] : '') : ''
  const inputProps = element.input.inputProps || {}
  const props = {
      ...inputProps,
      onChange,
      name,
      value,
  }
  return element.input.component(props)
}

const Th = props => {
  const { element, onChange, inputQueryString } = props
  return (
    <th
      className={element.titleClassName || null}
      style={element.titleStyle || null}
    >
      {element.title || element.name}
      {componentInput(element, onChange, inputQueryString)}
    </th>
  )
}

export default Th
