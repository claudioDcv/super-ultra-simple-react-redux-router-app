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
    const { action, columns, className, nameResultSet, id, idFunction } = this.props
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
          dataset
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

/*
<Table.Footer>
  <Table.Row>
    <Table.HeaderCell colSpan='4'>
      <Menu floated='right' pagination>
        <Menu.Item as='a' icon>
          <Icon name='left chevron' />
        </Menu.Item>
        <Menu.Item as='a'>1</Menu.Item>
        <Menu.Item as='a'>2</Menu.Item>
        <Menu.Item as='a'>3</Menu.Item>
        <Menu.Item as='a'>4</Menu.Item>
        <Menu.Item as='a' icon>
          <Icon name='right chevron' />
        </Menu.Item>
      </Menu>
    </Table.HeaderCell>
  </Table.Row>
</Table.Footer>
*/
