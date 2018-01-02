import React from 'react'
import { Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const BtnEdit = props => <Link to={props.to}>{
  props.children || <Icon name='edit' />
}</Link>

export default BtnEdit
