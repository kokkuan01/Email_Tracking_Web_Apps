import React, {Component} from 'react';

class EmailButton extends Component{
  render(){
    console.log(this.props.item);
    return(
        <button className="list-group-item" onClick={this.props.error!==undefined?this.props.error:()=>{this.props.redirect(this.props.item.id)}}>
            <span className="name">{this.props.item.client.displayName?this.props.item.client.displayName:this.props.item.client.email}</span>
            <span>{this.props.item.subject}</span>
            <span className="text-muted" style={{fontSize:11}}>- {this.props.item.firstLine}</span>
            <span className="badge">{this.props.item.date}</span>
        </button>
    );
  }
}

export default EmailButton;
