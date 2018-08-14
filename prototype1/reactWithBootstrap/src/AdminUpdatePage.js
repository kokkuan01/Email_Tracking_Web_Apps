import React, {Component} from 'react';
import {Link,Redirect} from 'react-router-dom';
import {account} from './sample';

class AdminUpdatePage extends Component{
  constructor(props){
    super(props);
    let index = this.props.location.state.index;
    this.state={
        index:this.props.location.state.index,
        name:account[index].name,
        username:account[index].username,
        password:'123456',
        type:account[index].type,
        redirect:false,
        logout:false
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    console.log(event.target.name);
    if(event.target.name === 'name'){
      this.setState({
        name:event.target.value
      });
    }
    else if (event.target.name === 'username') {
      this.setState({
        username:event.target.value
      });
    }
    else if (event.target.name === 'password') {
      this.setState({
        password:event.target.value
      });
    }
    else if (event.target.name === 'type') {
      console.log(event.target.value);
      this.setState({
        type:event.target.value
      },this.render);
    }
  }

  onSubmit(e){
    e.preventDefault();
    this.setState({redirect:true});
    let obj = {
      date:account[this.state.index].date,
      name:this.state.name,
      username:this.state.username,
      type:this.state.type
    };
    account[this.state.index] = obj;
  }

  render(){
    if(this.state.redirect){
      return(
        <Redirect to={{pathname:"/admin/inbox",search:"?type=manage"}}/>
      );
    }

    if(this.state.logout){
      return(<Redirect to="/admin"/>);
    }

    return(
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
        <hr />
        <div className="row maxHeight">
          <div className="col-sm-3 col-md-2">
              <ul className="nav nav-pills nav-stacked">
                  <li><Link to={{pathname:"/admin/inbox",search:"?type=unsend"}} onClick={this.onClick}>Inbox</Link></li>
                  <li><Link to={{pathname:"/admin/inbox",search:"?type=replying"}} onClick={this.onClick}>Replying</Link></li>
                  <li><Link to={{pathname:"/admin/inbox",search:"?type=sent"}} onClick={this.onClick}>Sent</Link></li>
                  <li className="active"><Link to={{pathname:"/admin/inbox",search:"?type=manage"}} onClick={this.onClick}>Manage Accounts</Link></li>
                  <li><Link to={{pathname:"/admin/inbox",search:"?type=report"}} onClick={this.onClick}>View Report</Link></li>
              </ul>
          </div>
          <div className="col-md-10 maxHeight">
            <div className="tab-content maxHeight">
              <div className="tab-pane fade in active" id="home">
                <h3 className='lead no-margin'>Update Accounts</h3>
                <form method="post" onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label>Name : </label>
                    <input type='text' name='name' className="form-control" value={this.state.name} onChange={this.handleChange}/>
                  </div>
                  <div className="form-group">
                    <label>Username : </label>
                    <input type='text' name='username' className="form-control" value={this.state.username} onChange={this.handleChange}/>
                  </div>
                  <div className="form-group">
                    <label>Password : </label>
                    <input type='password' name='password' className="form-control" value={this.state.password} onChange={this.handleChange}/>
                  </div>
                  <div>
                    <label>Type : </label>
                    <select className="form-control" name="type" onChange={this.handleChange}>
                      <option value="Volunteer" selected={this.state.type==='Volunteer'}>Volunteer</option>
                      <option value="Administrator" selected={this.state.type==='Administrator'}>Administrator</option>
                    </select>
                  </div>
                  <br/>
                  <div>
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                  </div>
                </form>
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

export default AdminUpdatePage;
