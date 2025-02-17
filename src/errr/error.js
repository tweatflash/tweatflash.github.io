import React from 'react'
import { Navigate, useParams } from 'react-router-dom'

const Error = () => {
  const data= useParams()
  return (
    <h1>
      customkized 404
    </h1>
  )
}

export default Error