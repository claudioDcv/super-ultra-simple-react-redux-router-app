import React from 'react'
import PropTypes from 'prop-types'
import Table from './Table'

class Table4You extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataset: null,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataset) {
      this.setState({ dataset: nextProps.dataset })
    }
  }

  render() {
    const { action, columns, className, nameResultSet, id, idFunction, pagination } = this.props
    const { dataset } = this.state
    return dataset ? (
      <Table
        options={{
          action,
          columns,
          className,
          nameResultSet,
          id,
          idFunction,
          dataset,
          pagination,
        }}
      />
    ) : (
      <span />
    )
  }
}

Table4You.propTypes = {
  dataset: PropTypes.object,
}

export default Table4You
