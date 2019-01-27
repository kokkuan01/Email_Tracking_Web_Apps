import React, {Component} from 'react';
import {Link,Redirect} from 'react-router-dom';
import {account} from '../../previousWork/sample';
import Header from '../../Common/Header';
import NavigationBar from '../../Common/NavigationBar';

export default class AdminCreatePage extends Component{
  constructor(props){
    super(props);
    this.state={
        name:'',
        username:'',
        password:'',
        type:'Volunteer',
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
      date:'17/08/2018',
      name:this.state.name,
      username:this.state.username,
      type:this.state.type
    };
    account.push(obj);
  }

  render(){
    if(this.state.redirect){
      return(
        <Redirect to={{pathname:"/inbox/account"}}/>
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
                <NavigationBar type="manage"/>
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
                                <div>
                                    <label>Type : </label>
                                    <select className="form-control" name="type" onChange={this.handleChange}>
                                    <option value="Volunteer">Volunteer</option>
                                    <option value="Administrator">Administrator</option>
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
