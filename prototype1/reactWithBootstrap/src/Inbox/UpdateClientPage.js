import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../css/EmailPage.css';
import Header from '../Common/Header';
import NavigationBar from '../Common/NavigationBar';
import { ClipLoader } from 'react-spinners';

const config = require('../config');

export default class UpdateClientPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trueClient: this.props.location.state ? this.props.location.state.clientId : -1,
      type: this.props.location.state ? this.props.location.state.type : "none",
      threadId: this.props.location.state ? this.props.location.state.threadId : -1,
      name: '',
      age: '',
      gender: 0,
      race: 0,
      nationality: 0,
      job: '',
      to: null,
      notLogin: null,
      token: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : null,
      done:false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    let url = config.settings.serverPath + "/api/getClient/" + this.state.trueClient;
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
      if (result.message !== undefined && result.message !== null) {
        if (result.message.includes("Unauthenticated")) {
          this.setState({
            notLogin: true
          });
        }
      }
      else {
        this.setState({
          notLogin: false,
          name: result.client.name,
          age: result.client.age,
          gender: result.client.gender,
          race: result.client.race,
          nationality: result.client.nationality,
          job: result.client.job,
        })
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

  handleChange(event) {
    if (event.target.name === 'name') {
      this.setState({
        name: event.target.value
      });
    }
    else if (event.target.name === 'age') {
      this.setState({
        age: event.target.value
      });
    }
    else if (event.target.name === 'gender') {
      this.setState({
        gender: event.target.value
      });
    }
    else if (event.target.name === 'race') {
      this.setState({
        race: event.target.value
      });
    }
    else if (event.target.name === 'nationality') {
      this.setState({
        nationality: event.target.value
      });
    }
    else if (event.target.name === 'job') {
      this.setState({
        job: event.target.value
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    let url = config.settings.serverPath + "/api/addClientInfo/" + this.props.location.state.clientId;
    fetch(url, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + this.state.token,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        age: this.state.age,
        gender: this.state.gender,
        race: this.state.race,
        nationality: this.state.nationality,
        job: this.state.job
      })
    }).then(response => {
      if (response.status === 200) {
        this.setState({
          to: '/inbox/' + this.props.location.state.threadId,
          done:true
        });
      }
    })
  }

  render() {
    if (this.state.to !== null) {
      if (this.state.type !== "none") {
        return (
          <Redirect to={{ pathname: this.state.to, state: { threadId: this.props.location.state.threadId, type: this.state.type } }} />
        );
      }
      else {
        return (
          <Redirect to={{ pathname: this.state.to, state: { threadId: this.props.location.state.threadId } }} />
        );
      }
    }

    if (this.state.trueClient === -1 || this.state.threadId === -1) {
      return (
        <Redirect to={{ pathname: "/inbox", state: { error: "block" } }} />
      );
    }

    if (this.state.notLogin === true) {
      return (<Redirect to={{ pathname: "/", state: { error: "block" } }} />);
    }

    if (this.state.notLogin === false) {
      return (
        <div className="container">
          <Header />
          <div className="content">
            <hr />
            <div className="row maxHeight">
              <NavigationBar />
              <div className="col-md-10 maxHeight">
                <div className="tab-content maxHeight">
                  <div className="tab-pane fade in active" id="home">
                    <h3 className='lead no-margin'>Update Client Info</h3>
                    <form method="post" onSubmit={this.onSubmit}>
                      <div className="form-group">
                        <label>Name : </label>
                        <input type='text' name='name' className="form-control" onChange={this.handleChange} value={this.state.name} required/>
                      </div>
                      <div className="form-group">
                        <label>Age : </label>
                        <input type='number' name='age' min='0' max='100' className="form-control" onChange={this.handleChange} value={this.state.age} required/>
                      </div>
                      <div className="form-group">
                        <label>Gender : </label>
                        <select className="form-control" name="gender" value={this.state.gender} onChange={this.handleChange}>
                          <option value="0">Male</option>
                          <option value="1">Female</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Race : </label>
                        <select className="form-control" name="race" value={this.state.race} onChange={this.handleChange}>
                          <option value="0">Melayu</option>
                          <option value="1">Chinese</option>
                          <option value="2">Indian</option>
                          <option value="3">Others</option>
                        </select>
                      </div>
                      <div>
                        <label>Nationality : </label>
                        <select className="form-control" name="nationality" value={this.state.nationality} onChange={this.handleChange}>
                          <option value="0">Malaysian</option>
                          <option value="1">Non-Malaysian</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Job : </label>
                        <input type='text' name='job' className="form-control" value={this.state.job} onChange={this.handleChange} required/>
                      </div>
                      <div>
                        <button type="submit" className="btn btn-primary">
                          Save and Continue
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
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
