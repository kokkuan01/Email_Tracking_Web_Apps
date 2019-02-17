import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Header from '../../Common/Header';
import NavigationBar from '../../Common/NavigationBar';

const config = require('../../config');

export default class AdminUpdatePage extends Component{
  constructor(props){
    super(props);

    let user = this.props.location.state.user;
    this.state={
      id:user.id,
      name:user.name,
      email:user.email,
      role:user.role,
      status:null,
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    if(event.target.name === 'name'){
      this.setState({
        name:event.target.value
      });
    }
    else if (event.target.name === 'email') {
      this.setState({
        email:event.target.value
      });
    }
    else if (event.target.name === 'password') {
      this.setState({
        password:event.target.value
      });
    }
    else if (event.target.name === 'role') {
      console.log(event.target.value);
      this.setState({
        role:event.target.value
      },this.render);
    }
  }

  onSubmit(e){
    e.preventDefault();
    let url = config.settings.serverPath + "/api/users/" + this.state.id;
    fetch(url,{
      method:"PUT",
      headers:{
        Accept:'application/json',
        'Content-type':'application/json'
      },
      body:JSON.stringify({
        name:this.state.name,
        role:this.state.role
      })
    }).then(response=>{
      this.setState({
        status:response.status
      });
    });
  }

  render(){
    let successMessage = "none";
    if(this.state.status !== null){
      if(this.state.status === 204){
        successMessage = "block";
      }
    }

    return(
      <div className="container">
        <Header/>
        <div className="content">
        <hr />
        <div className="row maxHeight">
          <NavigationBar type="manage"/>
          <div className="modal" id="successMessage" tabIndex="-1" role="dialog" style={{display:successMessage,overflowX:"hidden",boxShadow:"0 0 0 5000px rgba(0, 0, 0, 0.75)"}}>
              <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content">
                      <div className="modal-header">
                          <h5 className="modal-title">Success</h5>
                      </div>
                      <div className="modal-body">
                          Update Successfully
                      </div>
                      <div className="modal-footer">
                      <Link style={{color:'white',textDecoration:'none'}} to={{pathname:"/inbox/account"}}><button type="button" className="btn btn-primary">Done</button></Link>
                      </div>
                  </div>
              </div>
          </div>
          <div className="col-md-10 maxHeight">
            <div className="tab-content maxHeight">
              <div className="tab-pane fade in active" id="home">
                <h3 className='lead no-margin'>Update Accounts</h3>
                <form method="post" onSubmit={this.onSubmit}>
                   <div className="form-group">
                    <label>Email : </label>
                    <input type='text' name='email' className="form-control" value={this.state.email} onChange={this.handleChange} readOnly/>
                  </div>
                  <div className="form-group">
                    <label>Name : </label>
                    <input type='text' name='name' className="form-control" value={this.state.name} onChange={this.handleChange}/>
                  </div>
                  <div>
                    <label>Type : </label>
                    <select className="form-control" name="role" onChange={this.handleChange}>
                      <option value="1" selected={this.state.role==='1'}>Volunteer</option>
                      <option value="2" selected={this.state.role==='2'}>Administrator</option>
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
    </div>
    );
  }
}