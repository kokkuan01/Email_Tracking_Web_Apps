import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import '../css/EmailPage.css';
import Header from '../Common/Header';
import NavigationBar from '../Common/NavigationBar';

const config = require('../config');

export default class NewClientPage extends Component{
    constructor(props){
      super(props);
      this.state={
          name:'',
          age:'',
          race:0,
          nationality:0,
          job:'',
          to:null
      };
  
      this.onSubmit = this.onSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(event){
      if(event.target.name === 'name'){
        this.setState({
          name:event.target.value
        });
      }
      else if (event.target.name === 'age') {
        this.setState({
          age:event.target.value
        });
      }
      else if (event.target.name === 'race') {
        this.setState({
          race:event.target.value
        });
      }
      else if (event.target.name === 'nationality') {
        this.setState({
          nationality:event.target.value
        },this.render);
      }
      else if (event.target.name === 'job') {
        this.setState({
          job:event.target.value
        },this.render);
      }
    }
  
    onSubmit(e){
      e.preventDefault();

      let url = config.settings.serverPath + "/api/addClientInfo/" + this.props.location.state.clientId;
      fetch(url,{
        method:"POST",
        headers:{
          Accept:'application/json',
          'Content-type':'application/json'
        },
        body:JSON.stringify({
          name:this.state.name,
          age:this.state.age,
          race:this.state.race,
          nationality:this.state.nationality,
          job:this.state.job
        })
      }).then(response=>{
        if(response.status === 200){
          this.setState({
            to:'/inbox/' + this.props.location.state.threadId
          });
        }
      })
    }
  
    render(){
      if(this.state.to !== null){
        return(
          <Redirect to={{pathname:this.state.to,state:{threadId:this.props.location.state.threadId}}}/>
        );
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
                                      <label>Age : </label>
                                      <input type='number' name='age' className="form-control" onChange={this.handleChange}/>
                                  </div>
                                  <div className="form-group">
                                      <label>Race : </label>
                                      <select className="form-control" name="race" onChange={this.handleChange}>
                                        <option value="0">Melayu</option>
                                        <option value="1">Chinese</option>
                                        <option value="2">Indian</option>
                                        <option value="3">Others</option>
                                      </select>
                                  </div>
                                  <div>
                                      <label>Nationality : </label>
                                      <select className="form-control" name="nationality" onChange={this.handleChange}>
                                        <option value="0">Malaysian</option>
                                        <option value="1">Non-Malaysian</option>
                                      </select>
                                  </div>
                                  <div className="form-group">
                                      <label>Job : </label>
                                      <input type='text' name='job' className="form-control" onChange={this.handleChange}/>
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
  