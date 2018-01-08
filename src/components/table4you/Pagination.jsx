import React from 'react'
import { objToQS } from './index'


const queryString = inputQueryString => ({
    object: inputQueryString,
    str: objToQS(inputQueryString),
    toString: () => objToQS(inputQueryString)
});

const Pagination = props => {
  const { dataset, pagination, inputQueryString } = props

  const adjacentItem = pagination.adjacentItem
  const getCurrentNumber = pagination.getCurrentNumber
  const getMaxCountNumber = pagination.getMaxCountNumber


  const previousIsDisabled = () => !(pagination.actions.previous && dataset[pagination.params.previous]);
  const nextIsDisabled = () => !(pagination.actions.next && dataset[pagination.params.next]);

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
      className='ui pagination menu'
      onKeyDown={(event) => {
        if (event.keyCode === 37) {
          pagination.actions.next(dataPrev, queryString(inputQueryString))
        }
        if (event.keyCode === 39) {
          pagination.actions.next(dataNext, queryString(inputQueryString))
        }
      }}
    >
      <button
        disabled={previousIsDisabled()}
        className={`item${previousIsDisabled() ? ' disabled' : ''}`}
        onClick={() => {
          pagination.actions.previous(dataPrev, queryString(inputQueryString))
        }}
      >
        <i aria-hidden="true" className="chevron left icon" />
      </button>
      {makeItems().map(e => (
        <button
          key={e.n}
          className={`item ${e.current && ' active'}`}
          onClick={() => {
            pagination.actions.gotoNumber(e.n, queryString(inputQueryString))
          }}
        >{e.n}</button>
      ))}
      <button
        disabled={nextIsDisabled()}
        className={`item${nextIsDisabled() ? ' disabled' : ''}`}
        onClick={() => {
          pagination.actions.next(dataNext, queryString(inputQueryString))
        }}
      >
        <i aria-hidden="true" className="chevron right icon" />
      </button>
    </div>
  )
}

export default Pagination
