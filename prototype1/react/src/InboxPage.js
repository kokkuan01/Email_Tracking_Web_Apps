import React,{Component} from 'react';
import './InboxPage.css';
import ReactList from 'react-list';
import {Link} from 'react-router-dom';

const unsend = [
  {
    sender:"Client1",
    title:"A package from order 05236788056761 has been shipped",
    date:"Aug 7"
  },
  {
    sender:"Client2",
    title:"Testing",
    date:"Aug 7"
  },
  {
    sender:"Client3",
    title:"Testing",
    date:"Aug 7"
  },
  {
    sender:"Client4",
    title:"Testing",
    date:"Aug 7"
  },
  {
    sender:"Client5",
    title:"Testing",
    date:"Aug 7"
  }
];

class InboxPage extends Component{
  renderUnsent(index, key){
    const url = "/inbox/" + key;

    return(
      <div className="EmailDiv" key={key}>
        <Link to={url} params={{id:1}} className="Link">
          <button className="EmailButton">
            <div className="EmailSender">{unsend[index].sender}</div>
            <div className="EmailTitle">{unsend[index].title}</div>
            <div className="EmailDate">{unsend[index].date}</div>
          </button>
        </Link>
      </div>
    );
  }

  logout(event){
    var choice = window.confirm("Are you sure to log out?");
    if(!choice){
      event.preventDefault();
    }
  }

  render() {
    return (
      <div id="InboxPage">
        <div className="TopBar">
          <Link className="Logout" to="/" onClick={this.logout}>Logout</Link>
        </div>
        <div className="Rest">
          <div className="Menu">
            <img className="Logo" src="../images/logo.png" alt="LOGO"/>
            <button className="SidebarButton">Unsent</button>
            <button className="SidebarButton">Replying</button>
            <button className="SidebarButton">Sent</button>
          </div>
          <div className="Inbox">
            <ReactList
              itemRenderer={this.renderUnsent}
              length={5}
              type='variable'
              axie='x'/>
          </div>
        </div>
      </div>
    );
  }
}

export default InboxPage;
