import React from 'react'
import Thead from './Thead'
import Tbody from './Tbody'
import Pagination from './Pagination'

const Table = props => {
  const {
      dataset,
      action,
      columns,
      className,
      nameResultSet,
      id,
      idFunction,
      pagination,
      handlerInputOnChange,
      inputQueryString,
      onChangeOrdering,
      onChangePagination,
      orderingButton,
  } = props.options

  const prefix = props.options.prefix || 'Table4You'

  return (
    <div className={`${prefix} table4you table4you-container`}>
      <table className={`${prefix} ${className}`}>
        <Thead options={{ orderingButton, action, columns, handlerInputOnChange, inputQueryString, onChangeOrdering }} />
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
        <Pagination
            dataset={dataset}
            pagination={pagination}
            inputQueryString={inputQueryString}
            onChangePagination={onChangePagination}
        />
      </div>}
    </div>
  )
}

export default Table


