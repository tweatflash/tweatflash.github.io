import './cnt.css'
import React, { useEffect, useRef, useState } from 'react'
import MagicImageLoader from './magicImageLoader'

const Content_wrapper = ({item,index,im,setIm,setImgUrl,setPostClick}) => {
    const videoRef = useRef(null);
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

    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if (item.img){
            const img = new Image();
            img.src =item.img instanceof Array ? item.img[0]:item.img
            let width ,height
            img.onload = () => {
                const { naturalWidth, naturalHeight } = img;
                const aspectRatio = naturalWidth / naturalHeight;
        
                width = naturalWidth;
                height = naturalHeight;
        
               
        
                setDimensions({ width, height });
                
            };
           
        }
        if (item.video){
            const handleLoadedMetadata = () => {
                const { videoWidth, videoHeight } = videoRef.current;
                setDimensions({ width: videoWidth, height: videoHeight });
            };
            if (videoRef.current){
                const video = videoRef.current;
                video.addEventListener('loadedmetadata', handleLoadedMetadata);
            
                return () => {
                    video.removeEventListener('loadedmetadata', handleLoadedMetadata);
                };
            }
            
            
        }

    }, [item]);
    
    return (
        <>
            {
               totalLen ===1? <> 
                 { 
                    (!item.video  instanceof Array && item.video)  || (item.video instanceof Array && item.video.length) ? <div 
                        className='posts-img' style={{ 
                            aspectRatio :`${eval(dimensions.width / dimensions.height )}`,
                            maxWidth: '100%', 
                            maxHeight: '400px', 
                            overflow: 'hidden', 
                        }}>
                            <div className='blg-v-cnt'></div> 
                            <video 
                                ref={videoRef} 
                                className='blog-video' id={`video-post-${item._id}`} 
                                src={item.video instanceof Array? item.video[0] : item.video} 
                                onClick={()=>{
                                    setPostClick(false)
                                    toggleVideo(`video-post-${item._id}`)
                                }}
                            />
                        </div> : 
                        
                    ((item.img instanceof Array && item.img.length) ? <div 
                        className='posts-img' 
                        style={{ 
                            aspectRatio :`${eval(dimensions.width/dimensions.height )}`,
                            maxWidth: '100%', 
                            maxHeight: '430px', 
                            overflow: 'hidden', 
                        
                        }}>
                            <img 
                                style={{ 
                                    visibility:"hidden" ,
                                    opacity:0
                                }} 
                                onLoad={(e)=>{
                                    e.target.style.visibility="visible"
                                    e.target.style.opacity="1"
                                }}
                                src={item.img[0]} 
                                onClick={(e)=>{
                                    setPostClick(false)
                                    setImgUrl([item.img[0]])
                                    setIm(true)
                                }}
                                />
                    </div> :
                    
                    <div 
                        className='posts-img' 
                        style={{ 
                            aspectRatio :`${eval(dimensions.width/dimensions.height )}`,
                            maxWidth: '100%', 
                            maxHeight: '430px', 
                            overflow: 'hidden', 
                        }} >
                        <img src={item.img}
                            style={{ 
                                visibility:"hidden" ,
                                opacity:0   
                            }} 
                            onLoad={(e)=>{
                                e.target.style.visibility="visible"
                                e.target.style.opacity="1"
                            }}
                    
                            onClick={(e)=>{
                                setPostClick(false)
                                setImgUrl([item.img])
                                setIm(true)
                                

                            } }
                        />
                    </div>)
                    
                 }
               </> :<></>

            }
            {
                 totalLen>1 ? <div className='content-image-video ' onClick={() =>setPostClick(false)}>
                 <div className='civ-wrapper '>
                     <div className={`civ-list ${selectedFiles.length===3 ? "g-clm-3" :""}`}>
                         {selectedFiles.slice(0,4).map((file ,index)=>(
                             <div className='civ-data'>
                    
                                 {file.type ==='img' ? <img src={file.src} tabIndex={2} onClick={(e)=>{
                                    setImgUrl([file.src])         
                                    setIm(true)
                                 } }/> :<video  src={file.src}/>}
                                 {totalLen >4 && index==3? <div className='overflow-txt'>
                                    <p>+{eval( totalLen - 4)}</p>
                                 </div> :<></>}
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