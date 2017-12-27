import React from 'react'
import Thead from './Thead'
import Tbody from './Tbody'

export default (props) => {
  const { dataset, action, columns, className, nameResultSet, id, idFunction } = props.options
  return (
    <table className={className}>
      <Thead options={{ action, columns }} />
      <Tbody
        options={{
          action,
          columns,
          nameResultSet,
          id,
          idFunction,
          dataset,
        }}
      />
    </table>
  )
}
