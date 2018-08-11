import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class EmailButton extends Component{
  render(){
    let to = "/inbox/" + this.props.id;
    return(
      <Link to={to} className="list-group-item">
          <span className="name">{this.props.name}</span>
          <span>{this.props.title}</span>
          <span className="text-muted" style={{fontSize:11}}>- {this.props.firstLine}}</span>
          <span className="badge">{this.props.time}</span>
      </Link>
    );
  }
}

export default EmailButton;
