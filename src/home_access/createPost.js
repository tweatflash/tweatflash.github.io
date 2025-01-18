import React, { useContext, useEffect, useRef, useState } from 'react'
import './create-posts.css'
import useWindowSize from '../hooks/useWindowSize'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/authProvider'
import axios from '../api/axios'

const CreatePosts = () => {
    const {width} =useWindowSize()
    const navigate=useNavigate()
    const fileRef =useRef(null)
    const {cook,cookies2}=useContext(AuthContext)
    const [text,setText] =useState("")
    const [validText,setvalidText] =useState(false)
    const [v,setV]=useState("")
    const [imrg,setImrg] =useState(false)
    const [iS,setIS]=useState('')
    const [vdr,setVdr] =useState(false)
    const [vS,setVS]=useState('')   
    const [eachObjext,setEachObjext] =useState([])
    const [displayObject,setDisplayObject] =useState([])
    const [selectedFiles, setSelectedFiles] = useState([]);
    
    let formData
    // 
    const signedCookies = { 
        refreshToken:cook,
        accessToken:cookies2
    }; 
   
    
    
    formData = new FormData();
    useEffect(()=>{
        // formData = new FormData();

        if(text || selectedFiles.length){
            setvalidText(true)
        }else{
            setvalidText(false)
            formData.delete("text")
        }
       
    },[text])
    useEffect(()=>{
        if (selectedFiles.length){
            setvalidText(true)
            
        }
        
    },[selectedFiles])
    const handleFileChange = (event) => {
        event.preventDefault();
        setSelectedFiles([...selectedFiles, ...Array.from(event.target.files)]);
        
        
        
        
      };
    // then this is how I send the request
    const uploadPostToBackend= async ()=>{
            if (text){
                formData.append("text",text) 
            }
            formData.append('signedCookies', JSON.stringify(signedCookies))
            if (selectedFiles.length){
                selectedFiles.forEach((file) => {
                    file.type.startsWith('image/')? formData.append('image', file) : formData.append('video', file) ;
                });
            }
        for (let pair of formData.entries()) { console.log(pair[0] + ':', pair[1]); };
        // console.log(formData)
        try {
            const request =await axios.post('https://tweatflash.onrender.com/api/v1/posts/create',formData,{ headers: { 'Content-Type': 'multipart/form-data' } })
            const response=await request
            console.log(request)
        } catch (error) {
            console.log(error)
        }


    }
    
    return (
    <div className='over-react'>
        <div className='create-container'>
            <div className='craete-header'>
                <button className= {width <= 450 ? "mb-back" : ""} onClick={() => navigate(-1)}>
                     <svg viewBox="0 0 24 24" fill="none" ><g  strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g> <path d="M11 6L5 12M5 12L11 18M5 12H19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                    {width <= 450? "" : "back"}
                </button>

                <div className='cr-options'>
                    <button className='publish' disabled={validText || displayObject.length ? false : true} onClick={()=>uploadPostToBackend()}>Publish</button>
                </div>
            </div>
            <div className='create-body'>
                <textarea 
                    placeholder='What is on your mind'
                    value={text}
                    onChange={(e)=>setText(e.target.value)} 
                ></textarea>
                
                <>
                    {selectedFiles.length ?<div className='image-video-container'>
                        <div className='i-v-wrapper'>
                            <div className='i-v-list'>
                                {selectedFiles.map((file)=>(
                                    <div className='p-v-i-img'>
                                        <div className='pvi-h'>
                                            <div className='pvi-ho'>
                                            <svg width="25px" height="25px" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>cancel</title> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="work-case" fill="#ffffff" transform="translate(91.520000, 91.520000)"> <polygon id="Close" points="328.96 30.2933333 298.666667 1.42108547e-14 164.48 134.4 30.2933333 1.42108547e-14 1.42108547e-14 30.2933333 134.4 164.48 1.42108547e-14 298.666667 30.2933333 328.96 164.48 194.56 298.666667 328.96 328.96 298.666667 194.56 164.48"> </polygon> </g> </g> </g></svg>
                                            </div>
                                            <div className='pvi-ho'></div>
                                        </div>
                                        {file.type.startsWith('image/') ? <img src={URL.createObjectURL(file)}/> :<video controls  src={URL.createObjectURL(file)} ></video>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div> :
                    <></>}
                </>
            </div>
            
            <div className='posts-optipons'>
                <div className='post-option-container'>
                    <div className='create-action'>
                        <input id='file' ref={fileRef} onChange={handleFileChange} type='file' className='file-selector' accept='image/jpeg,image/png,image/webp,image/gif,video/mp4,video/quicktime' multiple tabIndex={'-1'} />
                        <label htmlFor='file'>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.2639 15.9375L12.5958 14.2834C11.7909 13.4851 11.3884 13.086 10.9266 12.9401C10.5204 12.8118 10.0838 12.8165 9.68048 12.9536C9.22188 13.1095 8.82814 13.5172 8.04068 14.3326L4.04409 18.2801M14.2639 15.9375L14.6053 15.599C15.4112 14.7998 15.8141 14.4002 16.2765 14.2543C16.6831 14.126 17.12 14.1311 17.5236 14.2687C17.9824 14.4251 18.3761 14.8339 19.1634 15.6514L20 16.4934M14.2639 15.9375L18.275 19.9565M18.275 19.9565C17.9176 20 17.4543 20 16.8 20H7.2C6.07989 20 5.51984 20 5.09202 19.782C4.71569 19.5903 4.40973 19.2843 4.21799 18.908C4.12796 18.7313 4.07512 18.5321 4.04409 18.2801M18.275 19.9565C18.5293 19.9256 18.7301 19.8727 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V16.4934M4.04409 18.2801C4 17.9221 4 17.4575 4 16.8V7.2C4 6.0799 4 5.51984 4.21799 5.09202C4.40973 4.71569 4.71569 4.40973 5.09202 4.21799C5.51984 4 6.07989 4 7.2 4H16.8C17.9201 4 18.4802 4 18.908 4.21799C19.2843 4.40973 19.5903 4.71569 19.782 5.09202C20 5.51984 20 6.0799 20 7.2V16.4934M17 8.99989C17 10.1045 16.1046 10.9999 15 10.9999C13.8954 10.9999 13 10.1045 13 8.99989C13 7.89532 13.8954 6.99989 15 6.99989C16.1046 6.99989 17 7.89532 17 8.99989Z" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                        </label>
                    </div>
                    <div className='create-action'>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M22 9H2M14 17.5L16.5 15L14 12.5M10 12.5L7.5 15L10 17.5M2 7.8L2 16.2C2 17.8802 2 18.7202 2.32698 19.362C2.6146 19.9265 3.07354 20.3854 3.63803 20.673C4.27976 21 5.11984 21 6.8 21H17.2C18.8802 21 19.7202 21 20.362 20.673C20.9265 20.3854 21.3854 19.9265 21.673 19.362C22 18.7202 22 17.8802 22 16.2V7.8C22 6.11984 22 5.27977 21.673 4.63803C21.3854 4.07354 20.9265 3.6146 20.362 3.32698C19.7202 3 18.8802 3 17.2 3L6.8 3C5.11984 3 4.27976 3 3.63803 3.32698C3.07354 3.6146 2.6146 4.07354 2.32698 4.63803C2 5.27976 2 6.11984 2 7.8Z"  stroke-linecap="round" stroke-linejoin="round"></path> </g></svg> 
                    </div>
                    <div className='create-action'>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M20.6472 13.7545L21.2766 14.1623L20.6472 13.7545C20.4715 14.0256 20.2404 14.2752 19.647 14.9058L15.4667 19.3473C14.7767 20.0804 14.5029 20.3659 14.1962 20.5791C13.785 20.8649 13.3208 21.0655 12.8308 21.169C12.4654 21.2462 12.0698 21.25 11.0631 21.25C9.62515 21.25 8.58506 21.2496 7.76313 21.1923C6.94813 21.1356 6.40373 21.0256 5.95094 20.8336C4.69662 20.3019 3.69812 19.3034 3.16638 18.0491C2.97444 17.5963 2.86444 17.0519 2.80767 16.2369C2.75042 15.4149 2.75 14.3748 2.75 12.9369V11.6C2.75 9.90747 2.75058 8.68317 2.82925 7.72029C2.90721 6.76615 3.05809 6.13493 3.32222 5.61655C3.82555 4.6287 4.6287 3.82555 5.61655 3.32222C6.13493 3.05809 6.76615 2.90721 7.72029 2.82925C8.68317 2.75058 9.90747 2.75 11.6 2.75H13.1363C14.48 2.75 15.4519 2.75037 16.2211 2.80049C16.984 2.8502 17.4953 2.94657 17.9222 3.11455C19.2784 3.64817 20.3518 4.72155 20.8855 6.07779C21.0534 6.50473 21.1498 7.01596 21.1995 7.77888C21.2496 8.54813 21.25 9.52002 21.25 10.8637C21.25 11.7295 21.2472 12.0697 21.1893 12.3875C21.1006 12.8745 20.9163 13.3391 20.6472 13.7545Z"  stroke-linecap="round" stroke-linejoin="round"></path> 
                                <path d="M13 21V19.3784V19.3784C13 15.8557 15.8557 13.0001 19.3784 13.0002V13.0002H21"  stroke-linecap="round" stroke-linejoin="round"></path> 
                                <path d="M8.33957 11.406C6.68121 11.406 5.69995 10.432 5.69995 8.69756C5.69995 6.98488 6.68121 6 8.2925 6C9.33894 6 10.1283 6.44899 10.4361 6.99936C10.5121 7.14058 10.5411 7.26369 10.5411 7.39404C10.5411 7.77785 10.2731 8.04218 9.88207 8.04218C9.58153 8.04218 9.35342 7.92631 9.16513 7.67647C8.91891 7.34697 8.66907 7.20937 8.29974 7.20937C7.64798 7.20937 7.26417 7.74526 7.26417 8.67583C7.26417 9.62812 7.7023 10.1966 8.37578 10.1966C8.87546 10.1966 9.23031 9.91779 9.27376 9.49777L9.281 9.42535H8.98047C8.63648 9.42535 8.41199 9.24431 8.41199 8.91481C8.41199 8.58531 8.63286 8.40426 8.98047 8.40426H9.99069C10.4795 8.40426 10.7583 8.69393 10.7583 9.2081C10.7583 10.4501 9.89655 11.406 8.33957 11.406Z" strokeWidth='1.4' stroke='white' stroke-linecap="round" stroke-linejoin="round"></path> 
                                <path d="M12.5259 11.406C12.0371 11.406 11.7583 11.1163 11.7583 10.6021V6.80384C11.7583 6.28967 12.0371 6 12.5259 6C13.0147 6 13.2936 6.28967 13.2936 6.80384V10.6021C13.2936 11.1163 13.0147 11.406 12.5259 11.406Z" strokeWidth='1.4' stroke='white' stroke-linecap="round" stroke-linejoin="round"></path> 
                                <path d="M15.3112 11.3606C14.8224 11.3606 14.5436 11.0709 14.5436 10.5568V6.849C14.5436 6.33484 14.8224 6.04517 15.3112 6.04517H17.6105C18.0232 6.04517 18.2876 6.26604 18.2876 6.65709C18.2876 7.04815 18.016 7.26902 17.6105 7.26902H16.0788V8.26839H17.4548C17.8386 8.26839 18.0848 8.4784 18.0848 8.84411C18.0848 9.20981 17.8458 9.41983 17.4548 9.41983H16.0788V10.5568C16.0788 11.0709 15.8 11.3606 15.3112 11.3606Z"  stroke-linecap="round" stroke-linejoin="round" strokeWidth='1.4' stroke='white'></path> 
                            </g>
                        </svg> 
                    </div>
                    <div className='create-action'>
                        <svg fill="#ffffff"  className="hash" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g data-name="Layer 2"> <g data-name="hash"> <rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"></rect> <path d="M20 14h-4.3l.73-4H20a1 1 0 0 0 0-2h-3.21l.69-3.81A1 1 0 0 0 16.64 3a1 1 0 0 0-1.22.82L14.67 8h-3.88l.69-3.81A1 1 0 0 0 10.64 3a1 1 0 0 0-1.22.82L8.67 8H4a1 1 0 0 0 0 2h4.3l-.73 4H4a1 1 0 0 0 0 2h3.21l-.69 3.81A1 1 0 0 0 7.36 21a1 1 0 0 0 1.22-.82L9.33 16h3.88l-.69 3.81a1 1 0 0 0 .84 1.19 1 1 0 0 0 1.22-.82l.75-4.18H20a1 1 0 0 0 0-2zM9.7 14l.73-4h3.87l-.73 4z"></path> </g> </g> </g></svg>
                    </div>
                    <div className='create-action'>
                        <svg className='hash' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M7 11h7v2H7zm0-4h10.97v2H7zm0 8h13v2H7zM4 4h2v16H4z"></path></g></svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CreatePosts