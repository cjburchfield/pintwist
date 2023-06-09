import { useSelector } from "react-redux";
import LoggedInNavigation from "./LoggedInNavigation";
import LoggedOutNavigation from "./LoggedOutNavigation";
import './LoggedOutNavigation.css';
import './LoggedInNavigation.css';

const Navigation = () => {
  const sessionUser = useSelector(state => state.session.user); 

  return (
    <div className="nav">
      {sessionUser && <LoggedInNavigation />}
      {!sessionUser && <LoggedOutNavigation />}
    </div>
  );
}; 

export default Navigation;

// import { useSelector } from "react-redux";
// import LoggedInNavigation from "./LoggedInNavigation";
// import LoggedOutNavigation from "./LoggedOutNavigation";
// import './LoggedOutNavigation.css';
// import './LoggedInNavigation.css';

// const Navigation = () => {
//   const sessionUser = useSelector(state => state.session.user); 

//   let navigationComponent;
//   if (sessionUser) {
//     navigationComponent = <LoggedInNavigation />;
//   } else {
//     navigationComponent = <LoggedOutNavigation />;
//   }

//   return (
//     <div className="nav">
//       {navigationComponent}
//     </div>
//   );
// }; 

// export default Navigation;
