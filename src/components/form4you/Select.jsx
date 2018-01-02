import React from 'react'
import { Form } from 'semantic-ui-react'
import { Async } from 'react-select';


const Select = props => {
  const { title, item, onChange, inputProps, name, api } = props

  const getOptions = (i, callback) => {
    api(`q=${i}`, { type: 'select' })
    .then((data) => {
			callback(null, { options: data, complete: true })
		})
  }

  return (
    <Form.Field>
      <label>{title}</label>
      <Async
        onChange={(e) => e && onChange({
          target: {
            name: name,
            value: e,
          },
        })}
        name={name}
        value={item[name]}
        labelKey='name'
        valueKey='id'
        loadOptions={getOptions}
        clearable={false}
        {...inputProps}
      />
    </Form.Field>
  )
}

export default Select
