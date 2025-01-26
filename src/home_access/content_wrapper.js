import './cnt.css'
import React, { useEffect, useState } from 'react'
const Content_wrapper = ({item,setPostClick,im,setIm,setImgUrl}) => {
    const imageIsAnArray = item.img instanceof Array ? true :false
    const videoIsAnAray=item.video instanceof Array ? true :false
    const [imageLength,setImageLength]=useState()
    const [videolength,setVideoLength] =useState()
    const [images,setImages] =useState([])
    const [videos,setVideos] =useState([])
    const [selectedFiles,setSelectedFiles] =useState([])
    const [totalLen,setTotalLen] =useState(0)
    
    useEffect(()=>{
        // console.log(item.img)
        if (imageIsAnArray){
            setImageLength(item.img.length)
            if (item.img.length){
                let djddj =[]
                item.img.forEach((element,index) => {
                    djddj.push({
                        "type":"img",
                        "src":element
                    })
                });
                setSelectedFiles([...selectedFiles , ...djddj])
            }
           
            // console.log("image array length :" + item.img.length)
        }
        if (!imageIsAnArray) {
            setImageLength(item.img ? 1 :0)
            if (item.img){
                let trou={
                    "type":"img",
                    "src":item.img
                }
                setSelectedFiles([...selectedFiles ,trou])
            }
            // console.log("image array string :" + item.img)
        } 
        if (videoIsAnAray){
            setVideoLength(item.video.length)
            setVideos(item.video)

            if (item.video.length){
                // let djddj =[]
                let djddj2 =[]
                item.video.forEach(element => {
                djddj2.push({
                    "type":"video",
                    "src":element
                })
                });
                setSelectedFiles([...selectedFiles , ...djddj2])
            }
            // console.log("video array length :" + item.video.length)
        }
         if (!videoIsAnAray) {
            setVideoLength(item.video ? 1 :0)
            if (item.video){
                let trou={
                    "type":"video",
                    "src":item.video
                }
                setSelectedFiles([...selectedFiles ,trou])
            }
            // console.log("video array string :" + item.video)
        }
        
    },[])
    useEffect(()=>{ 
        setTotalLen(videolength + imageLength)
    },[videolength,imageLength])
    useEffect(()=>{
        // console.log(selectedFiles)
    },[selectedFiles])
    return (
        <>

{/* {  (item.video instanceof Array && item.img instanceof Array) && (item.video.length + item.img.length )} */}
            
{/* {item.video && item.video.length ? <video className='blog-video' src={item.video[0]} controls></video> : <></>}
{item.img || (item.img instanceof Array && item.img.length ) ? 
    <div className='posts-img' onClick={(e)=>{
        e.preventDefault()
        
        }}>
            
            <img src={  item.img instanceof Array ? item.img[0] : item.img} tabIndex={"2"} onFocus={()=>setPostClick(false)} onBlur={()=>setPostClick(true)}/>
        </div>
    : <></> 
} */}       {
               totalLen ===1? <> 
                 { 
                     (!item.video  instanceof Array && item.video)  || (item.video instanceof Array && item.video.length) ? <video className='blog-video' controls src={item.video instanceof Array? item.video[0] : item.video}/> : ((item.img instanceof Array && item.img.length) ? <div className='posts-img' ><img src={item.img[0]} onClick={(e)=>{
                        setImgUrl(item.img[0])
                        setIm(true)
                     } }/></div> :<div className='posts-img' ><img src={item.img} onClick={(e)=>{
                        setImgUrl(item.img)
                        setIm(true)
                     } }/></div>)
                    
                 }
               </> :<></>

            }
            {
                 totalLen>1 ? <div className='image-video-container '>
                 <div className='i-v-wrapper'>
                     <div className='i-v-list'>
                         {selectedFiles.map((file)=>(
                             <div className='p-v-i-img'>
                    
                                 {file.type ==='img' ? <img src={file.src} tabIndex={2} onClick={(e)=>{
                                    setImgUrl(file.src)
                                    setIm(true)
                                 } }/> :<video controls  src={file.src}/>}
                             </div>
                         ))}
                     </div>
                 </div>
             </div>:<></>
            }
        </>

                
            
        
    )
}

export default Content_wrapper