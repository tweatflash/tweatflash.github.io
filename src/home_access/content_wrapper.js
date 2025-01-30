import './cnt.css'
import React, { useEffect, useState } from 'react'
const Content_wrapper = ({item,index,im,setIm,setImgUrl}) => {
    
    const [imageLength,setImageLength]=useState(0)
    const [videolength,setVideoLength] =useState(0)
    const [images,setImages] =useState([])
    const [videos,setVideos] =useState([])
    const [selectedFiles,setSelectedFiles] =useState([])
    const [totalLen,setTotalLen] =useState(0)
    const [imgIsArray,setImgArray]=useState(item.img instanceof Array ? true :false)
    const [videoIsArray,setVideoArray]=useState(item.video instanceof Array ? true :false)
    const hhharray=()=>{
        if (Array.isArray(item.img)){
            setImageLength(item.img.length) 
            let arrayImage=[]
            item.img.forEach((element) => {
                arrayImage.push({
                    "type":"img",
                    "src":element
                })
            });
            setSelectedFiles([...selectedFiles , ...arrayImage])
            
           
        }else if (!Array.isArray(item.img) && item.img){
            setImageLength(item.img ? 1 :0)
            const trou={
                "type":"img",
                "src":item.img
            }
            setSelectedFiles([...selectedFiles ,...[trou]])
        }
    }
    const hhhvideo=()=>{
        if (Array.isArray(item.video)){
            setVideoLength(item.video.length) 
            let arrayVideo=[]
            item.video.forEach((element) => {
                arrayVideo.push({
                    "type":"video",
                    "src":element
                })
            });
            setVideos([...videos , ...arrayVideo])
            
        }else if (!Array.isArray(item.video) && item.video){
            setVideoLength(item.video ? 1 :0)
            const viddd={
                "type":"video",
                "src":item.video
            }
            setVideos([...videos ,...[viddd]])
        } 
    }
    useEffect(()=>{
        hhharray()
        hhhvideo()
    },[])
    useEffect(()=>{
        if (videos.length){
            setSelectedFiles([...selectedFiles,...videos])
        }
    },[videos])
    function toggleVideo(videoId) {
        const video = document.getElementById(videoId);
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
    }
    useEffect(()=>{ 
        setTotalLen(eval(videolength + imageLength))
    },[selectedFiles])
    return (
        <>
            {
               totalLen ===1? <> 
                 { 
                     (!item.video  instanceof Array && item.video)  || (item.video instanceof Array && item.video.length) ? <video className='blog-video' id={`video-post-${index}`} src={item.video instanceof Array? item.video[0] : item.video} onClick={()=>toggleVideo(`video-post-${index}`)}/> : ((item.img instanceof Array && item.img.length) ? <div className='posts-img' ><img src={item.img[0]} onClick={(e)=>{
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
                 totalLen>1 ? <div className='content-image-video '>
                 <div className='civ-wrapper '>
                     <div className={`civ-list ${selectedFiles.length===3 ? "g-clm-3" :""}`}>
                         {selectedFiles.map((file)=>(
                             <div className='civ-data'>
                    
                                 {file.type ==='img' ? <img src={file.src} tabIndex={2} onClick={(e)=>{
                                    setImgUrl(file.src)         
                                    setIm(true)
                                 } }/> :<video  src={file.src}/>}
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