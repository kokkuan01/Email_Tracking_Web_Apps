import React, { Component } from 'react';
import './LoginPage.css';
import {Redirect} from 'react-router';

class LoginPage extends Component {

  constructor(props){
    super(props);

    this.state={
      username:'',
      password:'',
      redirect:false
    }

    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleChange(event){
    if(event.target.name === 'username'){
      this.setState({
        username:event.target.value
      });
    }
    else if (event.target.name === 'password') {
      this.setState({
        password:event.target.value
      });
    }
  }

  submit(event){
    event.preventDefault();
    this.setState({
      redirect:true
    });

  }

  render() {
    if(this.state.redirect === true){
      return(<Redirect to="/inbox"/>);
    }

    return (
      <div id="LoginPage">
        <div className="App">
          <div className="Login">
            <div className="LogoDiv">
              <img className="Logo" src="/images/logo.png" alt="Befrienders"/>
            </div>
            <form className="Form" method="post" onSubmit={this.submit}>
              <input className="Input" onChange={this.handleChange} placeholder="Username" type="text" name="username" required/>
              <br/>

              <input className="Input" onChange={this.handleChange} placeholder="Password" type="password" name="password" required/>
              <br/>

              <button className="Button" type="submit" value="Login">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
