import React from 'react'

import { dot } from './utils'

import TrBody from './TrBody'

const resolveId = (fn, element, param, i) => {
  if (fn) {
    if (typeof fn === 'function') {
      return fn(element)
    }
  }
  return param ? dot(element, param) : i
}

const Tbody = props => {
  const { dataset, action, columns, nameResultSet, id, idFunction } = props.options
  return (
    <tbody>
      {dataset[nameResultSet].map((e, i) => (
        <TrBody
          key={resolveId(idFunction, e, id, i)}
          action={action}
          columns={columns}
          e={e}
          i={i}
        />
      ))}
    </tbody>
  )
}

export default Tbody
