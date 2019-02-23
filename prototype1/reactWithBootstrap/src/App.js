import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import UnreplyPage from "./Inbox/UnreplyPage";
import ReplyingPage from "./Inbox/ReplyingPage";
import SentPage from "./Inbox/SentPage";
import NewClientPage from './Inbox/NewClientPage';
import EmailPage from "./Inbox/EmailPage";
import AdminMainPage from "./Admin/AccountManage/MainPage";
import AdminCreatePage from './Admin/AccountManage/CreatePage';
import AdminUpdatePage from './Admin/AccountManage/UpdatePage';
import ChartPage from './Admin/ChartPage';
import ResetPasswordPage from './Pages/ResetPasswordPage';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={LoginPage} />
          <Route exact path='/inbox' component={UnreplyPage} />
          <Route exact path='/inbox/replying' component={ReplyingPage} />
          <Route exact path='/inbox/sent' component={SentPage} />
          <Route exact path='/inbox/account' component={AdminMainPage} />
          <Route exact path='/inbox/createclient/:id' component={NewClientPage} />
          <Route exact path='/inbox/report' component={ChartPage} />
          <Route exact path='/inbox/resetPassword' component={ResetPasswordPage} />
          <Route exact path='/inbox/:id' component={EmailPage} />
          <Route exact path='/inbox/account/create' component={AdminCreatePage} />
          <Route exact path='/inbox/account/update/:id' component={AdminUpdatePage} />
        </Switch>
      </Router>
    );
  }
}