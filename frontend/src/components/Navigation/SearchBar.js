// import { fetchSearchResults } from '../../store/search';
// import { useHistory } from 'react-router-dom';
// import { useState, useEffect, useRef } from 'react';
// import { useDispatch } from 'react-redux';
// import "./SearchBar.css"


// const SearchBar = () => {
//     const searchInputRef = useRef(null);


//     const dispatch = useDispatch();
//     const history = useHistory();
//     const [searchText, setSearchText] = useState("");

//     async function handleSearch(e) {
//         e.preventDefault();
//         const query = e.target.value;
//         await setSearchText(query);
//         dispatch(fetchSearchResults(query))
//     }

//     function handleSearchSubmit(e) {
//         e.preventDefault();
//         if (searchText.length > 0) {
//             history.push(`/search?pins=${searchText}`);
//         }
//     }




//     return (
//         <>
//         <div className="search-bar-container">
//             <i className="fas fa-search"></i>
//             <div className="search-bar-body">
//                 <input className="search-input" onChange={handleSearch} type="text" placeholder="Search"></input>
//                 <button className="search-button" onClick={handleSearchSubmit}>Search</button>
//             </div>
//         </div>
//         </>
//     )
// }

// export default SearchBar;

import { fetchSearchResults } from '../../store/search';
import { useHistory } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import "./SearchBar.css"


const SearchBar = () => {
    const searchInputRef = useRef(null);


    const dispatch = useDispatch();
    const history = useHistory();
    const [searchText, setSearchText] = useState("");
    // const [isSearchActive, setIsSearchActive] = useState(false);

    async function handleSearch(e) {
        const query = e.target.value;
        await setSearchText(query);
        // setIsSearchActive(query.length>0);
    }

    function handleSearchSubmit(e) {
        e.preventDefault();
        if (searchText.length > 0) {
            dispatch(fetchSearchResults(searchText));
            history.push(`/search?pins=${searchText}`);
        }
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            handleSearchSubmit(e);
        }
    }

    return (
        <>
        <div className="search-bar-container">
            <div className="search-bar-body">
                <div className="search-icon-holder">
                    <i className="fas fa-search"></i>
                </div>
                <input className="search-input" onChange={handleSearch} onKeyDown={handleKeyDown} type="text" placeholder="Search"></input>
            </div>
        </div>
        </>
    )
}

export default SearchBar;
