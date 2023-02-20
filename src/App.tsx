import React from 'react';
import './App.css';
import Header from "./components/header/header";
import MainPage from "./components/mainPage/mainPage";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SearchMainPage from "./components/searchMainPage/searchMainPage";
import VideoMainPage from './components/videoMainPage/videoMainPage';

const App = () => {
  return (
      <div className={"App"}>
        <Router>
          <Header />
            <Routes>
                <Route path={'/'} element={<MainPage />} />
                <Route path={'/search/:searchQuery'} element={<SearchMainPage />} />
                <Route path={'/video/:videoId'} element={<VideoMainPage />} />
            </Routes>
        </Router>
      </div>
  )
}

export default App;
