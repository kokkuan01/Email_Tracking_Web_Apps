import React, {Component} from 'react';
import {Link,Redirect} from 'react-router-dom';
import './EmailPage.css';
import AdminEmailConversation from './AdminEmailConversation';

class AdminEmailPage extends Component{
  constructor(props){
    super(props);
    this.state={
      submit:false,
      logout:false
    };
  }

  render() {
    let type = this.props.location.state.type;
    if(this.state.logout){
      return(<Redirect to="/admin"/>);
    }
    return (
      <div className="container">
        <div className="modal fade" id="logout" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Logout</h5>
              </div>
              <div className="modal-body">
                Do You Sure To Logout?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={()=>{this.setState({logout:true})}}>Logout</button>
              </div>
            </div>
          </div>
        </div>
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
                  <li><a href="#" data-toggle="modal" data-target="#logout">Sign Out</a></li>
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
