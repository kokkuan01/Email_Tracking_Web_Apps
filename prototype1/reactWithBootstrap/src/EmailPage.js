import React, {Component} from 'react';
import {Link,Redirect} from 'react-router-dom';
import './EmailPage.css';
import EmailConversation from './EmailConversation';

class EmailPage extends Component{
  constructor(props){
    super(props);
    this.state={
      submit:false,
      logout:false
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
    if(this.state.logout){
      return(<Redirect to="/"/>);
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
              <Link className="brand" to="/inbox">Befrienders</Link>
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
