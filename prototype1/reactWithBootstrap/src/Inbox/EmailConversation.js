import React, {Component} from 'react';
import {replying,sent,emailExample} from '../previousWork/sample';
import {Link} from 'react-router-dom';

class EmailConversation extends Component{
  constructor(props){
    super(props);
    this.state = {
      comment:''
    };

    this.displayComment = this.displayComment.bind(this);
    this.displayTitle = this.displayTitle.bind(this);
    this.displayReply = this.displayReply.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(e){
    var item = replying[0];
    replying.splice(0,1);
    item.date = "12:23pm Aug 17"
    sent.unshift(item);

    var item2 = {
      senderEmail:"kokkuan01@gmail.com",
      sender:"Chan Kok Kuan",
      receiver : "Lim Lee Tan",
      receiverEmail:"limleetan@gmail.com",
      date:"12:23pm Aug 17",
      content:this.state.content,
      comment:this.state.comment
    }
    emailExample.push(item2);
  }

  handleChange(e){
    this.setState({comment:e.target.value});
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

  displayReply(){
    return(
      <div className="panel-footer">
        <div className="form-group">
          <textarea className="form-control textarea" name="comment" rows="5" placeholder="Click Here to Comment" onChange={this.handleChange}/>
          </div>
        <div className="pull-right">
            <Link to="/inbox" className="btn btn-success btn-sm" onClick={this.handleClick}><i className="fa fa-reply"></i> Done</Link>
        </div>
        <div className="clearfix"></div>
      </div>
    );
  }

  render(){
    return(
      <div className="col-md-9">
       <form className="form-horizontal">
           <div className="panel mail-wrapper rounded shadow">
               <div style={{marginBottom:0}} className="panel-sub-heading inner ">
                   <div><h3>Client Information:</h3></div>
                   <div style={{margin:10}}>
                    {"Name : Lim Lee Tan  Age : 20       Race : Chinese"}
                   </div>
               </div>
               <div style={{marginBottom:40}} className="panel-sub-heading inner ">
                   <div className="pull-left">
                       <h3 style={{margin:10}} className="lead no-margin"> Title : I Have A Problem!</h3>
                   </div>
               </div>
               <hr className="darkLine" style={{margin:0}}/>
               {
                 emailExample.map((item,index)=>{
                   return(this.displayTitle(item));
                })}
               {this.displayReply()}
           </div>
       </form>
   </div>
    );
  }
}

export default EmailConversation;
