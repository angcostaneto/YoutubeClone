import React from "react";
import SidebarRow from "../sidebarRow/sidebarRow";
import { VideoInfoInterface } from "./videoInfoInterface";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ReplyIcon from '@material-ui/icons/Reply';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import { Avatar, Button } from '@material-ui/core';

const VideoInfo = ({
    title,
    description,
    publishedDate,
    channelTitle,
    channelImage,
    viewCount,
    likeCount,
    dislikeCount,
    subs
}: VideoInfoInterface) => {
    return (
        <div className='videoinfo'>
            <div className='videoinfo__headline'>
                <h1>{title}</h1>
            </div>
            <div className='videoinfo__stats'>
                <p>{viewCount} views • {publishedDate}</p>
                <div className="videoinfo__likes">
                    <SidebarRow Icon={ThumbUpIcon} title={likeCount} selected={false} />
                    <SidebarRow Icon={ThumbDownIcon} title={dislikeCount} selected={false} />
                    <SidebarRow Icon={ReplyIcon} title='SHARE' selected={false} />
                    <SidebarRow Icon={PlaylistAddIcon} title='SAVE' selected={false}  />
                    <SidebarRow Icon={MoreHorizIcon} title='' selected={false} />
                </div>
            </div>
            <hr />
            <div className="videoinfo__channel">
                <div>
                    <Avatar
                        className='videoinfo__avatar'
                        alt={channelTitle}
                        src={channelImage}
                    />
                    <div className='videoinfo__channelinfo'>
                        <h3 className='videoinfo__channeltitle'>{channelTitle}</h3>
                        <p className='videoinfo__channelsubs'>{subs} subscribers</p>
                    </div>

                </div>
                <div className='videoinfo__subscribe'>
                    <Button color='secondary' >SUBSCRIBE</Button>
                </div>
            </div>
            <div className='videoinfo__channeldesc'>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default VideoInfo;