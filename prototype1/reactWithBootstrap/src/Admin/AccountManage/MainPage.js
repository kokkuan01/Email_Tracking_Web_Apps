import React,{Component} from 'react';
import '../../css/InboxPage.css';
import {Link, Redirect} from 'react-router-dom';
import {account} from '../../previousWork/sample';
import Header from '../../Common/Header';
import NavigationBar from '../../Common/NavigationBar';

export default class AdminMainPage extends Component{
  constructor(props){
    super(props);

    this.state={
      logout:false,
    }

    this.logout = this.logout.bind(this);
    this.displayModal = this.displayModal.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.displayTable = this.displayTable.bind(this);
  }

  logout(event){
    this.setState({logout:true});
  }

  displayModal(){
    return(
        <div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Delete Confirmation</h5>
                    </div>
                    <div className="modal-body">
                        Do You Sure To Delete?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.deleteItem}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
  }

  displayTable(){
      return(
        <table className="table table-hover">
            <caption>List of users</caption>
            <thead className="thead-light">
                <tr>
                <th>
                    #
                </th>
                <th>
                    Creation Date
                </th>
                <th>
                    Name
                </th>
                <th>
                    Username
                </th>
                <th>
                    Type of User
                </th>
                <th>
                    Actions
                </th>
                </tr>
            </thead>
            <tbody>
            {account.map((item,index)=>{
                return(
                    <tr>
                        <td>
                            {index+1}
                        </td>
                        <td>
                            {item.date}
                        </td>
                        <td>
                            {item.name}
                        </td>
                        <td>
                            {item.username}
                        </td>
                        <td>
                            {item.type}
                        </td>
                        <td>
                        <Link to={{pathname:"/inbox/account/update/" + index,state:{index:index}}} style={{marginRight:7}} className="btn">
                            Update
                        </Link>
                        <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#deleteModal" onClick={()=>{this.setState({delete:index})}}>
                            Delete
                        </button>
                        </td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
  }

  deleteItem(index){
    account.splice(this.state.delete,1);
    this.setState({delete:-1});
  }

  render() {
    if(this.state.logout){
      return(<Redirect to="/"/>);
    }

    return (
      <div className="container">
        <Header logout={this.logout}/>
        <div className="content">
          {this.displayModal()}
          <div className="row">
            <NavigationBar type="manage"/>
            <div className="col-md-10">
              <div className="tab-content">
                <div className="tab-pane fade in active" id="home">
                  <div className="list-group" style={{overflow: 'auto',maxHeight:550}}>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12">
                                    <h3>
                                        Account Management
                                    </h3>
                                    <Link to="/inbox/account/create" className="btn btn-success">
                                        Create New Account
                                    </Link>
                                    {this.displayTable()}
                                    <div className="row">
                                </div>
                            </div>
                        </div>
                    </div>
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
