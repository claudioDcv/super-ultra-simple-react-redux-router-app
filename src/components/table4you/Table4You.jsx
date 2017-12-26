import React from 'react'
import PropTypes from 'prop-types'
import { Table, Menu, Icon} from 'semantic-ui-react'
import _ from '../../texts'

class Table4You extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const { dataset, action, columns } = this.props
    return (
      <Table color='olive' selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>{_('Id')}</Table.HeaderCell>
            <Table.HeaderCell>{_('Name')}</Table.HeaderCell>
            <Table.HeaderCell>{_('Actions')}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {dataset.map(e => (
            <Table.Row key={e.id}>
              <Table.Cell>{columns.id(e)}</Table.Cell>
              <Table.Cell>{columns.name(e)}</Table.Cell>
              <Table.Cell>{action(e)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
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
      </Table>
    )
  }
}

Table4You.propTypes = {
  dataset: PropTypes.array.isRequired,
}

export default Table4You
