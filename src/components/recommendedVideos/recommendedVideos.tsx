import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import {VideoItem} from "./videoItemsInterface";
import {VideoCardInterface} from "../videoCard/videoCardInterface";
import VideoCard from "../videoCard/videoCard";
import {DateTime} from "luxon";
import './recommendedVideos.css';

const RecommendedVideos = () => {
    const [videoCards, setVideoCards] = useState<VideoCardInterface[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const getVideos = async () => {
        return axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=9&regionCode=BR&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
    }

    useEffect(() => {
        const fetch = async () => {
            const response = await getVideos();
            await createVideoCards(response.data.items)
        }
        fetch()
            .catch(console.error);
    }, []);

    const createVideoCards = async (videoItems: VideoItem[]) => {
        const newVideoCards: VideoCardInterface[] = [];
        for (const video of videoItems) {
            const videoId = video.id;
            const snippet = video.snippet;
            const channelId = snippet.channelId;
            const response = await axios
                .get(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
            const channelImage = response.data.items[0].snippet.thumbnails.medium.url;

            const title = snippet.title;
            const image = snippet.thumbnails.medium.url;
            const views = video.statistics.viewCount;
            const timestamp = DateTime.fromISO(snippet.publishedAt).toRelative();
            const channel = snippet.channelTitle;

            newVideoCards.push({
                videoId,
                image,
                title,
                channel,
                views,
                timestamp,
                channelImage
            });
        }

        setVideoCards(newVideoCards);
        setIsLoading(false);
    }

    return (<div className='recommendedvideos'>
        { isLoading ? <CircularProgress className='loading' color='secondary' /> : null }
        <div className="recommendedvideos__videos">
            {
                videoCards.map(item => {
                    return (
                        <Link key={item.videoId} to={`/video/${item.videoId}`}>
                            <VideoCard
                                title={item.title}
                                image={item.image}
                                views={item.views}
                                timestamp={item.timestamp}
                                channel={item.channel}
                                channelImage={item.channelImage}
                            />
                        </Link>
                    )
                })
            }
        </div>
    </div>);
}

export default RecommendedVideos;