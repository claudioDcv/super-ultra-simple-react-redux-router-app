import React from 'react'

const Pagination = props => {
  const { dataset, pagination, onChangePagination } = props

  const adjacentItem = pagination.adjacentItem
  const getCurrentNumber = pagination.getCurrentNumber
  const getMaxCountNumber = pagination.getMaxCountNumber


  const previousIsDisabled = () => !dataset[pagination.params.previous];
  const nextIsDisabled = () => !dataset[pagination.params.next];

  const dataPrev = dataset[pagination.params.previous]
  const dataNext = dataset[pagination.params.next]
  const currentNumber = getCurrentNumber(dataPrev, dataNext)
  const maxNumber = getMaxCountNumber(
    dataPrev,
    dataNext,
    dataset[pagination.params.count],
    pagination.params.perPage
  )

  const makeItems = () => {
    const pages = []
    let init = currentNumber - adjacentItem
    init = init < 1 ? 1 : init

    let max = currentNumber + adjacentItem
    max = max > maxNumber ? maxNumber : max

    for (let i = init; i <= max; i++) {
      if (i === currentNumber) {
        pages.push({
          current: true,
          prev: false,
          next: false,
          n: i,
        })
      }
      if (i < currentNumber) {
        pages.push({
          current: false,
          prev: true,
          next: false,
          n: i,
        })
      }
      if (i > currentNumber) {
        pages.push({
          current: false,
          prev: false,
          next: true,
          n: i,
        })
      }
    }

    return pages
  }

  return (
    <div
      className={pagination.className || 'ui pagination menu'}
      onKeyDown={(event) => {
        if (event.keyCode === 37) {
          onChangePagination('NEXT_PAGE', {
            dataPrev: dataPrev,
            dataNext,
          })
        }
        if (event.keyCode === 39) {
          onChangePagination('PREV_PAGE', {
            dataPrev: dataPrev,
            dataNext,
          })
        }
      }}
      {...pagination.props}
    >
      <button
        disabled={previousIsDisabled()}
        className={`item${previousIsDisabled() ? ' disabled' : ''}`}
        onClick={() => {
          onChangePagination('PREV_PAGE', {
            dataPrev: dataPrev,
            dataNext,
          })
        }}
      >
        <i aria-hidden="true" className="chevron left icon" />
      </button>
      {makeItems().map(e => (
        <button
          key={e.n}
          className={`item ${e.current && ' active'}`}
          onClick={() => {
            onChangePagination('CHANGE_PAGE', {
              number: e.n,
              dataNext,
              dataPrev,
            })
          }}
        >{e.n}</button>
      ))}
      <button
        disabled={nextIsDisabled()}
        className={`item${nextIsDisabled() ? ' disabled' : ''}`}
        onClick={() => {
          onChangePagination('NEXT_PAGE', {
            dataPrev: dataPrev,
            dataNext,
          })
        }}
      >
        <i aria-hidden="true" className="chevron right icon" />
      </button>
    </div>
  )
}

export default Pagination
