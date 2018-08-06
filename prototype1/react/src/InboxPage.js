import React,{Component} from 'react';
import './InboxPage.css';
import ReactList from 'react-list';
import {Link} from 'react-router-dom';

class InboxPage extends Component{
  renderUnsent(index, key){
    return(
      <div
      key={key}
      >
        {index}
      </div>
    );
  }

  render() {
    return (
      <div id="InboxPage">
        <div className="TopBar">
          <Link className="Logout" to="/">Logout</Link>
        </div>
        <div className="Rest">
          <div className="Menu">
            <img className="Logo" src="images/logo.png" alt="LOGO"/>
            <button className="SidebarButton">Unsent</button>
            <button className="SidebarButton">Replying</button>
            <button className="SidebarButton">Sent</button>
          </div>
          <div className="Inbox">
            <ReactList
              itemRenderer={this.renderUnsent}
              length={1000}
              type='variable'
              axie='x'/>
          </div>
        </div>
      </div>
    );
  }
}

export default InboxPage;
