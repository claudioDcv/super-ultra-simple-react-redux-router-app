import React from 'react'
import { Form } from 'semantic-ui-react'

const Input = props => {
  const { title, item, onChange, inputProps, name, type } = props

  if (type === 'hidden') {
    return (<input value={item[name]} name={name} type='hidden' />)
  }

  return (
    <Form.Field>
      <label>{title}</label>
      <input value={item[name]} name={name} onChange={onChange} {...inputProps} />
    </Form.Field>
  )
}

export default Input
