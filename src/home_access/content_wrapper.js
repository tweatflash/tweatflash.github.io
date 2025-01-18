import React from 'react'

const Content_wrapper = ({item,setPostClick}) => {
  return (
    <>
        
                           {/* {  (item.video instanceof Array && item.img instanceof Array) && (item.video.length + item.img.length )} */}
                        
            {item.video && item.video.length ? <video className='blog-video' src={item.video[0]} controls></video> : <></>}
            {item.img || (item.img instanceof Array && item.img.length ) ? 
                <div className='posts-img' onClick={(e)=>{
                    e.preventDefault()
                    
                    }}>
                        
                         <img src={  item.img instanceof Array ? item.img[0] : item.img} tabIndex={"2"} onFocus={()=>setPostClick(false)} onBlur={()=>setPostClick(true)}/>
                    </div>
                : <></> 
            }
        ?
    </>
  )
}

export default Content_wrapper