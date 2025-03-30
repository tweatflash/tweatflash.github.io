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
                            width:"100%",
                            maxHeight: '400px', 
                            overflow: 'hidden', 
                        }}>
                            <div className='blg-v-cnt'>
                                <div className='video-toggler custm-fja'>
                                    <svg  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z" fill="#fff"></path> </g></svg>
                                </div>    
                            </div> 
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
                        className='posts-img img-img' 
                        style={{ 
                            aspectRatio :`${eval(dimensions.width/dimensions.height )}`,
                            maxWidth: '100%', 
                            maxHeight: '430px', 
                            overflow: 'hidden', 
                            minWidth:"240px",                                                                           
                        }}>
                            <img 
                                style={{ 
                                    visibility:"hidden" ,
                                    opacity:0,
                                }} 
                                onLoad={(e)=>{
                                    e.target.style.visibility="visible"
                                    e.target.style.opacity="1"
                                }}
                                onError={(e)=>{
                                    e.target.style.height="220px"
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
                            minWidth:"240px",
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
                            onError={(e)=>{
                                e.target.style.height="220px"
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