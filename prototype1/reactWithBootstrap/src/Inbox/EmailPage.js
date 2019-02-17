import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import '../css/EmailPage.css';
import EmailConversation from './EmailConversation';
import AdminEmailConversation from '../Admin/AdminEmailConversation'
import Header from '../Common/Header';
import NavigationBar from '../Common/NavigationBar';

const config = require('../config');

export default class EmailPage extends Component{
  constructor(props){
    super(props);
    this.state={
      submit:false,
      threadId:this.props.location.state.threadId
    };
  }

  componentDidMount(){
    let url = config.settings.serverPath + "/api/checkUserType";
    fetch(url)
    .then(response=>{
      return response.json();
    })
    .then(result=>{
      console.log(result);
    })    

    url = config.settings.serverPath + "/api/getThread/" + this.state.threadId;
    fetch(url)
    .then(response=>{
      return response.json();
    })
    .then(result=>{
      console.log(result);
    })
  }

  render() {
    let isAdmin = false;

    if(this.state.logout){
      return(<Redirect to="/"/>);
    }
    
    return (
      <div className="container">
        <Header/>
        <div className="content">
          <div className="row">
            <NavigationBar/>
            {isAdmin?<AdminEmailConversation/>:<EmailConversation/>}
          </div>
        </div>
      </div>
    );

  }
}
