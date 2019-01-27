import React, {Component} from 'react';
import {emailExample} from '../previousWork/sample';

export default class AdminEmailConversation extends Component{
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
            <br/><i>
            Comment: <span>{comment}</span></i>
          </div>
      );
    }
  }

  render(){
    return(
      <div className="col-md-9">
       <form className="form-horizontal">
           <div className="panel mail-wrapper rounded shadow">
               <div style={{marginBottom:0}} className="panel-sub-heading inner ">
                   <div className="pull-left">
                       <h3 style={{margin:10}} className="lead no-margin">Lim Lee Tan</h3>
                   </div>
                   <br/>
                   <div>
                    {"Age : 20       Race : Chinese"}
                   </div>
               </div>
               <div style={{marginBottom:40}} className="panel-sub-heading inner ">
                   <div className="pull-left">
                       <h3 style={{margin:10}} className="lead no-margin">I Have A Problem!</h3>
                   </div>
               </div>
               <hr className="darkLine" style={{margin:0}}/>
                {emailExample.map((item,index)=>{
                  return(
                    this.displayTitle(item)
                  );
                })}
               <div className="panel-footer">
                <div className="form-group">
                  <div>
                    <h1 style={{margin:10}} className="lead no-margin text-primary">Email Report</h1>
                  </div>
                  <div>
                    <span> Number Of Replier : 1 </span>
                    <hr/>
                    <span> Replier Who Replied The Most : Chan Kok Kuan </span>
                    <hr/>
                  </div>
                </div>
                 <div className="clearfix"></div>
               </div>
           </div>
       </form>
   </div>
    );
  }
}