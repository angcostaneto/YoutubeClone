import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router";
import {DateTime} from "luxon";
import {ChannelItem, ChannelRowCardInterface} from "../channelRow/channelRowInterface";
import {VideoRowCardInterface, VideoRowItem} from "../videoRow/videoRowInterface";
import CircularProgress from "@material-ui/core/CircularProgress";
import ChannelRow from "../channelRow/channelRow";
import VideoRow from "../videoRow/videoRow";
import TuneIcon from '@material-ui/icons/Tune';

const searchChannel = async (searchTerm: string) => {
    return axios
        .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=channel&q=${searchTerm}&safeSearch=none&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
}

const searchVideos = async (searchTerm: string) => {
    return axios
        .get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=9&type=video&q=${searchTerm}&safeSearch=none&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
}

const SearchPage = () => {
    const { searchQuery } = useParams();

    const [channelRow, setChannelRow] = useState<ChannelRowCardInterface>();
    const [videoRows, setVideoRows] = useState<VideoRowCardInterface[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            const channelResponse = await searchChannel(searchQuery as string);
            await createChannelRow(channelResponse.data.items);
            const videoResponse = await searchVideos(searchQuery as string);
            await createVideoRows(videoResponse.data.items);
        }

        fetch()
            .catch(console.error);
    }, [searchQuery]);

    const createChannelRow = async (channel: ChannelItem) => {
        const channelId = channel.id.channelId;
        const response = await axios
            .get(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
        const noOfVideos = response.data.items[0].statistics.videoCount;
        const subs = response.data.items[0].statistics.subscriberCount;
        const snippet = channel.snippet;
        const title = snippet.title;
        const description = snippet.description;
        const image = snippet.thumbnails.medium.url;

        setChannelRow({
            channelId,
            image,
            title,
            subs,
            noOfVideos,
            description
        });
    }

    const createVideoRows = async (videos: VideoRowItem[]) => {
        const newVideoRows: VideoRowCardInterface[] = [];
        for (const video of videos) {
            const videoId = video.id.videoId;
            const response = await axios
                .get(`https://www.googleapis.com/youtube/v3/videos?part=statistics%2C%20snippet&id=${videoId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
            const views = response.data.items[0].statistics.viewCount;
            const snippet = video.snippet;
            const title = snippet.title;
            const timestamp = DateTime.fromISO(snippet.publishedAt).toRelative();
            const channel = snippet.channelTitle;
            const description = snippet.description;
            const image = snippet.thumbnails.medium.url;

            newVideoRows.push({
                videoId,
                title,
                image,
                views,
                timestamp,
                channel,
                description
            });
        }
        setVideoRows(newVideoRows);
        setIsLoading(false);
    }

    return (
        <div className="searchpage">
            <div className="searchpage__filter">
                <TuneIcon/>
                <h2>Filter</h2>
            </div>
            {isLoading ? <CircularProgress className='loading' color='secondary'/> : null}
            <hr/>
            {!isLoading ?
                <ChannelRow
                    key={channelRow?.channelId}
                    image={channelRow?.image}
                    channel={channelRow?.title}
                    subs={channelRow?.subs}
                    noOfVideos={channelRow?.noOfVideos}
                    description={channelRow?.description}
                    channelId={channelRow?.channelId} /> : null
            }
            <hr/>
            {
                videoRows.map(item => {
                    return (
                        <VideoRow
                            title={item.title}
                            image={item.image}
                            views={item.views}
                            timestamp={item.timestamp}
                            channel={item.channel}
                            description={item.description} />
                    )
                })

            }
        </div>
    );
}

export default SearchPage;