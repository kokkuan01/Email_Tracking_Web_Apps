import React, {Component} from "react";
import {Router, Route, Switch} from "react-router";

import Login from "./LoginPage";
import MainPage from "./MainPage";

class App extends Component{
  render(){
    return(
      <Router history={this.props.history}>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route path='/inbox' componet={MainPage}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
