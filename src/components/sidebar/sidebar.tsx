import React from "react";
import SidebarRow from "../sidebarRow/sidebarRow";
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import HistoryIcon from '@material-ui/icons/History';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import './sidebar.css';

const Sidebar = () => {
    return (
        <div className={'sidebar'}>
            <SidebarRow Icon={HomeIcon} title='Home' selected={true}/>
            <SidebarRow Icon={WhatshotIcon} title='Trending' selected={false} />
            <SidebarRow Icon={SubscriptionsIcon} title='Subscription' selected={false} />
            <hr />
            <SidebarRow Icon={VideoLibraryIcon} title='Library' selected={false} />
            <SidebarRow Icon={HistoryIcon} title='History' selected={false} />
            <SidebarRow Icon={OndemandVideoIcon} title='Your videos' selected={false} />
            <SidebarRow Icon={WatchLaterIcon} title='Watch later' selected={false} />
            <SidebarRow Icon={ThumbUpIcon} title='Liked vides' selected={false} />
            <hr />
        </div>
    )
}

export default Sidebar;