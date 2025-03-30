import React from 'react'
import { AsyncImage } from 'loadable-image'
import { Blur, Grow, Slide } from 'transitions-kit'

const AsyncImg = ({srcImg}) => {
  return (
    <>
        <AsyncImage
        
            src={srcImg}
            Transition={Blur}
            style={{ width: "100%", height: "100%", borderRadius: "0%" }}
            loader={<div style={{ background: '#888' }}></div>}
        />
    </>
  )
}

export default AsyncImg