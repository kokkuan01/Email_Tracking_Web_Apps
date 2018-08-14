import React,{Component} from 'react';
import Chart from 'chart.js';

class AdminChart extends Component{
  componentDidMount(){
    var ctx = document.getElementById('Age').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'pie',

        // The data for our dataset
        data: {
            labels: ["11-20", "21-30","31-40", "41-50", "51-60"],
            datasets: [{
                label: "Age Of Clients",
                backgroundColor: [
                  'rgb(255, 99, 132)',
                  'rgb(255, 159, 64)',
                  'rgb(255, 205, 86)',
                  'rgb(75, 192, 192)',
                  'rgb(54, 162, 235)',
                  'rgb(153, 102, 255)',
                  'rgb(231,233,237)'
                ],
                borderColor: [
                    'white'
                ],
                data: [10, 10, 20, 15, 5],
            }]
        },

        // Configuration options go here
        options: {
          title:{
            display:true,
            text:"Age Of Clients",
            fontSize:25
          }
        }
    });

    var ctx2 = document.getElementById('Race').getContext('2d');
    var chart = new Chart(ctx2, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: ["Chinese", "Malay","Indian", "Others"],
            datasets: [{
                label: "Race Of Clients",
                backgroundColor: [
                  'rgb(255, 99, 132)',
                  'rgb(255, 159, 64)',
                  'rgb(255, 205, 86)',
                  'rgb(75, 192, 192)',
                  'rgb(54, 162, 235)',
                  'rgb(153, 102, 255)',
                  'rgb(231,233,237)'
                ],
                borderColor: [
                    'white'
                ],
                data: [25, 15, 16, 4, ],
            }]
        },

        // Configuration options go here
        options: {
          legend: {
               display: false
           },

          title:{
            display:true,
            text:"Race Of Clients",
            fontSize:25
          }
        }
    });
  }

  render(){
    return(
      <div>
        <div>
          <h3>Real Time Report</h3>
        </div>
          <div className="row">
              <div style={{marginLeft:20}} className="col-md-3">
                  <div className="list-group">
                      <div className="list-group-item visitor">
                          <h3 className="pull-right">
                              <i className="fa fa-eye"></i>
                          </h3>
                          <h4 className="list-group-item-heading count">
                              55</h4>
                          <p className="list-group-item-text">
                              Number Of Email Received In This Month</p>
                      </div>
                  </div>
              </div>
              <div className="col-md-3">
                  <div className="list-group">
                      <div className="list-group-item visitor">
                          <h3 className="pull-right">
                              <i className="fa fa-eye"></i>
                          </h3>
                          <h4 className="list-group-item-heading count">
                              Chan Kok Kuan</h4>
                          <p className="list-group-item-text">
                              Most Active Volunteer</p>
                      </div>
                  </div>
              </div>
              <div className="col-md-3">
                  <div className="list-group">
                      <div className="list-group-item visitor">
                          <h3 className="pull-right">
                              <i className="fa fa-eye"></i>
                          </h3>
                          <h4 className="list-group-item-heading count">
                              Lim Lee Tan</h4>
                          <p className="list-group-item-text">
                              Who Has Longest Conversation</p>
                      </div>
                      <div className="list-group-item visitor">
                          <h3 className="pull-right">
                              <i className="fa fa-eye"></i>
                          </h3>
                          <h4 className="list-group-item-heading count">
                              20</h4>
                          <p className="list-group-item-text">
                              Age</p>
                      </div>
                      <div className="list-group-item visitor">
                          <h3 className="pull-right">
                              <i className="fa fa-eye"></i>
                          </h3>
                          <h4 className="list-group-item-heading count">
                              Chinese</h4>
                          <p className="list-group-item-text">
                              Race</p>
                      </div>
                  </div>
              </div>

        </div>
        <div style={{height:420,width:800}}>
          <canvas id="Age" className="chartjs-render-monitor"></canvas>
        </div>
        <div style={{height:420,width:800}}>
          <canvas id="Race" className="chartjs-render-monitor"></canvas>
        </div>
      </div>
    );
  }
}

export default AdminChart;
