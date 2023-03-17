import React from 'react'

const BreadCrumbs = (props) => {
  return (
    <a href={`/user/${props.id}`}>{`${props.prefix} ${props.name} ${props.lastName}`}</a>
  )
}

export default BreadCrumbs