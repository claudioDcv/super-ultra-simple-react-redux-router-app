import React from 'react'

const Pagination = props => {
  const { dataset, pagination } = props

  const previousIsDisabled = () => !(pagination.actions.previous && dataset[pagination.params.previous]);
  const nextIsDisabled = () => !(pagination.actions.next && dataset[pagination.params.next]);

  return (
    <div className='ui pagination menu'>
      <button
        disabled={previousIsDisabled()}
        className={`item${previousIsDisabled() ? ' disabled' : ''}`}
        onClick={() => {
          pagination.actions.previous(dataset[pagination.params.previous])
        }}
      >
        <i aria-hidden="true" className="chevron left icon" />
      </button>

      <button
        disabled={nextIsDisabled()}
        className={`item${nextIsDisabled() ? ' disabled' : ''}`}
        onClick={() => {
          pagination.actions.next(dataset[pagination.params.next])
        }}
      >
        <i aria-hidden="true" className="chevron right icon" />
      </button>
    </div>
  )
}

export default Pagination
