import React from 'react'


const ordering = (element, onClick, orderingButton) => {

    if (!orderingButton) return element.title || element.name
    if (!orderingButton.component || !element.ordering) return element.title || element.name

    return orderingButton.component({
        element,
        onClick,
    })
}

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
  const { element, onChange, inputQueryString, onChangeOrdering, orderingButton } = props
  return (
    <th
      className={element.titleClassName || null}
      style={element.titleStyle || null}
    >
      {ordering(element, onChangeOrdering, orderingButton)}
      {componentInput(element, onChange, inputQueryString)}
    </th>
  )
}

export default Th
