import React, {Component} from "react";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import LoginPage from "./LoginPage";
import InboxPage from "./InboxPage";
import EmailPage from "./EmailPage";
import AddInfoPage from "./AddInfoPage";

class App extends Component{
  render(){
    return(
      <Router>
        <Switch>
          <Route exact path='/' component={LoginPage}/>
          <Route exact path='/inbox' component={InboxPage}/>
          <Route exact path='/inbox/:id' component={EmailPage}/>
          <Route path='/inbox/:id/addInfo' component={AddInfoPage}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
