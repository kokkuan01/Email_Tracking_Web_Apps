import React, { Component } from 'react';
import '../css/LoginPage.css';
import {Redirect} from 'react-router';

export default class LoginPage extends Component {

  constructor(props){
    super(props);

    this.state={
      username:'',
      password:'',
      isLogin:false,
      error:false
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
    if(this.state.username=="kokkuan01" && this.state.password=="123456"){
        this.setState({
            error:false,
            isLogin:true
        });
    }
    else{
        this.setState({
          error:true
        });
    }
  }

  render() {
    let errorMessage = <div></div>;

    if(this.state.error){
      errorMessage = <div className="ErrorMesage">Invalid Username Or Password</div>
    }

    if(this.state.isLogin === true){
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
              <input className="form-control form-control-lg" onChange={this.handleChange} placeholder="Username" type="text" name="username" required/>
              <br/>

              <input onChange={this.handleChange} placeholder="Password" type="password" name="password" required/>
              {errorMessage}
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