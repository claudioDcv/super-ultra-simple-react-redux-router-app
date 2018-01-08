import React from 'react'
import Thead from './Thead'
import Tbody from './Tbody'
import Pagination from './Pagination'

const Table = props => {
  const { dataset, action, columns, className, nameResultSet, id, idFunction, pagination, handlerInputOnChange, inputQueryString } = props.options
  const prefix = props.options.prefix || 'Table4You'
  return (
    <div className={`${prefix} table4you table4you-container`}>
      <table className={`${prefix} ${className}`}>
        <Thead options={{ action, columns, handlerInputOnChange, inputQueryString }} />
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
      {pagination && <div className={`${prefix} table4you table4you-pagination`}>
        <Pagination dataset={dataset} pagination={pagination} inputQueryString={inputQueryString} />
      </div>}
    </div>
  )
}

export default Table


