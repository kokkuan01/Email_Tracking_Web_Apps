import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class EmailButton extends Component{
  render(){
    let to = "/inbox/" + this.props.id;

    return(
        <Link to={{pathname:to}} className="list-group-item" onClick={this.props.error!==undefined?this.props.error:''}>
            <span className="name">{this.props.item.sender}</span>
            <span>{this.props.item.title}</span>
            <span className="text-muted" style={{fontSize:11}}>- {this.props.item.firstLine}</span>
            <span className="badge">{this.props.item.date}</span>
        </Link>
    );
  }
}

export default EmailButton;
