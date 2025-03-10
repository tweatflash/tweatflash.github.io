import React from 'react'
import { useNavigate } from 'react-router-dom'

const Botttom_nav = () => {
    const navigator=useNavigate()
    const navigation_objexts=[
        {
            "active":true,
            "svg_path4":"",
            "svg_path2":"",
            "svg_path3":"",
            "fill":true,
            "name":"Home",
            "route":"/home",
            "svg_path":"M512 128 128 447.936V896h255.936V640H640v256h255.936V447.936z",
            "class_vb":"0 0 1024 1024",
            "css_class":"css007-shm"
        },
        {
            "active":false,
            "svg_path4":"",
            "svg_path2":"",
            "svg_path3":"",
            "fill":true,
            "name":"Explore",
            "route":"/explore",
            "svg_path":"M12 12H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM16 8L9.5 9.5L8 16L14.5 14.5L16 8Z",
            "class_vb":"0 0 24 24",
            "css_class":"css007-ssh"
        },
        // {
        //     "active":false,
        // "svg_path4":"",
        //     "svg_path2":"M16 12L8 12",
        //     "svg_path3":"M12 8L12 16",
        //     "fill":false,
        //     "name":"Upload",
        //     "route":"/trends",
        //     "svg_path":"M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z",
        //     "css_class":"add-plus-shit"
        // },
        {
            "active":false,
            "svg_path4":"",
            "svg_path2":"",
            "svg_path3":"",
            "fill":false,
            "name":"Videos",
            "route":"/trends",
            "svg_path":"M3 9H9.5M21 9H9.5M9.5 9L14.5 4M14.5 4H17.8C18.8467 4 19.4044 4 19.8221 4.1779M14.5 4H6.2C5.07989 4 4.51984 4 4.09202 4.21799C3.71569 4.40973 3.40973 4.71569 3.21799 5.09202C3 5.51984 3 6.07989 3 7.2V16.8C3 17.9201 3 18.4802 3.21799 18.908C3.40973 19.2843 3.71569 19.5903 4.09202 19.782C4.51984 20 5.07989 20 6.2 20H17.8C18.9201 20 19.4802 20 19.908 19.782C20.2843 19.5903 20.5903 19.2843 20.782 18.908C21 18.4802 21 17.9201 21 16.8V7.2C21 6.07989 21 5.51984 20.782 5.09202C20.5903 4.71569 20.2843 4.40973 19.908 4.21799C19.88 4.20371 19.8514 4.19037 19.8221 4.1779M9 4L4 9M15 9.00015L19.8221 4.1779M15 14.5L10 17.5V11.5L15 14.5Z",
            "class_vb":"0 0 24 24",
            "css_class":"css007-sts"
        },
        {
            "active":false,
            "svg_path4":"",
            "svg_path2":"",
            "svg_path3":"",
            "fill":false,
            "name":"Messages",
            "route":"/community",
            "svg_path":"M7.501 19.917L7.471 21H.472l.029-1.027c.184-6.618 3.736-8.977 7-8.977.963 0 1.95.212 2.87.672-.444.478-.851 1.03-1.212 1.656-.507-.204-1.054-.329-1.658-.329-2.767 0-4.57 2.223-4.938 6.004H7.56c-.023.302-.05.599-.059.917zm15.998.056L23.528 21H9.472l.029-1.027c.184-6.618 3.736-8.977 7-8.977s6.816 2.358 7 8.977zM21.437 19c-.367-3.781-2.17-6.004-4.938-6.004s-4.57 2.223-4.938 6.004h9.875zm-4.938-9c-.799 0-1.527-.279-2.116-.73-.836-.64-1.384-1.638-1.384-2.77 0-1.93 1.567-3.5 3.5-3.5s3.5 1.57 3.5 3.5c0 1.132-.548 2.13-1.384 2.77-.589.451-1.317.73-2.116.73zm-1.5-3.5c0 .827.673 1.5 1.5 1.5s1.5-.673 1.5-1.5-.673-1.5-1.5-1.5-1.5.673-1.5 1.5zM7.5 3C9.433 3 11 4.57 11 6.5S9.433 10 7.5 10 4 8.43 4 6.5 5.567 3 7.5 3zm0 2C6.673 5 6 5.673 6 6.5S6.673 8 7.5 8 9 7.327 9 6.5 8.327 5 7.5 5z",
            "class_vb":"0 0 24 24",
            "css_class":"css007-smg"
        },
        {
           "active":false,
           "svg_path4":"",
            "svg_path2":"",
            "svg_path3":"",
            "fill":true,
            "name":"profile",
            "route":"/profile",
            "svg_path":"M12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4ZM14 8C14 6.9 13.1 6 12 6C10.9 6 10 6.9 10 8C10 9.1 10.9 10 12 10C13.1 10 14 9.1 14 8ZM18 18C17.8 17.29 14.7 16 12 16C9.31 16 6.23 17.28 6 18H18ZM4 18C4 15.34 9.33 14 12 14C14.67 14 20 15.34 20 18V20H4V18Z",
            "class_vb":"0 0 24 24",
            "css_class":"css007-psn"
        }
    ]
    
    return (
        <div className='mobile-nav'>
            
            <div className="bm-wrapper">
                <div className='bm-links'>
                    {
                        navigation_objexts.map(item=> (
                            <div className={`bm-link`} key={item.name} onClick={()=>navigator(item.route)}>
                                <div className='css0006_svg css0008_wh100'>
 
                                    <svg className={`css_svg ${item.css_class}`} viewBox={item.class_vb}>
                                        <g>
                                            <path d={item.svg_path}></path>
                                            {item.svg_path2 ? <path d={item.svg_path2}></path> :<></>}
                                            {item.svg_path3 ? <path d={item.svg_path3}></path> :<></>}
                                            {item.svg_path4 ? <path d={item.svg_path4}></path> :<></>}
                                        </g>
                                    </svg>
                                    
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Botttom_nav