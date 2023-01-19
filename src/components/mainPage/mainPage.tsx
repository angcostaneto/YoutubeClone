import React from 'react';
import Sidebar from "../sidebar/sidebar";
import RecommendedVideos from "../recommendedVideos/recommendedVideos";

const MainPage = () => {
    return (
        <div className={"app__mainpage"}>
            <Sidebar />
            <RecommendedVideos />
        </div>
    )
}

export default MainPage;