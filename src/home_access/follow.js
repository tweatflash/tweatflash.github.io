import React, { useEffect, useState } from 'react'
import './follow.css'
import { Link } from 'react-router-dom'
import AsyncImg from './asyncImage'

const FollowDetails = ({item}) => {
  return (
    <div className='ex-users'>
      <div className='ex-usr-phto'>
          <AsyncImg
              srcImg={item.profileImage}
          />
      </div>
      <div className='ex-user-mre-data'>
      
          <div className='ex-user-desc'>
                  <p className='post-name'>
                      <Link to={`/${item.username}`}>
                          {item.name}
                      </Link>
                  </p>
                  <p className='userName'>
                      <span className='userName'>
                          @{item.username}
                      </span>
                  </p>
          </div>
          <button>
              Follow
          </button>
  </div>
  </div>
  )
}

export default FollowDetails