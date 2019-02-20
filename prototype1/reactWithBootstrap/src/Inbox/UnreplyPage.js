import React,{Component} from 'react';
import '../css/InboxPage.css';
import {Redirect} from 'react-router-dom';
import EmailButton from './EmailButton';
import Header from '../Common/Header';
import NavigationBar from '../Common/NavigationBar';

const config = require('../config');

export default class UnreplyPage extends Component{
  constructor(props){
    super(props);

    this.state={
      data:null,
      to:null,
      clientId:-1,
      threadId:-1,
      notLogin:null,
      token:sessionStorage.getItem('token')?sessionStorage.getItem('token'): null,
      error:this.props.location.state?this.props.location.state.error:"none",
      isAdmin:sessionStorage.getItem('role') === '2'?true:false
    }
    
    this.redirect = this.redirect.bind(this);
  }

  componentWillMount(){
    let url = config.settings.serverPath + "/api/inbox?type=unreply";
    fetch(url,{
      method:'GET',
      headers:{
        Accept: 'application/json',
        'Authorization': 'Bearer ' + this.state.token,
      }
    })
    .then(response=>{
      return response.json();
    })
    .then(result=>{
      if(result.message !== undefined && result.message !== null){
        if(result.message.includes("Unauthenticated")){
          this.setState({
            notLogin:true
          });
        }
      }
      else{
        this.setState({
          data:result.items,
          notLogin:false
        });
      }
    });
  }

  redirect(id){
    if(!this.state.isAdmin){
      let url = config.settings.serverPath + "/api/checkClient/" + id;
      fetch(url,{
        method:'GET',
        headers:{
          Accept: 'application/json',
          'Authorization': 'Bearer ' + this.state.token,
        }
      })
      .then(response=>{
        return response.json();
      })
      .then(result=>{
        if(result.fill === "required"){
          this.setState({
            to:"/inbox/createclient/" + result.id,
            threadId:id,
            clientId:result.id
          });
        }
        else{
          this.setState({
            to:"/inbox/" + id,
            threadId:id
          });
        }
      });
    }
    else{
      this.setState({
        to:"/inbox/" + id,
        threadId:id
      });
    }
  }

  render() {
    let EmailButtons = <div></div>

    if(this.state.data !== null){
      EmailButtons = this.state.data.map((item,index)=>{
        return(<EmailButton item={item} type="unreply" redirect={this.redirect}/>);
      })
    }

    if(this.state.to !== null){
      return(
        <Redirect to={{pathname:this.state.to,state:{clientId:this.state.clientId,threadId:this.state.threadId}}}/>
      );
    }

    if(this.state.notLogin === true){
      return(<Redirect to={{pathname:"/" ,state:{error:"block"}}}/>);
    }

    if(this.state.notLogin === false){
      return (
        <div className="container">
          <Header/>
          <div className="content">
          <div className="row">
              <div style={{marginLeft:200}}>
                  <span style={{fontSize:17}}>Search : </span>
                  <input style={{width:400,paddingTop:15,margin:0}} type='text' name='age' className="form-control" onChange={this.handleChange}/>
                  <button style={{marginLeft:5}} className="btn btn-primary btn-sm"><i className="fa fa-reply"></i> Search</button>
              </div>
            </div>
            <hr />
            <div className="row">
              <NavigationBar type="unreply"/>
              <div className="col-md-10">
                <div className="tab-content">
                  <div className="tab-pane fade in active" id="home">
                    <div className="list-group" style={{overflow: 'auto',maxHeight:550}}>
                        {EmailButtons}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{display:this.state.error}} id = "alert" className="navbar-fixed-top alert alert-danger">
            <button className="close" onClick={()=>document.getElementById('alert').style.display="none"}>&times;</button>
            <strong>Please lock email by clicking email below</strong>
          </div>
        </div>
      );
    }
    else{
      return(<div></div>);
    }
  }
}
