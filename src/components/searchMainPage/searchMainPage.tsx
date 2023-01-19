import React from 'react';
import Sidebar from "../sidebar/sidebar";
import SearchPage from "../searchPage/searchPage";

const SearchMainPage = () => {
    return (
        <div className={"app__mainpage"}>
            <Sidebar />
            <SearchPage />
        </div>
    )
}

export default SearchMainPage;