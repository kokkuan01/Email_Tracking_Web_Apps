import React, { Component } from 'react';

class EmailButton extends Component {
  render() {
    let date = <span></span>;
    if (this.props.type !== 'sent') {
      date = <span className="badge">{this.props.item.date}</span>;
    }

    return (
      <button className="list-group-item" onClick={this.props.error !== undefined ? this.props.error : () => { this.props.redirect(this.props.item.id) }}>
        <span className="name">{this.props.item.client.displayName ? this.props.item.client.displayName : this.props.item.client.email}</span>
        <span>{this.props.item.subject}</span>
        {date}
      </button>
    );
  }
}

export default EmailButton;
