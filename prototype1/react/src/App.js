import React, {Component} from "react";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import LoginPage from "./LoginPage";
import InboxPage from "./InboxPage";
import EmailPage from "./EmailPage";

class App extends Component{
  render(){
    return(
      <Router>
        <Switch>
          <Route exact path='/' component={LoginPage}/>
          <Route exact path='/inbox' component={InboxPage}/>
          <Route path='/inbox/:id' component={EmailPage}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
