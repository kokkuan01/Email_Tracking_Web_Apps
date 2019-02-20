import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';

export default class Header extends Component{
    constructor(props){
        super(props);
    
        this.state={
          logout:false,
        }
    
        this.logout = this.logout.bind(this);
      }

    logout(event){
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('id');
        this.setState({logout:true});
    }

    render(){
        if(this.state.logout){
            return(<Redirect to="/"/>);
        }

        let username = sessionStorage.getItem('username');
        return(
            <div>
                <div className="modal fade" id="logout" tabIndex="-1" role="dialog" aria-hidden="true">
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
                                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.logout}>Logout</button>
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
                                    <i className="icon-user"></i> {username + " "} 
                                    <span className="caret"></span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link to="/inbox/resetPassword">Reset Password</Link></li>
                                    <li><a href="#" data-toggle="modal" data-target="#logout">Sign Out</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}