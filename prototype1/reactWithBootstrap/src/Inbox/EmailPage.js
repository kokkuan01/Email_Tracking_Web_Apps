import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../css/EmailPage.css';
import EmailConversation from './EmailConversation';
import AdminEmailConversation from '../Admin/AdminEmailConversation'
import Header from '../Common/Header';
import NavigationBar from '../Common/NavigationBar';
import SentEmailConversation from './SentEmailConversation';
import { ClipLoader } from 'react-spinners';

const config = require('../config');

export default class EmailPage extends Component {
  constructor(props) {
    super(props);
    let time = (new Date()).getTime();
    this.state = {
      submit: false,
      threadId: this.props.location.state ? this.props.location.state.threadId : -1,
      notLogin: null,
      token: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : null,
      thread: null,
      isReplying: false,
      wrongId: false,
      startTime: time,
      status: 0,
      redirect: null,
      done: false,
      type: this.props.location.state ? this.props.location.state.type : "unreply",
      isAdmin: sessionStorage.getItem('role') === '2' ? true : false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    let url = config.settings.serverPath + "/api/getThread/" + this.state.threadId;
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + this.state.token,
      }
    })
      .then(response => {
        if (response.status === 404) {
          this.setState({
            wrongId: true
          });
        }
        return response.json();
      })
      .then(result => {
        if (result.message !== undefined && result.message !== null) {
          if (result.message.includes("Unauthenticated")) {
            this.setState({
              notLogin: true
            });
          }
        }
        else {
          if (result.status === 1) {
            this.setState({
              isReplying: true
            });
          }
          else {
            this.setState({
              status: result.status,
              thread: result.threadDetail,
              notLogin: false
            });
          }
        }
      })
  }

  handleClick(event,comment,type,priority) {
    event.preventDefault();
    let current = (new Date()).getTime();
    let duration = (current - this.state.startTime) / 1000;
    let url = config.settings.serverPath + "/api/addComment";
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + this.state.token,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        'threadId': this.state.threadId,
        'comment': comment,
        'type':type,
        'priority':priority,
        'duration': duration,
        'userId': sessionStorage.getItem('id'),
      })
    }).then(response => {
      if (response.status === 200) {
        this.setState({
          redirect: '/inbox/sent',
          done: true
        });
      }
    })
  }

  componentWillUnmount() {
    if (this.state.done === false && this.state.type === "unreply") {

      let url = config.settings.serverPath + "/api/unlockForUnDone/" + this.state.threadId;
      fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Authorization': 'Bearer ' + this.state.token,
        }
      });
    }
  }

  render() {
    if (this.state.redirect !== null) {
      return (<Redirect to={this.state.redirect} />);
    }

    if (this.state.wrongId === true) {
      return (<Redirect to={{ pathname: "/inbox", state: { error: "id" } }} />);
    }

    if (this.state.isReplying === true) {
      return (<Redirect to={{ pathname: "/inbox", state: { error: "isReplying" } }} />);
    }

    if (this.state.notLogin === true) {
      return (<Redirect to={{ pathname: "/", state: { error: "block" } }} />);
    }

    if (this.state.notLogin === false) {
      return (
        <div className="container">
          <Header />
          <div className="content">
            <div className="row">
              <NavigationBar />
              {this.state.isAdmin ? <AdminEmailConversation thread={this.state.thread} /> : this.state.type !== "sent" ? <EmailConversation handleClick={this.handleClick} thread={this.state.thread} /> : <SentEmailConversation thread={this.state.thread} />}
            </div>
          </div>
        </div>
      );
    }
    else {
      return (<div className="loading">
        <ClipLoader
          css={{display: "block", margin: "0 auto",borderColor: "red"}}
          sizeUnit={"px"}
          size={70}
          color={'#123abc'}
        />
      </div>);
    }

  }
}
