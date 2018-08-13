import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './EmailPage.css';
import EmailConversation from './EmailConversation';

class EmailPage extends Component{
  constructor(props){
    super(props);
    this.state={
      submit:false
    };

    this.logout = this.logout.bind(this);
  }

  logout(event){
    var choice = window.confirm("Are you sure to log out?");
    if(!choice){
      event.preventDefault();
    }
  }

  render() {
  let inbox = this.props.location.state.inbox;
    return (
      <div className="container">
        <div className="navbar navbar-fixed-top">
          <div className="navbar-inner">
            <div className="container-fluid">
              <Link className="brand" to="/inbox">Befrienders</Link>
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
                  <li className={inbox==="unsend"||inbox===null?"active":''}><Link to={{pathname:"/inbox",search:"?inbox=unsend"}} onClick={this.onClick}>Inbox</Link></li>
                  <li><Link to={{pathname:"/inbox",search:"?inbox=replying"}} onClick={this.onClick}>Replying</Link></li>
                  <li className={inbox==="sent"?"active":''}><Link to={{pathname:"/inbox",search:"?inbox=sent"}} onClick={this.onClick}>Sent</Link></li>
              </ul>
            </div>
            <EmailConversation inbox={inbox}/>
          </div>
        </div>
      </div>
    );

  }
}

export default EmailPage;
