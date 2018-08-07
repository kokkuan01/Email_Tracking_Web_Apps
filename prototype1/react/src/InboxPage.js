import React,{Component} from 'react';
import './InboxPage.css';
import ReactList from 'react-list';
import {Link} from 'react-router-dom';
import {unsend,replying,sent} from './sample';

const queryString = require('query-string');
const alert = (e)=>{
  window.alert("Cannot Click On Email That is replying");
};

class InboxPage extends Component{
  constructor(props){
    super(props);

    var parsed = queryString.parse(this.props.location.search);

    this.state={
      inbox:parsed.inbox?parsed.inbox:null,
      time:0
    }

    this.renderInbox = this.renderInbox.bind(this);
    this.onClick = this.onClick.bind(this);
    this.replay = this.replay.bind(this);
  }

  renderInbox(index, key){
    const url = "/inbox/" + key;

    if(this.state.inbox==='unsend' || this.state.inbox === null){
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
    else if(this.state.inbox === 'replying'){
      return(
        <div className="EmailDiv" key={key}>
          <button className="EmailButton" onClick={alert}>
            <div className="EmailSender">{replying[index].sender}</div>
            <div className="EmailTitle">{replying[index].title}</div>
            <div className="EmailDate">{replying[index].date}</div>
            <div className="ReplyBy">{replying[index].by}</div>
          </button>
        </div>
      );
    }
    else{
      return(
        <div className="EmailDiv" key={key}>
          <Link to={url} params={{id:1}} className="Link">
            <button className="EmailButton">
              <div className="EmailSender">{sent[index].sender}</div>
              <div className="EmailTitle">{sent[index].title}</div>
              <div className="EmailDate">{sent[index].date}</div>
            </button>
          </Link>
        </div>
      );
    }
  }

  logout(event){
    var choice = window.confirm("Are you sure to log out?");
    if(!choice){
      event.preventDefault();
    }
  }

  onClick(e){
    this.setState({
      time:1
    });
  }

  replay(){
    var parsed = queryString.parse(this.props.location.search);
    this.setState({
      inbox:parsed.inbox?parsed.inbox:null,
      time:0
    });
  }

  componentDidUpdate(){
    if(this.state.time > 0)
      this.replay();
  }

  render() {
    let MenuReplier = <div></div>
    if(this.state.inbox === 'replying')
      MenuReplier =  <div className="MenuReplier">Replying By</div>

    return (
      <div id="InboxPage">
        <div className="TopBar">
          <Link className="Logout" to="/" onClick={this.logout}>Logout</Link>
        </div>
        <div className="Rest">
          <div className="Menu">
            <img className="Logo" src="../images/logo.png" alt="LOGO"/>
            <Link to={{pathname:"/inbox",search:"?inbox=unsend"}} onClick={this.onClick}>
              <button className="SidebarButton">Unsent</button>
            </Link>
            <Link to={{pathname:"/inbox",search:"?inbox=replying"}} onClick={this.onClick}>
              <button className="SidebarButton">Replying</button>
            </Link>
            <Link to={{pathname:"/inbox",search:"?inbox=sent"}} onClick={this.onClick}>
              <button className="SidebarButton">Sent</button>
            </Link>
          </div>
          <div className="Inbox">
            <div className="EmailMenu">
              <div className="MenuSender">Sender</div>
              <div className="MenuTitle">Email Title</div>
              <div className="MenuDate">Date</div>
              {MenuReplier}
            </div>
            <ReactList
              itemRenderer={this.renderInbox}
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
