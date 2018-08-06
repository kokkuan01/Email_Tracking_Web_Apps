import React, {Component} from "react";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import LoginPage from "./LoginPage";
import InboxPage from "./InboxPage";

class App extends Component{
  render(){
    return(
      <Router>
        <Switch>
          <Route exact path='/' component={LoginPage}/>
          <Route path='/inbox' component={InboxPage}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
