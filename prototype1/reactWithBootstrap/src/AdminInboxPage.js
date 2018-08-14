import React,{Component} from 'react';
import './InboxPage.css';
import ReactList from 'react-list';
import {Link,Redirect} from 'react-router-dom';
import {unsend,replying,sent,account} from './sample';
import AdminEmailButton from './AdminEmailButton';
import AdminChart from './AdminChart';

const queryString = require('query-string');

class AdminInboxPage extends Component{
  constructor(props){
    super(props);

    var parsed = queryString.parse(this.props.location.search);

    this.state={
      type:parsed.type?parsed.type:null,
      time:0,
      data:[],
      delete:-1,
      logout:false,
      update:-1,
    }

    this.renderItem = this.renderItem.bind(this);
    this.onClick = this.onClick.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.renderTableItem = this.renderTableItem.bind(this);
    this.renderTable = this.renderTable.bind(this);
  }

  componentDidMount(){
    let type = this.state.type;
    if(type === null || type==="unsend"){
      this.setState({data:unsend});
    }
    else if(type === "replying"){
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
        type:parsed.type?parsed.type:null,
        time:0
      },this.update);
    }
  }

  deleteItem(index){
    account.splice(this.state.delete,1);
    this.setState({delete:-1});
  }

  update(){
    if(this.state.type === null || this.state.type==="unsend"){
      this.setState({data:unsend},this.render);
    }
    else if(this.state.type === "replying"){
      this.setState({data:replying},this.render);
    }
    else{
      this.setState({data:sent},this.render);
    }
  }

  onClick(e){
    this.setState({
      time:1
    });
  }

  displayPageButton(){
    let type = this.state.type;
    if(type === null || type === 'unsend' || type ==='sent' || type==='replying'){
      return(
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
      );
    }
  }

  displayContent(){
    let type = this.state.type;
    if(type === null || type === 'unsend' || type ==='sent' || type==='replying'){
      return(
        <div className="list-group" style={{overflow: 'auto',maxHeight:550}}>
          <ReactList
            itemRenderer={this.renderItem}
            length={this.state.data.length}
            type='uniform'
          />
        </div>
      );
    }
    else if(type==='manage'){
      return(
        <ReactList
          itemsRenderer={(items,ref)=>this.renderTable(items,ref)}
          itemRenderer={this.renderTableItem}
          length={account.length}
          type='uniform'
        />
      );
    }
    else if(type==='report'){

      return(
        <AdminChart/>
      );
    }
  }

  renderTable(items,ref){
    return(
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h3>
                Account Management
            </h3>
            <Link to="/admin/inbox/account/create" className="btn btn-success">
              Create New Account
            </Link>
            <table className="table table-hover">
              <caption>List of users</caption>
              <thead className="thead-light">
                <tr>
                  <th>
                    #
                  </th>
                  <th>
                    Creation Date
                  </th>
                  <th>
                    Name
                  </th>
                  <th>
                    Username
                  </th>
                  <th>
                    Type of User
                  </th>
                  <th>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody ref={ref}>
                {items}
              </tbody>
            </table>
            <div className="row">

            </div>
          </div>
        </div>
      </div>
    );
  }

  renderTableItem(index,key){
    return(
      <tr key={key}>
        <td>
          {index+1}
        </td>
        <td>
          {account[index].date}
        </td>
        <td>
          {account[index].name}
        </td>
        <td>
          {account[index].username}
        </td>
        <td>
          {account[index].type}
        </td>
        <td>
          <button style={{marginRight:7}} className="btn" onClick={()=>this.setState({update:index})}>
            Update
          </button>
          <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#deleteModal" onClick={()=>{this.setState({delete:index})}}>
            Delete
          </button>
        </td>
      </tr>
    );
  }

  renderItem(index, key){
    return(
      <AdminEmailButton key={key} id={index}
      type={this.state.type}
       name={this.state.data[index].sender}
       title={this.state.data[index].title}
       firstLine={this.state.data[index].firstLine}
       time={this.state.data[index].date}
      />
    );
  }

  render() {
    if(this.state.logout){
      return(<Redirect to="/admin"/>);
    }

    if(this.state.update != -1){
      let link = "/admin/inbox/account/update/" + this.state.update;
      return(<Redirect to={{pathname:link,state:{index:this.state.update}}}/>);
    }

    return (
      <div className="container">
      <div className="modal fade" id="logout" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Logout</h5>
            </div>
            <div className="modal-body">
              Do You Sure To Logout?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={()=>{this.setState({logout:true})}}>Logout</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Delete Confirmation</h5>
            </div>
            <div className="modal-body">
              Do You Sure To Delete?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.deleteItem}>Delete</button>
            </div>
          </div>
        </div>
      </div>
        <div className="navbar navbar-fixed-top">
          <div className="navbar-inner">
            <div className="container-fluid">
              <Link className="brand" to="/admin/inbox">Befrienders</Link>
              <div className="btn-group pull-right">
                <a className="btn dropdown-toggle" data-toggle="dropdown" href="#">
                  <i className="icon-user"></i> Chan Kok Kuan
                  <span className="caret"></span>
                </a>
                <ul className="dropdown-menu">
                  <li><a href="#" data-toggle="modal" data-target="#logout">Sign Out</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          {this.displayPageButton()}
          <hr />
          <div className="row maxHeight">
            <div className="col-sm-3 col-md-2">
                <ul className="nav nav-pills nav-stacked">
                    <li className={this.state.type==="unsend"||this.state.type===null?"active":''}><Link to={{pathname:"/admin/inbox",search:"?type=unsend"}} onClick={this.onClick}>Inbox</Link></li>
                    <li className={this.state.type==="replying"?"active":''}><Link to={{pathname:"/admin/inbox",search:"?type=replying"}} onClick={this.onClick}>Replying</Link></li>
                    <li className={this.state.type==="sent"?"active":''}><Link to={{pathname:"/admin/inbox",search:"?type=sent"}} onClick={this.onClick}>Sent</Link></li>
                    <li className={this.state.type==="manage"?"active":''}><Link to={{pathname:"/admin/inbox",search:"?type=manage"}} onClick={this.onClick}>Manage Accounts</Link></li>
                    <li className={this.state.type==="report"?"active":''}><Link to={{pathname:"/admin/inbox",search:"?type=report"}} name="report" onClick={this.onClick}>View Report</Link></li>
                </ul>
            </div>
            <div className="col-md-10 maxHeight">
              <div className="tab-content maxHeight">
                <div className="tab-pane fade in active" id="home">
                  {this.displayContent()}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{display:'none'}} id = "alert" className="navbar-fixed-top alert alert-danger">
          <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
          <strong>Cannot Open Email That Is Being Replied</strong>
        </div>

      </div>
    );
  }
}

export default AdminInboxPage;
