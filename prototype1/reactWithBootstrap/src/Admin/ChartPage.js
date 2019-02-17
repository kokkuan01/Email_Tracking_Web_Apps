import React,{Component} from 'react';
import '../css/InboxPage.css';
import {Redirect} from 'react-router-dom';
import {unsend} from '../previousWork/sample';
import Header from '../Common/Header';
import NavigationBar from '../Common/NavigationBar';
import AdminChart from './AdminChart';

export default class ChartPage extends Component{
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
            <NavigationBar type="report"/>
            <div className="col-md-10">
              <div className="tab-content">
                <div className="tab-pane fade in active" id="home">
                    <AdminChart/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
