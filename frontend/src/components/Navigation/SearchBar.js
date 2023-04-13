import { fetchSearchResults } from '../../store/search';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';


const SearchBar = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const [searchText, setSearchText] = useState("");

    async function handleSearch(e) {
        e.preventDefault();
        const query = e.target.value;
        await setSearchText(query);
        dispatch(fetchSearchResults(query))
    }

    function handleSearchSubmit(e) {
        e.preventDefault();
        if (searchText.length > 0) {
            history.push(`/search?pins=${searchText}`);
        }
    }




    return (
        <>
            <input onChange={handleSearch} type="text" placeholder="Search..."></input>
            <button onClick={handleSearchSubmit}>Search</button>
        </>
    )
}

export default SearchBar;