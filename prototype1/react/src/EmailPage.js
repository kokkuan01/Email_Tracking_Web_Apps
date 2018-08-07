import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './EmailPage.css';
import { Accordion, AccordionItem } from 'react-sanfona';
import {emailExample} from './sample';

class EmailPage extends Component{
  constructor(props){
    super(props);

    this.onfocus = this.onfocus.bind(this);
  }

  onfocus(event){
    event.target.style.height = '120px';
  }

  render() {
    return (
      <div id="InboxPage">
        <div className="TopBar">

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
                        <div>
                          123
                        </div>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
            </div>
            <div className="ReplyBox">
              <form>
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
