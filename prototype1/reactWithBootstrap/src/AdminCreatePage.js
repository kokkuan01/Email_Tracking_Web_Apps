import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class AdminCreatePage extends Component{
  constructor(props){
    super(props);
    this.state={
        name:'',
        username:'',
        password:'',
        type:'Volunteer'
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
      this.setState({
        type:event.target.value
      });
    }
  }

  onSubmit(e){
    e.preventDefault();
    console.log(this.state.name);
    console.log(this.state.username);
    console.log(this.state.password);
    console.log(this.state.type);
  }

  render(){
    return(
      <div className="container">
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
                  <li><Link to="/">Sign Out</Link></li>
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
                <h3 className='lead no-margin'>Create New Accounts</h3>
                <form method="post" onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label>Name : </label>
                    <input type='text' name='name' className="form-control" onChange={this.handleChange}/>
                  </div>
                  <div className="form-group">
                    <label>Username : </label>
                    <input type='text' name='username' className="form-control" onChange={this.handleChange}/>
                  </div>
                  <div className="form-group">
                    <label>Password : </label>
                    <input type='password' name='password' className="form-control" onChange={this.handleChange}/>
                  </div>
                  <div style={{marginBottom:25}} className="btn-group btn-group-toggle" data-toggle="buttons">
                    <label>Type :</label>
                    <input type="radio" name="type" value="Volunteer" checked={this.state.type==='Volunteer'} onChange={this.handleChange}/>Volunteer
                    <input type="radio" name="type" value="Administrator" checked={this.state.type==='Administrator'} onChange={this.handleChange}/>Administrator
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

export default AdminCreatePage;
