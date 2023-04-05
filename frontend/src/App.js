import React from "react";
import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import UserProfile from "./components/ProfilePage";

function App() {
  return (
    <>
      <Navigation />
        <Switch>
          <Route path="/users/:userId">
            <UserProfile />
          </Route>
        </Switch>
    </>
  );
}

export default App;