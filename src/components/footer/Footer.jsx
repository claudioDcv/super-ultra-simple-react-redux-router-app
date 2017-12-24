import React from 'react'
import { CREATE_BY } from '../../conf/config'

export default () => (
  <footer>{CREATE_BY} {new Date().getFullYear()}</footer>
)
