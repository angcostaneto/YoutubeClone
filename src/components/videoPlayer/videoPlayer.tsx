import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Video from '../video/video';
import RecommendedVideos from '../recommendedVideos/recommendedVideos';
import VideoInfo from '../videoInfo/videoInfo';
import axios from 'axios';
import { CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { VideoItem } from '../recommendedVideos/videoItemsInterface';
import { VideoInfoInterface } from '../videoInfo/videoInfoInterface';

const VideoPlayer = () => {
    const { videoId } = useParams();
    const [videoInfo, setVideoInfo] = useState<VideoInfoInterface>({} as unknown as VideoInfoInterface);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const getVideo = async () => {
        return axios
            .get(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2C%20statistics&id=${videoId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`);
    }

    useEffect(() => {
        const fetch = async () => {
            const response = await getVideo();
            await createVideoInfo(response.data['items'][0]);
        }

        fetch()
            .catch(console.error);
    }, [videoId]);

    const createVideoInfo = async (video: VideoItem) => {
        const snippet = video.snippet;
        const stats = video.statistics;
        const channelId = snippet.channelId;
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet%2C%20statistics&id=${channelId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)

        const channelImage = response.data.items[0].snippet.thumbnails.medium.url;
        const subs = response.data.items[0].statistics.subscriberCount;
        const publishedDate = new Date(snippet.publishedAt).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
        const title = snippet.title;
        const description = snippet.description;
        const channelTitle = snippet.channelTitle;
        const viewCount = stats.viewCount;
        const likeCount = stats.likeCount;
        const dislikeCount = (stats.dislikeCount) ? stats.dislikeCount : '0';

        setVideoInfo({
            title,
            description,
            publishedDate,
            channelTitle,
            channelImage,
            viewCount,
            likeCount,
            dislikeCount,
            subs
        });

        setIsLoading(false);
    }

    if (isError) {
        return <Alert severity="error" className='loading'>No Results found!</Alert>
    }

    return (
        <div className='videoplayer'>
            <div className='videoplayer__videodetails'>
                <div className='videoplayer__video'>
                    {isLoading ? <CircularProgress className='loading' color='secondary' /> : <Video videoId={videoId ?? ''} />}
                </div>
                <div className='videoplayer__videoinfo'>
                    {!isLoading ? <VideoInfo
                        title={videoInfo.title}
                        description={videoInfo.description}
                        publishedDate={videoInfo.publishedDate}
                        channelTitle={videoInfo.channelTitle}
                        channelImage={videoInfo.channelImage}
                        viewCount={videoInfo.viewCount}
                        likeCount={videoInfo.likeCount}
                        dislikeCount={videoInfo.dislikeCount}
                        subs={videoInfo.subs}
                    /> : null
                    }
                </div>
            </div>
            <div className='videoplayer__suggested'>
                <RecommendedVideos />
            </div>
        </div>
    )
}

export default VideoPlayer;