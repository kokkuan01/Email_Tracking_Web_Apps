import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class NavigationBar extends Component{
    constructor(props){
        super(props);
    
        this.state={
            isAdmin:sessionStorage.getItem('role') === '2'?true:false
        };
      }

    render(){
        if(!this.state.isAdmin){
            return(
                <div className="col-sm-2 col-md-2">
                    <ul className="nav nav-pills nav-stacked">
                        <li className={this.props.type==="unreply"||this.props.type===null?"active":''}><Link to={{pathname:"/inbox"}}>Pending For Reply</Link></li>
                        <li className={this.props.type==="replying"?"active":''}><Link to={{pathname:"/inbox/replying"}}>Replying</Link></li>
                        <li className={this.props.type==="sent"?"active":''}><Link to={{pathname:"/inbox/sent"}}>Sent</Link></li>
                    </ul>
                </div>
            );
        }
        else{
            return(
                <div className="col-sm-2 col-md-2">
                    <ul className="nav nav-pills nav-stacked">
                        <li className={this.props.type==="unreply"||this.props.type===null?"active":''}><Link to={{pathname:"/inbox"}}>Pending For Reply</Link></li>
                        <li className={this.props.type==="replying"?"active":''}><Link to={{pathname:"/inbox/replying"}}>Replying</Link></li>
                        <li className={this.props.type==="sent"?"active":''}><Link to={{pathname:"/inbox/sent"}}>Sent</Link></li>
                        <li className={this.props.type==="manage"?"active":''}><Link to={{pathname:"/inbox/account"}}>Manage Accounts</Link></li>
                        <li className={this.props.type==="report"?"active":''}><Link to={{pathname:"/inbox/report"}} name="report">View Report</Link></li>
                    </ul>
                </div>
            );
        }
    }
}