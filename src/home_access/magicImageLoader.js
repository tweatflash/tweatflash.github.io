import React, { useEffect, useState } from 'react'

const MagicImageLoader = ({src}) => {
    const [dimensions, setDimensions] = useState({ naturalWidth: 0, naturalHeight: 0 });

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
        setDimensions({ naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight });
        };
    }, [src]);
    return (
        <div className='posts-img' >
            <img src={src}/>
        </div>
    )
}

export default MagicImageLoader
