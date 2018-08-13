import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './EmailPage.css';
import AdminEmailConversation from './AdminEmailConversation';

class AdminEmailPage extends Component{
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
  let type = this.props.location.state.type;
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
                  <li className={type==="unsend"||type===null?"active":''}><Link to={{pathname:"/admin/inbox",search:"?type=unsend"}} onClick={this.onClick}>Inbox</Link></li>
                  <li><Link to={{pathname:"/admin/inbox",search:"?type=replying"}} onClick={this.onClick}>Replying</Link></li>
                  <li className={type==="sent"?"active":''}><Link to={{pathname:"/admin/inbox",search:"?type=sent"}} onClick={this.onClick}>Sent</Link></li>
                  <li><Link to={{pathname:"/admin/inbox",search:"?type=manage"}} onClick={this.onClick}>Manage Accounts</Link></li>
                  <li><Link to={{pathname:"/admin/inbox",search:"?type=report"}} onClick={this.onClick}>View Report</Link></li>
              </ul>
            </div>
            <AdminEmailConversation type={type}/>
          </div>
        </div>
      </div>
    );

  }
}

export default AdminEmailPage;
