import { useSelector } from "react-redux";
import { fetchSearchResults } from "../../store/search";
import { useHistory, Link } from "react-router-dom";
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

  const searchResults = useSelector((state) => state.searchResults) || [];

  return (
    <>
      <div id="search-result-page">
        <div id="search-results-holder">
          {Array.isArray(searchResults) && searchResults.length === 0 ? (
            <div className="no-pins-text">No matching pins found</div>
          ) : (
            Object.keys(searchResults).length === 0 && searchResults.constructor === Object ? (
              <div className="no-pins-text">No matching pins found</div>
            ) : (
              searchResults.map((pin) => (
                <div className="search-result" key={`${pin.id}-${Date.now()}`}>
                  <Link to={`/pin/${pin.id}`}>
                    <img className="search-result-image" src={pin?.pinPhoto} />
                  </Link>
                </div>
              ))
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
