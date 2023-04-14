// import { useSelector } from "react-redux";
// import { fetchSearchResults } from "../../store/search";
// import { useHistory } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";
// import "./SearchShowPage.css";

// const Search = () => {
//   const dispatch = useDispatch();
//   const history = useHistory();

//   useEffect(() => {
//     const query = history.location.search.split("=")[1];
//     dispatch(fetchSearchResults(query));
//   }, [history.location.search]);

//   const searchResults = useSelector((state) => state.searchResults);

//   return (
//     <>
//       {searchResults && searchResults.map((ele) => {
//         return <div className="search-test">{ele.title}</div>;
//       })}
//     </>
//   );
// };

// export default Search;

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

  const searchResults = useSelector((state) => state.searchResults);

  return (
    <div id="search-result-page">
        <div id="search-results-holder">
      {/* {searchResults.map((pin) =>  */}
      {Array.isArray(searchResults) && searchResults.map((pin) => 

          <div className="search-result" key={`${pin.id}-${Date.now()}`}>
            <Link to={`/pin/${pin.id}`}>
              <img 
                className="search-result-image"
                src={pin?.pinPhoto}
                // alt={pin.title}
              />
            </Link>
          </div>
      )}
    </div>
    </div>
  );
};

export default Search;

