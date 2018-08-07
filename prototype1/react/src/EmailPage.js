import React, {Component} from 'react';

class EmailPage extends Component{
  render() {
    console.log(this.props.match.params.id?this.props.match.params.id:'');
    return (
      <div id="InboxPage">
        <div className="TopBar">

        </div>
        <div className="Rest">
          <div className="Menu">
            <img className="Logo" src="../images/logo.png" alt="LOGO"/>
            <button className="SidebarButton">Unsent</button>
            <button className="SidebarButton">Replying</button>
            <button className="SidebarButton">Sent</button>
          </div>
          <div className="Email">
            <div className="Title">
              <h4>A package from order 05236788056761 has been shipped</h4>
            </div>
            <div className="EmailContent">
            </div>
            <div className="ReplyBox">
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EmailPage;
