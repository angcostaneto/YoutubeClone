import React, {useState} from "react";
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import AppsIcon from '@material-ui/icons/Apps';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Avatar from '@material-ui/core/Avatar';
import './header.css';

const Header = () => {
    const [inputSearch, setInputSearch] = useState('');

    return (
        <div className="header">
            <div className="header__left">
                <MenuIcon/>
                <Link to='/'>
                    <img
                        className='header__logo'
                        src='https://upload.wikimedia.org/wikipedia/commons/e/e1/Logo_of_YouTube_%282015-2017%29.svg'
                        alt=''
                    />
                </Link>
            </div>

            <div className="header__center">
                <input type='text' onChange={(element) => setInputSearch(element.target.value)} value={inputSearch}/>
                <Link to={`/search/${inputSearch}`}>
                    <SearchIcon className='header__searchbutton'/>
                </Link>
            </div>

            <div className="header__right">
                <VideoCallIcon className='header__icon'/>
                <AppsIcon className='header__icon'/>
                <NotificationsIcon className='header__icon'/>
                <Avatar>A</Avatar>
            </div>
        </div>
    )
}

export default Header;