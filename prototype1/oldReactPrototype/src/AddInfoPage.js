import React, {Component} from "react";
import {Link} from 'react-router-dom';

class AddInfoPage extends Component{
  render(){
    return(
      <div id="InboxPage">
        <div className="TopBar">
          <Link className="Logout" to="/" onClick={this.logout}>Logout</Link>
        </div>
        <div className="Rest">
          <div className="Menu">
            <img className="Logo" src="../../images/logo.png" alt="LOGO"/>
            <button className="SidebarButton">Unsent</button>
            <button className="SidebarButton">Replying</button>
            <button className="SidebarButton">Sent</button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddInfoPage;
