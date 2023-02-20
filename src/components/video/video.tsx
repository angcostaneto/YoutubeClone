import React from "react";
import YouTube from "react-youtube";

const Video = ({ videoId }: {videoId: string} ) => {
    const opts = {
        width: '740',
    };

    return (
        <div>
          <YouTube
            opts={opts}
            videoId={videoId}
          />
        </div>
    )
}

export default Video;