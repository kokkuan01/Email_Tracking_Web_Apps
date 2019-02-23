import React, { Component } from 'react';
import '../css/InboxPage.css';
import { Redirect } from 'react-router-dom';
import Header from '../Common/Header';
import NavigationBar from '../Common/NavigationBar';
import ClientChart from './ClientChart';
import EmailChart from './EmailChart';
import VolunteerTable from './VolunteerTable';

const config = require('../config');

export default class ChartPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notLogin: null,
      countOfClient: null,
      countOfEmail: null,
      countOfReplies: null,
      type:1,
      token: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : null,
      isAdmin: sessionStorage.getItem('role') === '2' ? true : false,
      month:"0"
    };

    this.changeMonth = React.createRef();
    this.onClick = this.onClick.bind(this);
    this.getNewData = this.getNewData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    let url = config.settings.serverPath + "/api/checkLogin";
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
      .then((result) => {
        if (result.message.includes("Unauthenticated")) {
          this.setState({
            notLogin: true
          });
        }
        else if (result.message.includes("Logon")) {
          this.setState({
            notLogin: false
          });
        }
      })

    url = config.settings.serverPath + '/api/getGeneralData?month=0';
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
      .then((result) => {
        if (result.CountOfEmail !== null) {
          this.setState({
            countOfClient: result.countOfClient,
            countOfEmail: result.countOfEmail,
            countOfReplies: result.countOfReplies
          });
        }
      })
  }

  getNewData(){
    let url = config.settings.serverPath + '/api/getGeneralData?month=' + this.state.month;
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
      .then((result) => {
        if (result.CountOfEmail !== null) {
          this.setState({
            countOfClient: result.countOfClient,
            countOfEmail: result.countOfEmail,
            countOfReplies: result.countOfReplies
          });
        }
      })

      if(this.state.type !== 1){
        this.changeMonth.current.getNewMonthData(this.state.month);
      }
  }

  onClick(type){
    this.setState({
      type:type
    });
  }

  handleChange(e){
    this.setState({
      month:e.target.value
    },this.getNewData);
  }

  render() {
    let month = "";
    if(this.state.month === "0"){
      month = "This Month";
    }
    else if(this.state.month === "1"){
      month = "Last Month";
    }
    else if(this.state.month === "2"){
      month = "Two Months Ago";
    }

    let statistic = <div></div>;
    if(this.state.type === 1){
      statistic = <ClientChart />;
    }
    else if(this.state.type === 2){
      statistic = <EmailChart month={this.state.month} ref={this.changeMonth}/>;
    }
    else if(this.state.type === 3){
      statistic = 
      <div className="col-md-12">
        <h3>
          Volunteer Activities
        </h3>
        <VolunteerTable month={this.state.month} ref={this.changeMonth}/>
        <div className="row"></div>
      </div>;
    }

    if (!this.state.isAdmin) {
      return (<Redirect to="/inbox" />);
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
              <NavigationBar type="report" />
              <div className="col-md-10" >

                <div className="tab-content" style={{overflowX:"hidden"}}>
                  <div>
                    <h3>Real Time Report</h3>
                  </div>
                  <div className="pull-left col-md-12 col-sm-12 col-xs-12" style={{ marginLeft: -15 }}>
                    <select className="form-control" name="race" onChange={this.handleChange} style={{ width: 250 }}>
                      <option value="0">This Month</option>
                      <option value="1">Last Month</option>
                      <option value="2">Two Months Ago</option>
                    </select>
                  </div>
                  <div className="pull-left col-md-12 col-sm-12 col-xs-12" style={{ margin:15,marginLeft: -15 }}>
                    <button className="btn btn-success" style={{marginRight:15}} onClick={()=>{this.onClick(1)}}>Client Page</button>
                    <button className="btn btn-success" style={{marginRight:15}} onClick={()=>{this.onClick(2)}}>Email Page</button>
                    <button className="btn btn-success" style={{marginRight:15}} onClick={()=>{this.onClick(3)}}>Volunteer Page</button>
                  </div>
                  <div className="tab-pane fade in active" id="home">
                    <div className="row">
                      <div style={{ marginLeft: 20 }} className="col-md-4">
                        <div className="list-group">
                          <div className="list-group-item visitor">
                            <h3 className="pull-right">
                              <i className="fa fa-eye"></i>
                            </h3>
                            <h4 className="list-group-item-heading count">
                              {this.state.countOfEmail}</h4>
                            <p className="list-group-item-text">
                              Number Of Email Received In {month}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="list-group">
                          <div className="list-group-item visitor">
                            <h3 className="pull-right">
                              <i className="fa fa-eye"></i>
                            </h3>
                            <h4 className="list-group-item-heading count">
                              {this.state.countOfClient}</h4>
                            <p className="list-group-item-text">
                              Number Of Client Sent Email In {month}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="list-group">
                          <div className="list-group-item visitor">
                            <h3 className="pull-right">
                              <i className="fa fa-eye"></i>
                            </h3>
                            <h4 className="list-group-item-heading count">
                              {this.state.countOfReplies}</h4>
                            <p className="list-group-item-text">
                              Number of Replies Sent Out</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {statistic}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    else {
      return (<div></div>);
    }
  }
}
