import React, { Component } from 'react';
import {Redirect} from 'react-router';

class EmailConversation extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      comment: '',
      type: this.props.thread.problem_type!==null?this.props.thread.problem_type:1,
      priority:this.props.thread.priority!==null?this.props.thread.priority:1,
      clientId:this.props.thread.client.id,
      threadId:this.props.thread.id,
      to:null
    };

    this.displayComment = this.displayComment.bind(this);
    this.displayTitle = this.displayTitle.bind(this);
    this.displayReply = this.displayReply.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateClient = this.updateClient.bind(this);
  }

  updateClient(event){
    event.preventDefault();
    this.setState({
      to:"/inbox/updateClient/" + this.state.clientId,
    });
  }

  handleChange(event) {
    if (event.target.name === 'comment') {
      this.setState({
        comment: event.target.value
      });
    }
    else if (event.target.name === 'type') {
      this.setState({
        type: event.target.value
      });
    }
    else if (event.target.name === 'priority') {
      this.setState({
        priority: event.target.value
      });
    }
  }

  displayTitle(item) {
    return (
      <div className="header panel-sub-heading inner-all" key={item.id}>
        <div className="row">
          <div style={{ paddingLeft: 30, paddingTop: 10, fontSize: 17 }} className="col-md-8 col-sm-8 col-xs-7"> {this.displayComment(item.comment)}</div>
          <div className="pull-left col-md-4 col-sm-4 col-xs-5">
            <p className="pull-right" style={{ margin: 0 }}>Replied By : {item.user.name}</p>
            <br />
            <p className="pull-right"> Replied at : {item.created_at}</p>
          </div>
        </div>
      </div>
    );
  }

  displayComment(comment) {
    if (comment !== undefined) {
      return (
        <div>
          Comment: <span>{comment}</span>
        </div>
      );
    }
  }

  displayReply() {
    return (
      <div className="panel-footer">
        <div className="form-group">
          <textarea className="form-control textarea" name="comment" rows="5" placeholder="Enter Comment Here" onChange={this.handleChange} />
        </div>
        <div className="pull-right">
          <button className="btn btn-success btn-sm" onClick={(event) => { this.props.handleClick(event,this.state.comment,this.state.type,this.state.priority) }}><i className="fa fa-reply"></i> Done</button>
        </div>
        <div className="clearfix"></div>
      </div>
    );
  }

  render() {
    if (this.state.to !== null) {
      return (
        <Redirect to={{ pathname: this.state.to, state: { clientId: this.state.clientId, threadId: this.state.threadId, type: "unreply" } }} />
      );
    }

    let gender = this.props.thread.client.gender;
    if (gender === 0) {
      gender = "Male";
    }
    else if (gender === 1) {
      gender = "Female";
    }

    let race = this.props.thread.client.race;
    if (race === 0) {
      race = "Melayu";
    }
    else if (race === 1) {
      race = "Chinese";
    }
    else if (race === 2) {
      race = "Indian";
    }
    else {
      race = "Others";
    }

    let nat = this.props.thread.client.nationality;
    if (nat === 0) {
      nat = "Malaysian";
    }
    else {
      nat = "Non-Malaysian";
    }

    let replies = null;
    if (this.props.thread.replies.length === 0) {
      replies = <div style={{ padding: 10, backgroundColor: "#f6f6f6" }}>No Comment Yet</div>;
    }
    else {
      replies = this.props.thread.replies.map((item, index) => {
        return (this.displayTitle(item));
      });
    }

    return (
      <div className="col-md-9">
        <form className="form-horizontal">
          <div className="panel mail-wrapper rounded shadow">
            <div style={{ marginBottom: 0 }} className="panel-sub-heading inner ">
              <div>
                <h3>Client Information:</h3>
                <div className="pull-right" style={{ margin: 0 }}>
                  <span>Problem Type : </span>
                  <select className="form-control" name="type" onChange={this.handleChange} style={{width:150}} value={this.state.type} disabled>
                    <option value="1">Relationship</option>
                    <option value="2">Illness</option>
                    <option value="3">Marital</option>
                    <option value="4">Psychiatric</option>
                    <option value="5">Work</option>
                    <option value="6">Family</option>
                    <option value="7">Financial</option>
                    <option value="8">Suicide</option>
                  </select>
                  <div style={{marginTop:15,paddingLeft:43}}>
                    <span>Priority : </span>
                    <select className="form-control" name="priority" onChange={this.handleChange} style={{width:150}} value={this.state.priority} disabled>
                      <option value="1">Low</option>
                      <option value="2">Medium</option>
                      <option value="3">High</option>
                    </select>
                  </div>
                </div>
              </div>
              <table className="ClientTable">
                <tbody>
                  <tr className="ClientRow">
                    <td className="ClientLabel">Name</td><td className="ClientData">{this.props.thread.client.name}</td>
                  </tr>
                  <tr>
                    <td className="ClientLabel">Age</td><td className="ClientData">{this.props.thread.client.age}</td>
                  </tr>
                  <tr>
                    <td className="ClientLabel">Gender</td><td className="ClientData">{gender}</td>
                  </tr>
                  <tr>
                    <td className="ClientLabel">Nationality</td><td className="ClientData">{nat}</td>
                  </tr>
                  <tr>
                    <td className="ClientLabel">Race</td><td className="ClientData">{race}</td>
                  </tr>
                  <tr>
                    <td className="ClientLabel">Job</td><td className="ClientData">{this.props.thread.client.job}</td>
                  </tr>
                </tbody>
              </table>
              <button style={{marginTop:10}} className="btn btn-primary" onClick={this.updateClient}>Update Client Information</button>
            </div>
            <div style={{ marginBottom: 40 }} className="panel-sub-heading inner ">
              <div className="pull-left">
                <h3 style={{ margin: 10, marginLeft: 0 }} className="lead no-margin"> Subject : {this.props.thread.subject}</h3>
              </div>
            </div>
            <hr className="darkLine" style={{ margin: 0 }} />
            {replies}
            {this.displayReply()}
          </div>
        </form>
      </div>
    );
  }
}

export default EmailConversation;
