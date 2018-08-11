import React, {Component} from 'react';
import {Link,Redirect,Route,Switch} from 'react-router-dom';
import './EmailPage.css';
import { Accordion, AccordionItem } from 'react-sanfona';
import {emailExample} from './sample';
import AddInfoPage from './AddInfoPage.js';

class EmailPage extends Component{
  constructor(props){
    super(props);
    this.state={
      submit:false
    };
    this.logout = this.logout.bind(this);
    this.onfocus = this.onfocus.bind(this);
  }

  logout(event){
    var choice = window.confirm("Are you sure to log out?");
    if(!choice){
      event.preventDefault();
    }
  }

  onfocus(event){
    event.target.style.height = '120px';
    console.log(event.target);
  }

  render() {
    if(this.state.submit){
      return(
        <Switch>
          <Redirect from='/inbox/:id' to='/inbox/:id/addInfo'/>
          <Route path='/inbox/:id/addInfo' component={AddInfoPage}/>
        </Switch>
      );
    }

    return (
      <div className="container">
        <div className="navbar navbar-fixed-top">
          <div className="navbar-inner">
            <div className="container-fluid">
              <a className="brand" href="#">Befrienders</a>
              <div className="btn-group pull-right">
                <a className="btn dropdown-toggle" data-toggle="dropdown" href="#">
                  <i className="icon-user"></i> Chan Kok Kuan
                  <span className="caret"></span>
                </a>
                <ul className="dropdown-menu">
                  <li><Link to="/">Sign Out</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <hr />
          <div className="row">
            <div className="col-sm-3 col-md-2">
                <ul className="nav nav-pills nav-stacked">
                    <li className="active"><a href="/">Inbox</a></li>
                    <li><a href="http://www.jquery2dotnet.com">Replying</a></li>
                    <li><a href="http://www.jquery2dotnet.com">Sent</a></li>
                </ul>
            </div>
          </div>
        </div>
      </div>
    );

  }
}

export default EmailPage;
