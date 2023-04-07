import React from "react";
import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import UserProfile from "./components/ProfilePage";
import EditProfile from "./components/EditProfile";

function App() {
  return (
    <>
      <Navigation />
        <Switch>
          <Route exact path="/users/:userId">
            <UserProfile />
          </Route>
          <Route path="/users/:userId/edit">
            {/* <h1>Testing edit profile</h1> */}
            <EditProfile />
          </Route>
        </Switch>
    </>
  );
}

export default App;