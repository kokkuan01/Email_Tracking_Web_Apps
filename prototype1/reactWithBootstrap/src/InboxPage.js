import React,{Component} from 'react';
import './InboxPage.css';
import ReactList from 'react-list';
import {Link} from 'react-router-dom';
import {unsend,replying,sent} from './sample';
import EmailButton from './EmailButton';

const queryString = require('query-string');
const alert = (e)=>{
  window.alert("Cannot Click On Email That is replying");
};

class InboxPage extends Component{
  constructor(props){
    super(props);

    var parsed = queryString.parse(this.props.location.search);

    this.state={
      inbox:parsed.inbox?parsed.inbox:null,
      time:0,
      data:[]
    }

    this.renderItem = this.renderItem.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount(){
    let inbox = this.state.inbox;
    if(inbox === null || inbox==="unsend"){
      this.setState({data:unsend});
    }
    else if(inbox === "replying"){
      this.setState({data:replying});
    }
    else{
      this.setState({data:sent});
    }
  }

  componentDidUpdate(){
    if(this.state.time > 0){
      var parsed = queryString.parse(this.props.location.search);

      this.setState({
        inbox:parsed.inbox?parsed.inbox:null,
        time:0
      },this.update);
    }
  }

  update(){
    if(this.state.inbox === null || this.state.inbox==="unsend"){
      this.setState({data:unsend},this.render);
    }
    else if(this.state.inbox === "replying"){
      this.setState({data:replying},this.render);
    }
    else{
      this.setState({data:sent},this.render);
    }
  }

  logout(event){
    var choice = window.confirm("Are you sure to log out?");
    if(!choice){
      event.preventDefault();
    }
  }

  onClick(e){
    this.setState({
      time:1
    });
  }

  renderItem(index, key){
    return(
      <EmailButton key={key} id={index}
      inbox={this.state.inbox}
       name={this.state.data[index].sender}
       title={this.state.data[index].title}
       firstLine={this.state.data[index].firstLine}
       time={this.state.data[index].date}
      />
    );
  }

  render() {
    return (
      <div className="container">
        <div className="navbar navbar-fixed-top">
          <div className="navbar-inner">
            <div className="container-fluid">
              <Link className="brand" to="/inbox">Befrienders</Link>
              <div className="btn-group pull-right">
                <a className="btn dropdown-toggle" data-toggle="dropdown" href="#">
                  <i className="icon-user"></i> Chan Kok Kuan
                  <span className="caret"></span>
                </a>
                <ul className="dropdown-menu">
                  <li><Link to="/">Sign Out</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="row">
              <div className="col-sm-9 col-md-10">
                  <button type="button" className="btn btn-default" data-toggle="tooltip" title="Refresh">
                    <span className="glyphicon glyphicon-refresh"></span> 
                  </button>
                  <div className="pull-right">
                    <span className="text-muted"><b>1</b>–<b>5</b> of <b>5</b></span>
                    <div className="btn-group btn-group-sm">
                        <button type="button" className="btn btn-default">
                            <span className="glyphicon glyphicon-chevron-left"></span>
                        </button>
                        <button type="button" className="btn btn-default">
                            <span className="glyphicon glyphicon-chevron-right"></span>
                        </button>
                    </div>
                  </div>
              </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-3 col-md-2">
                <ul className="nav nav-pills nav-stacked">
                    <li className={this.state.inbox==="unsend"||this.state.inbox===null?"active":''}><Link to={{pathname:"/inbox",search:"?inbox=unsend"}} onClick={this.onClick}>Inbox</Link></li>
                    <li className={this.state.inbox==="replying"?"active":''}><Link to={{pathname:"/inbox",search:"?inbox=replying"}} onClick={this.onClick}>Replying</Link></li>
                    <li className={this.state.inbox==="sent"?"active":''}><Link to={{pathname:"/inbox",search:"?inbox=sent"}} onClick={this.onClick}>Sent</Link></li>
                </ul>
            </div>
            <div className="col-md-10">
              <div className="tab-content">
                <div className="tab-pane fade in active" id="home">
                  <div className="list-group" style={{overflow: 'auto',maxHeight:550}}>
                    <ReactList
                      itemRenderer={this.renderItem}
                      length={this.state.data.length}
                      type='uniform'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{display:'none'}} id = "alert" className="navbar-fixed-top alert alert-danger">
          <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
          <strong>Cannot Open Email That Is Being Replied</strong>
        </div>
      </div>
    );
  }
}

export default InboxPage;
