import { useSelector } from "react-redux";
import { fetchSearchResults } from "../../store/search";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import "./SearchShowPage.css";

const Search = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const query = history.location.search.split("=")[1];
    dispatch(fetchSearchResults(query));
  }, [history.location.search]);

  const searchResults = useSelector((state) => state.searchResults);

  return (
    <>
      {searchResults && searchResults.map((ele) => {
        return <div className="search-test">{ele.title}</div>;
      })}
    </>
  );
};

export default Search;
