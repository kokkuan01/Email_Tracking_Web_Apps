import React, { Component } from 'react';
import '../css/InboxPage.css';
import { Redirect } from 'react-router-dom';
import EmailButton from './EmailButton';
import Header from '../Common/Header';
import NavigationBar from '../Common/NavigationBar';
import { ClipLoader } from 'react-spinners';

const config = require('../config');

export default class InboxPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      pageInfo: null,
      notLogin: null,
      token: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : null,
      search: ''
    }

    this.displayError = this.displayError.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    let url = config.settings.serverPath + "/api/inbox?type=replying";
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + this.state.token,
      }
    })
      .then(response => {
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
          this.setState({
            pageInfo: result.items,
            data: result.items.data,
            notLogin: false
          });
        }
      });
  }

  handleChange(event) {
    this.setState({
      search: event.target.value
    });
  }

  handlePage(page){
    if(page === 0){
      if(this.state.pageInfo.prev_page_url !== null){
        fetch(this.state.pageInfo.prev_page_url, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Authorization': 'Bearer ' + this.state.token
          }
        })
        .then(response => {
          return response.json();
        })
        .then(result => {
          if (result.items !== undefined && result.items !== null) {
            this.setState({
              pageInfo: result.items,
              data: result.items.data,
              notLogin: false
            });
          }
        });
      }
    }
    else if(page === 1){
      if(this.state.pageInfo.current_page !== this.state.pageInfo.last_page){
        fetch(this.state.pageInfo.next_page_url, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Authorization': 'Bearer ' + this.state.token
          }
        })
        .then(response => {
          return response.json();
        })
        .then(result => {
          if (result.items !== undefined && result.items !== null) {
            this.setState({
              pageInfo: result.items,
              data: result.items.data,
              notLogin: false
            });
          }
        });
      }
    }
  }

  handleClick(e) {
    let url = config.settings.serverPath + "/api/inbox?type=replying&search=" + this.state.search;
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + this.state.token
      }
    })
      .then(response => {
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
          this.setState({
            data: result.items.data,
            pageInfo: result.items,
            notLogin: false
          });
        }
      });
  }

  displayError(event) {
    event.preventDefault();
    document.getElementById('alert').style.display = 'block';
  }

  render() {
    let EmailButtons = <div></div>

    if (this.state.data !== null) {
      EmailButtons = this.state.data.map((item, index) => {
        return (<EmailButton key={item.id} id={index} item={item} type="replying" error={this.displayError} />);
      })
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
              <div style={{ marginLeft: 200 }}>
                <span style={{ fontSize: 17 }}>Search : </span>
                <input style={{ width: 400, paddingTop: 15, margin: 0 }} type='text' name='age' className="form-control" onChange={this.handleChange} />
                <button style={{ marginLeft: 5 }} className="btn btn-primary btn-sm" onClick={this.handleClick}><i className="fa fa-reply"></i> Search</button>
                <div className="tooltip" style={{zIndex:10}}>
                  <img src="/images/icon.png" alt="!" style={{ height: 25, width: 25 }} />
                  <span className="tooltiptext">Search Email By Subject Or Client's Email</span>
                </div>
                <div className="pull-right" style={{marginRight:25}}>
                  <span className="text-muted"><b>{this.state.pageInfo.from}</b>–<b>{this.state.pageInfo.to}</b> of <b>{this.state.pageInfo.total}</b></span>
                  <div className="btn-group btn-group-sm">
                      <button type="button" className="btn btn-default" onClick={()=>{this.handlePage(0)}}>
                          <span className="glyphicon glyphicon-chevron-left"></span>
                      </button>
                      <button type="button" className="btn btn-default" onClick={()=>{this.handlePage(1)}}>
                          <span className="glyphicon glyphicon-chevron-right"></span>
                      </button>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="row">
              <NavigationBar type="replying" />
              <div className="col-md-10">
                <h3>Replying</h3>
                <div className="tab-content">
                  <div className="tab-pane fade in active" id="home">
                    <div className="list-group" style={{ overflow: 'auto', maxHeight: 550 }}>
                    <div >
                      <div className="col-md-2" style={{backgroundColor:"white"}}><h5>Client Name</h5></div>
                      <div className="col-md-8" style={{paddingLeft:80,backgroundColor:"white"}}><h5>Subject</h5></div>
                      <div className="col-md-2" style={{paddingLeft:30,backgroundColor:"white"}}><h5>Date</h5></div>
                    </div>
                      {EmailButtons}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: 'none' }} id="alert" className="navbar-fixed-top alert alert-danger">
            <button className="close" onClick={() => document.getElementById('alert').style.display = "none"}>&times;</button>
            <strong>Cannot Open Email That Is Being Replied</strong>
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
