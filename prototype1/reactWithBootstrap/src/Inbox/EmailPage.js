import React, {Component} from 'react';
import {Link,Redirect} from 'react-router-dom';
import '../css/EmailPage.css';
import EmailConversation from './EmailConversation';
import AdminEmailConversation from '../Admin/AdminEmailConversation'
import Header from '../Common/Header';
import NavigationBar from '../Common/NavigationBar';

export default class EmailPage extends Component{
  constructor(props){
    super(props);
    this.state={
      submit:false,
      logout:false
    };

    this.logout = this.logout.bind(this);
  }

  logout(event){
    this.setState({logout:true});
  }

  render() {
    let isAdmin = true;

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
