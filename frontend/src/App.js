import React from "react";
import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import UserProfile from "./components/ProfilePage";
import EditProfile from "./components/EditProfile";
import CreatePinForm from "./components/Pins/CreatePinForm";

function App() {
  return (
    <>
      <Navigation />
        <Switch>
          <Route exact path="/users/:userId">
            <UserProfile />
          </Route>
          <Route exact path="/users/:userId/edit">
            <EditProfile />
          </Route>
          <Route exact path="/pin-builder">
            <CreatePinForm />
          </Route>
        </Switch>
    </>
  );
}

export default App;