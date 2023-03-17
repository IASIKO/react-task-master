import React from 'react'
import { Link } from 'react-router-dom'

const BreadCrumbs = (props) => {
  return (
    <Link to={`/user/${props.id}`}>{`${props.prefix} ${props.name} ${props.lastName} > `}</Link>
  )
}

export default BreadCrumbs