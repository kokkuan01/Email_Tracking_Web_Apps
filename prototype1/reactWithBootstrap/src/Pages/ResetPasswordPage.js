import React, { Component } from 'react';
import {Redirect } from 'react-router-dom';
import Header from '../Common/Header';
import NavigationBar from '../Common/NavigationBar';

const config = require('../config');

export default class ResetPasswordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notLogin: null,
      token: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : null,
      error: 0,
      success: "none"
    }

    this.onSubmit = this.onSubmit.bind(this);
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
  }

  handleChange(event) {
    if (event.target.name === 'oldPassword') {
      this.setState({
        oldPassword: event.target.value
      });
    }
    else if (event.target.name === 'newPassword') {
      this.setState({
        newPassword: event.target.value
      });
    }
    else if (event.target.name === 'reNewPassword') {
      this.setState({
        reNewPassword: event.target.value
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.state.newPassword !== this.state.reNewPassword) {
      this.setState({
        error: 1,
      });
    }
    else if (this.state.newPassword === this.state.oldPassword) {
      this.setState({
        error: 3,
      });
    }
    else {
      let url = config.settings.serverPath + '/api/resetPassword';

      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.state.token,
        },
        body: JSON.stringify({
          id: sessionStorage.getItem('id') ? sessionStorage.getItem('id') : null,
          oldPassword: this.state.oldPassword,
          newPassword: this.state.newPassword
        })
      }).then((response) => {
        if (response.status === 400) {
          this.setState({
            error: 2
          });
        }
        return response.json();
      }).then((result) => {
        if (result.message === "success") {
          this.setState({
            success: "block"
          });
        }
      });
    }
  }

  render() {
    if (this.state.notLogin === true) {
      return (<Redirect to={{ pathname: "/", state: { error: "block" } }} />);
    }

    let error = <span></span>;
    if (this.state.error === 1) {
      error = <div className="ErrorMessage" style={{ marginBottom: 0 }}>
        New and Re-entered Passwords do not match
        </div>
    }
    else if (this.state.error === 2) {
      error = <div className="ErrorMessage" style={{ marginBottom: 0 }}>
        The old password is wrong
        </div>
    }
    else if (this.state.error === 3) {
      error = <div className="ErrorMessage" style={{ marginBottom: 0 }}>
        The old and new passwords cannot be the same!!
        </div>
    }

    if (this.state.notLogin === false) {
      return (
        <div className="container">
          <Header />
          <div className="content">
            <hr />
            <div className="row maxHeight">
              <NavigationBar />
              <div className="modal" id="successMessage" tabIndex="-1" role="dialog" style={{ display: this.state.success, overflowX: "hidden", boxShadow: "0 0 0 5000px rgba(0, 0, 0, 0.75)" }}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Success</h5>
                    </div>
                    <div className="modal-body">
                      Reset Successfully
                            </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-primary" onClick={() => { window.location.reload(); }}>Ok</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-10 maxHeight">
                <div className="tab-content maxHeight">
                  <div className="tab-pane fade in active" id="home">
                    <h3 className='lead no-margin'>Reset Password</h3>
                    <form method="post" onSubmit={this.onSubmit}>
                      <div className="form-group">
                        <label>Old Password : </label>
                        <input type='password' name='oldPassword' className="form-control" onChange={this.handleChange} required />
                      </div>
                      <div className="form-group">
                        <label>New Password : </label>
                        <input type='password' name='newPassword' className="form-control" onChange={this.handleChange} minLength="6" required />
                        <div style={{ fontWeight: 600 }}>The password must be equal or longer than 6 characters</div>
                      </div>
                      <div className="form-group">
                        <label>Re-enter New Password : </label>
                        <input type='password' name='reNewPassword' className="form-control" onChange={this.handleChange} minLength="6" required />
                      </div>
                      {error}
                      <br />
                      <div>
                        <button type="submit" className="btn btn-primary">
                          Save
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
      return (<div></div>);
    }
  }
}