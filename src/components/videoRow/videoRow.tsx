import React from 'react';
import './videoRow.css';
import {VideoRowCardInterface} from "./videoRowInterface";



const VideoRow = ({views, description, timestamp, channel, title, image}: VideoRowCardInterface) => {
    return (
        <div className='videorow'>
            <img src={image} alt="" />
            <div className="videorow__text">
                <h3>{title}</h3>
                <p className='videorow__headline'>
                    {channel} • {views} views • {timestamp}
                </p>
                <p className='videorow__description'>
                    {description}
                </p>
            </div>
        </div>
    )
}

export default VideoRow;
