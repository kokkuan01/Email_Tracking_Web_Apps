import React,{Component} from 'react';
import '../css/InboxPage.css';
import {Redirect} from 'react-router-dom';
import EmailButton from './EmailButton';
import Header from '../Common/Header';
import NavigationBar from '../Common/NavigationBar';

const config = require('../config');

export default class SentPage extends Component{
  constructor(props){
    super(props);

    this.state={
      data:null,
      logout:false,
    }

    this.logout = this.logout.bind(this);
  }

  componentDidMount(){
    let url = config.settings.serverPath + "/api/inbox?type=sent";
    fetch(url)
    .then(response=>{
      return response.json();
    })
    .then(result=>{
      this.setState({
        data:result.items
      },this.render);
    });
  }

  logout(event){
    this.setState({logout:true});
  }

  render() {
    if(this.state.logout){
      return(<Redirect to="/"/>);
    }

    let EmailButtons = <div></div>

    if(this.state.data !== null){
      EmailButtons = this.state.data.map((item,index)=>{
        return(<EmailButton id={index} item={item} type="sent"/>);
      })
    }

    return (
      <div className="container">
        <Header logout={this.logout}/>
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
            <NavigationBar type="sent"/>
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
      </div>
    );
  }
}
