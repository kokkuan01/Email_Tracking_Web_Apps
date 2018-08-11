import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class EmailButton extends Component{
  constructor(props){
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e){
    if(this.props.inbox === 'replying'){
      e.preventDefault();
      let div = document.getElementById('alert');
      div.style.display = "block";
    }
  }

  render(){
    let to = "/inbox/" + this.props.id;
    return(
      <Link to={to} className="list-group-item" onClick={this.onClick}>
          <span className="name">{this.props.name}</span>
          <span>{this.props.title}</span>
          <span className="text-muted" style={{fontSize:11}}>- {this.props.firstLine}}</span>
          <span className="badge">{this.props.time}</span>
      </Link>
    );
  }
}

export default EmailButton;
