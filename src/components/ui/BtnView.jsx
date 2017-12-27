import React from 'react'
import { Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default props => <Link to={props.to}>{
  props.children || <Icon name='eye' />
}</Link>
