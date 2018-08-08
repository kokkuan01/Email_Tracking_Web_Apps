import React, {Component} from 'react';
import {Link,Redirect,Route,Switch} from 'react-router-dom';
import './EmailPage.css';
import { Accordion, AccordionItem } from 'react-sanfona';
import {emailExample} from './sample';
import AddInfoPage from './AddInfoPage.js';

class EmailPage extends Component{
  constructor(props){
    super(props);
    this.state={
      submit:false
    };
    this.logout = this.logout.bind(this);
    this.onfocus = this.onfocus.bind(this);
  }

  logout(event){
    var choice = window.confirm("Are you sure to log out?");
    if(!choice){
      event.preventDefault();
    }
  }

  onfocus(event){
    event.target.style.height = '120px';
    console.log(event.target);
  }

  render() {
    if(this.state.submit){
      return(
        <Switch>
          <Redirect from='/inbox/:id' to='/inbox/:id/addInfo'/>
          <Route path='/inbox/:id/addInfo' component={AddInfoPage}/>
        </Switch>
      );
    }

    return (
      <div id="InboxPage">
        <div className="TopBar">
          <Link className="Logout" to="/" onClick={this.logout}>Logout</Link>
        </div>
        <div className="Rest">
          <div className="Menu">
            <img className="Logo" src="../images/logo.png" alt="LOGO"/>
            <Link to={{pathname:"/inbox",search:"?inbox=unsend"}}>
              <button className="SidebarButton">Unsent</button>
            </Link>
            <Link to={{pathname:"/inbox",search:"?inbox=replying"}}>
              <button className="SidebarButton">Replying</button>
            </Link>
            <Link to={{pathname:"/inbox",search:"?inbox=sent"}}>
              <button className="SidebarButton">Sent</button>
            </Link>
          </div>
          <div className="Email">
            <div className="Title">
              <h4>A package from order 05236788056761 has been shipped</h4>
            </div>
            <div className="EmailContent">
                <Accordion  allowMultiple={true}>
                  {emailExample.map((item,index) => {
                    console.log(index);
                    let expanded;
                    let title =
                      <div className="ItemTitle">
                        <div>
                          {item.sender}
                        </div>
                        <div>
                          {item.date}
                        </div>
                      </div>


                    if(emailExample.length === (index + 1) ){
                      expanded = true;
                    }

                    return (
                      <AccordionItem key={index} title={title}
                        expanded={expanded}
                      >
                        <div className="ItemContent">
                          {item.content}
                        </div>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
            </div>
            <div className="ReplyBox">
              <form method="post" onSubmit={(event)=>{event.preventDefault();
                this.setState({submit:true});
              }}>
                <textarea className="Reply" placeholder="Reply" onFocus={this.onfocus}/>
                <br/>
                <button className="SubmitButton" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );

  }
}

export default EmailPage;
