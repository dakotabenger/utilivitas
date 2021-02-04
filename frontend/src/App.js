import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import Profile from './components/Profile'
import RecommendationPage from './components/RecommendationPage'
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  

  return (
    <>

      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
          <DndProvider backend={HTML5Backend}>
            <SignupFormPage />
            </DndProvider>
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route exact path="/">
            <RecommendationPage />
          </Route>
        </Switch>
      )}

    </>
  );
}

export default App;
