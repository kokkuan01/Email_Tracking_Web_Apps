import React, {Component} from 'react';
import {Accordion,AccordionItem} from 'react-sanfona';
import {emailExample} from './sample';

class EmailConversation extends Component{
  constructor(props){
    super(props);
    this.displayComment = this.displayComment.bind(this);
    this.displayTitle = this.displayTitle.bind(this);
  }

  displayTitle(item){
    return(
      <div className="header panel-sub-heading inner-all">
        <div className="row">
          <div style={{paddingLeft:30}} className="col-md-8 col-sm-8 col-xs-7">
          <span>{item.sender} {item.senderEmail}</span>
           <br/>
             {" to "}
           <strong>{item.receiver} {item.receiverEmail}</strong>
           </div>
           <div className="pull-left col-md-4 col-sm-4 col-xs-5">
            <p className="pull-right"> {item.date}</p>
            </div>
            <br/>
            <br/>
            {this.displayComment(item.comment)}
          </div>
        </div>
    );
  }

  displayComment(comment){
    if(comment !== undefined){
      return(
          <div style={{paddingLeft:30}}>
            <br/>
            Comment: <span>{comment}</span>
          </div>
      );
    }
  }

  render(){
    return(
      <div className="col-md-9">
       <form className="form-horizontal">
           <div className="panel mail-wrapper rounded shadow">
               <div style={{marginBottom:40}} className="panel-sub-heading inner ">
                   <div className="pull-left">
                       <h3 style={{margin:10}} className="lead no-margin">Blankon Fullpack Admin Theme</h3>
                   </div>
               </div>
               <hr className="darkLine" style={{margin:0}}/>
               <Accordion allowMultiple={true}>
                {emailExample.map((item,index)=>{
                  console.log(emailExample.length);
                  var expanded = false;
                  if(emailExample.length === (index + 1) ){
                    expanded = true;
                  }
                  return(
                    <AccordionItem key={index} title={this.displayTitle(item)} expanded={expanded}>
                      <div className="panel-body darkLine">
                        <div className="view-mail">
                            <p>
                                {item.content}
                            </p>
                        </div>
                      </div>
                    </AccordionItem>
                  );
                })}
               </Accordion>
               <div className="panel-footer">
                <div className="form-group">
                  <textarea className="form-control textarea" rows="5" placeholder="Click Here to Reply"/>
                  <hr/>
                  <textarea className="form-control textarea" rows="5" placeholder="Click Here to Comment"/>
                </div>
                   <div className="pull-right">
                       <a href="#mail-compose.html" className="btn btn-success btn-sm"><i className="fa fa-reply"></i> Reply</a>
                   </div>
                   <div className="clearfix"></div>
               </div>
           </div>
       </form>
   </div>
    );
  }
}

export default EmailConversation;
