import React, {Component} from 'react';
import {Link,Redirect} from 'react-router-dom';
import Header from '../../Common/Header';
import NavigationBar from '../../Common/NavigationBar';

const config = require('../../config');

export default class AdminCreatePage extends Component{
  constructor(props){
    super(props);
    this.state={
        name:'',
        email:'',
        password:'',
        role:'1',
        request:null,
        redirect:false,
        logout:false
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
      this.setState({
        role:event.target.value
      },this.render);
    }
  }

  onSubmit(e){
    e.preventDefault();
    let url = config.settings.serverPath + '/api/users/create'
    fetch(url,{
      method:'POST',
      headers:{
        Accept: 'application/json',          
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        email:this.state.email,
        name:this.state.name,
        password:this.state.password,
        role:this.state.role
      })
    }).then((responseRaw)=>{
      return responseRaw.json();
    }).then((response)=>{
      this.setState({
        request:response
      },this.render);
    });
  }

  render(){
    let errorMessage = <div></div>;
    let successMessage = "none";
    
    if(this.state.request!==null){
      if(this.state.request.error === 400){
        errorMessage = <div className="ErrorMessage" style={{marginBottom:0}}>The email address had been used</div>
      }
      else{
        successMessage = "block";
      }
    }

    if(this.state.logout){
      return(<Redirect to="/"/>);
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
                                Created Successfully
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
                            <h3 className='lead no-margin'>Create New Accounts</h3>
                            <form method="post" onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label>Email : </label>
                                    <input type='email' name='email' className="form-control" onChange={this.handleChange}/>
                                </div>
                                <div className="form-group">
                                    <label>Name : </label>
                                    <input type='text' name='name' className="form-control" onChange={this.handleChange}/>
                                </div>
                                <div className="form-group">
                                    <label>Password : </label>
                                    <input type='password' name='password' className="form-control" onChange={this.handleChange}/>
                                </div>
                                <div>
                                    <label>Type : </label>
                                    <select className="form-control" name="role" onChange={this.handleChange}>
                                    <option value="1">Volunteer</option>
                                    <option value="2">Administrator</option>
                                    </select>
                                </div>
                                {errorMessage}
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