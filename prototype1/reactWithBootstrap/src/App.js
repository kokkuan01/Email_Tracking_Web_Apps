import React, {Component} from "react";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import LoginPage from "./LoginPage";
import InboxPage from "./InboxPage";
import EmailPage from "./EmailPage";
import AdminLoginPage from './AdminLoginPage';
import AdminInboxPage from './AdminInboxPage';
import AdminEmailPage from './AdminEmailPage';
import AdminCreatePage from './AdminCreatePage';
import AdminUpdatePage from './AdminUpdatePage';

class App extends Component{
  render(){
    return(
      <Router>
        <Switch>
          <Route exact path='/' component={LoginPage}/>
          <Route exact path='/inbox' component={InboxPage}/>
          <Route exact path='/inbox/:id' component={EmailPage}/>
          <Route exact path='/admin' component={AdminLoginPage}/>
          <Route exact path='/admin/inbox' component={AdminInboxPage}/>
          <Route exact path='/admin/inbox/:id' component={AdminEmailPage}/>
          <Route exact path='/admin/inbox/account/create' component={AdminCreatePage}/>
          <Route exact path='/admin/inbox/account/update/:id' component={AdminUpdatePage}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
