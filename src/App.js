import { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import './App.css';
import LoginPage from "./components/pages/login";
import HomePage from "./components/pages/home";

function App() {
  return (
    <Router>
        <Suspense>
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/home" component={HomePage} />
            <Route exact path="/" render={() => <Redirect to='/login' />} />
            <Route render={() => <Redirect to='/login' />} />
          </Switch>
        </Suspense>
      </Router>
  );
}

export default App;
