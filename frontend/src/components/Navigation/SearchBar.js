
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

async function handleSearch(e) {
    const query = e.target.value;
    await setSearchText(query);
}

function handleSearchSubmit(e) {
    e.preventDefault();
    if (searchText.length > 0) {
        const lowerCaseSearchText = searchText.toLowerCase();
        dispatch(fetchSearchResults(lowerCaseSearchText));
        history.push(`/search?pins=${lowerCaseSearchText}`);
        setSearchText("");
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
                <input className="search-input" 
    onChange={handleSearch} 
    onKeyDown={handleKeyDown} 
    type="text" 
    placeholder="Try searching for 'London' or 'New York'"
    value={searchText}>
</input>
            </div>
        </div>
        </>
    )
}

export default SearchBar;
