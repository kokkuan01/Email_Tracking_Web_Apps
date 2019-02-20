import React, {Component} from 'react';

class SentEmailConversation extends Component{
  constructor(props){
    super(props);
    this.state = {
      comment:''
    };

    this.displayComment = this.displayComment.bind(this);
    this.displayTitle = this.displayTitle.bind(this);
    this.convertIntToDuration = this.convertIntToDuration.bind(this);
  }

  convertIntToDuration(num){
    var hour = Math.floor(num/3600);
    var minute = Math.floor(num/60);
    var second = num % 60;

    if(hour === 0 && minute === 0){
      return second + " seconds ";
    }
    else if(hour === 0){
      return minute + " minutes " + second + " seconds ";
    }
    else{
      return hour + " hours " + minute + " minutes " + second + " seconds ";
    }
  }

  displayTitle(item){
    return(
      <div className="header panel-sub-heading inner-all">
        <div className="row">
        <div style={{paddingLeft:30,paddingTop:10,fontSize:17}} className="col-md-8 col-sm-8 col-xs-7"> {this.displayComment(item.comment)}</div>
          <div className="pull-left col-md-4 col-sm-4 col-xs-5">
                <p className="pull-right" style={{margin:0}}>Replied By : {item.user.name}</p>
                <br/>
                <p className="pull-right"> Duration : {this.convertIntToDuration(item.duration)}</p>
          </div>
        </div>
      </div>
    );
  }

  displayComment(comment){
    if(comment !== undefined){
      return(
          <div>
            Comment: <span>{comment}</span>
          </div>
      );
    }
  }

  render(){
    let race = this.props.thread.client.race;
    if(race === 0){
      race = "Melayu";
    }
    else if(race === 1){
      race = "Chinese";
    }
    else if(race === 2){
      race = "Indian";
    }
    else{
      race = "Others";
    }

    let nat = this.props.thread.client.nationality;
    if(nat === 0){
      nat = "Malaysian";
    }
    else{
      nat = "Non-Malaysian";
    }

    let replies = null;
    if(this.props.thread.replies.length === 0){
      replies = <div style={{padding:10,backgroundColor:"#f6f6f6"}}>No Comment Yet</div>;
    }
    else{
      replies = this.props.thread.replies.map((item,index)=>{
        return(this.displayTitle(item));
     });
    }

    return(
      <div className="col-md-9">
       <form className="form-horizontal">
           <div className="panel mail-wrapper rounded shadow">
               <div style={{marginBottom:0}} className="panel-sub-heading inner ">
                   <div><h3>Client Information:</h3></div>
                   <div className="ClientInfo">
                    {"Name : " + this.props.thread.client.name + "         Age : " + this.props.thread.client.age + "         Race : " + race}
                   </div>
                   <br/>
                   <div className="ClientInfo">
                    {"Nationality : " + nat + "         Job : " + this.props.thread.client.job}
                   </div>
               </div>
               <div style={{marginBottom:40}} className="panel-sub-heading inner ">
                   <div className="pull-left">
                       <h3 style={{margin:10,marginLeft:0}} className="lead no-margin"> Subject : {this.props.thread.subject}</h3>
                   </div>
               </div>
               <hr className="darkLine" style={{margin:0}}/>
               <div style={{minHeight:50,backgroundColor:"#f7f7f7"}}>
                {replies}
               </div>
           </div>
       </form>
   </div>
    );
  }
}

export default SentEmailConversation;
