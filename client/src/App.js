// Import react to allow us to use react components
import React from "react";
// Router acts as a wrapper for our project, 
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Import the commonents we made to design the page
import Home from "./pages/Home";
import Saved from "./pages/Saved";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";


// Create our app function that will return our html like JSK to
// Display our front end
function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Set out routes for home and saved, that will load the home/saved component */}
          <Route exact path="/" component={Home} />
          <Route exact path="/saved" component={Saved} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
