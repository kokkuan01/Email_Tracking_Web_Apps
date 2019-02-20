import React, {Component} from 'react';

const config = require('../config');

export default class AdminEmailConversation extends Component{
  constructor(props){
    super(props);

    this.state = {
      statistic:null,
      token:sessionStorage.getItem('token')?sessionStorage.getItem('token'): null,
      count:-1
    };

    this.displayComment = this.displayComment.bind(this);
    this.displayTitle = this.displayTitle.bind(this);
  }

  componentDidMount(){
    let url = config.settings.serverPath + '/api/getThreadStatistic/' + this.props.thread.id
    fetch(url,{
      method:'GET',
      headers:{
        Accept: 'application/json',
        'Authorization': 'Bearer ' + this.state.token,
      }
    }).then(response=>{
      return response.json();
    }).then(result=>{
      if(result.count === 0){
        this.setState({
          count:0
        });
      }
      else{
        this.setState({
          statistic:result.statistic
        });
      }
    })
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
          <div style={{paddingLeft:30,fontSize:17}} className="col-md-8 col-sm-8 col-xs-7">
            {this.displayComment(item.comment)}
          </div>
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
          <div style={{paddingLeft:30}}>
            <br/><i>
            Comment: <span>{comment}</span></i>
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

    let statistic = <div></div>;
    
    if(this.state.count === 0){
      statistic = (
        <div className="form-group" style={{margin:0}}>
          <div>
            <h1 style={{margin:10}} className="lead no-margin text-primary">No Email Report Due to No Reply Record Yet</h1>
          </div>
        </div>
      );
    }

    if(this.state.statistic !== null){
      statistic = (
        <div className="form-group">
          <div>
            <h1 style={{margin:10}} className="lead no-margin text-primary">Email Report</h1>
          </div>
          <div>
            <span> Number Of Replier : {this.state.statistic.count} </span>
            <hr/>
            <span> Replier Who Replied The Most : {this.state.statistic.most} </span>
            <hr/>
            <span> Average Duration to Reply : {this.convertIntToDuration(this.state.statistic.avgDuration)} </span>
            <hr/>
          </div>
        </div>
      );
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
            <div className="panel-footer">
              {statistic}
              <div className="clearfix"></div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}