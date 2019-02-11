import React, {Component} from 'react';
import {Link,Redirect} from 'react-router-dom';
import '../css/EmailPage.css';
import Header from '../Common/Header';
import NavigationBar from '../Common/NavigationBar';

export default class NewClientPage extends Component{
    constructor(props){
      super(props);
      this.state={
          name:'',
          username:'',
          password:'',
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
    }
  
    render(){
      if(this.state.redirect){
        return(
          <Redirect to={{pathname:"/inbox/" + this.props.location.state.id}}/>
        );
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
                  <NavigationBar/>
                  <div className="col-md-10 maxHeight">
                      <div className="tab-content maxHeight">
                          <div className="tab-pane fade in active" id="home">
                              <h3 className='lead no-margin'>Create New Client</h3>
                              <form method="post" onSubmit={this.onSubmit}>
                                  <div className="form-group">
                                      <label>Name : </label>
                                      <input type='text' name='name' className="form-control" onChange={this.handleChange}/>
                                  </div>
                                  <div className="form-group">
                                      <label>column 2 : </label>
                                      <input type='text' name='username' className="form-control" onChange={this.handleChange}/>
                                  </div>
                                  <div className="form-group">
                                      <label>column 3 : </label>
                                      <input type='password' name='password' className="form-control" onChange={this.handleChange}/>
                                  </div>
                                  <div>
                                      <label>column 4 : </label>
                                      <select className="form-control" name="type" onChange={this.handleChange}>
                                      <option value="Volunteer">Volunteer</option>
                                      <option value="Administrator">Administrator</option>
                                      </select>
                                  </div>
                                  <br/>
                                  <div>
                                      <button type="submit" className="btn btn-primary">
                                      Save and Continue
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
  