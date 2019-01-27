import React,{Component} from 'react';
import '../css/InboxPage.css';
import {Redirect} from 'react-router-dom';
import {unsend,replying,sent} from '../previousWork/sample';
import EmailButton from './EmailButton';
import Header from '../Common/Header';
import NavigationBar from '../Common/NavigationBar';

export default class UnreplyPage extends Component{
  constructor(props){
    super(props);

    this.state={
      data:unsend,
      logout:false,
    }

    this.logout = this.logout.bind(this);
  }

  logout(event){
    this.setState({logout:true});
  }

  render() {
    if(this.state.logout){
      return(<Redirect to="/"/>);
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
            <NavigationBar type="unreply"/>
            <div className="col-md-10">
              <div className="tab-content">
                <div className="tab-pane fade in active" id="home">
                  <div className="list-group" style={{overflow: 'auto',maxHeight:550}}>
                      {this.state.data.map((item,index)=>{
                        return(<EmailButton id={index} item={item}/>);
                      })}
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
