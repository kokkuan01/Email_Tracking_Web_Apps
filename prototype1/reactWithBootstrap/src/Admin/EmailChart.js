import React, { Component } from 'react';
import Chart from 'chart.js';

const config = require('../config');

export default class EmailChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ageCount: [],
            raceCount: [],
            genderCount: [],
            typeCount: [],
            priorityCount: [],
            noData:false,
            token: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : null,
        };

        this.displayChart = this.displayChart.bind(this);
        this.getNewMonthData = this.getNewMonthData.bind(this);
    }

    componentDidMount() {
        let url = config.settings.serverPath + '/api/getEmailData?month=' + this.props.month;
        fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' + this.state.token,
            }
        })
        .then(response => {
            return response.json();
        })
        .then((result) => {
            if(result.message === 'no data'){
                this.setState({
                    noData:true
                });
            }
            else{
                this.setState({
                    ageCount: result.ageCount,
                    raceCount: result.raceCount,
                    genderCount: result.genderCount,
                    typeCount: result.typeCount,
                    priorityCount: result.priorityCount,
                    noData:false
                }, this.displayChart);
            }
        });
    }

    getNewMonthData(month){
        if(!this.state.noData){
            console.log("Destroy");
            window.chart1.destroy();
            window.chart2.destroy();
            window.chart3.destroy();
            window.chart4.destroy();
            window.chart5.destroy();
        }
        
        let url = config.settings.serverPath + '/api/getEmailData?month=' + month;
        fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' + this.state.token,
            }
        })
        .then(response => {
            return response.json();
        })
        .then((result) => {
            if(result.message === 'no data'){
                this.setState({
                    noData:true
                });
            }
            else{
                this.setState({
                    ageCount: result.ageCount,
                    raceCount: result.raceCount,
                    genderCount: result.genderCount,
                    typeCount: result.typeCount,
                    priorityCount: result.priorityCount,
                    noData:false
                }, this.displayChart);
            }
        });
    }

    displayChart() {
        var ctx = document.getElementById('emailByAge').getContext('2d');
        window.chart1 = new Chart(ctx, {
            // The type of chart we want to create
            type: 'pie',

            // The data for our dataset
            data: {
                labels: ["11-20", "21-30", "31-40", "41-50", "51-60"],
                datasets: [{
                    label: "Number Of Emails Based On Age Of Clients",
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
                    data: this.state.ageCount,
                }]
            },

            // Configuration options go here
            options: {
                title: {
                    display: true,
                    text: "Number Of Emails Based On Age Of Clients",
                    fontSize: 15
                }
            }
        });
        

        var ctx2 = document.getElementById('emailByRace').getContext('2d');
        window.chart2 = new Chart(ctx2, {
            // The type of chart we want to create
            type: 'bar',
    
            // The data for our dataset
            data: {
                labels: ["Malay", "Chinese","Indian", "Others"],
                datasets: [{
                    label: "Number Of Emails Based On Race Of Clients",
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
                    data: this.state.raceCount,
                }]
            },
    
            // Configuration options go here
            options: {
              legend: {
                   display: false
               },
    
              title:{
                display:true,
                text:"Number Of Emails Based On Race Of Clients",
                fontSize:15
              },

                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

        var ctx3 = document.getElementById('emailByGender').getContext('2d');
        window.chart3 = new Chart(ctx3, {
            // The type of chart we want to create
            type: 'bar',

            // The data for our dataset
            data: {
                labels: ["Male", "Female"],
                datasets: [{
                    label: "Number Of Emails Based On Gender Of Clients",
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
                    data: this.state.genderCount,
                }]
            },

            // Configuration options go here
            options: {
                legend: {
                    display: false
                },

                title: {
                    display: true,
                    text: "Number Of Emails Based On Gender Of Clients",
                    fontSize: 15
                },

                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

        var ctx4 = document.getElementById('emailByProblemType').getContext('2d');
        window.chart4 = new Chart(ctx4, {
            // The type of chart we want to create
            type: 'bar',

            // The data for our dataset
            data: {
                labels: ["Relationship", "Illness", "Marital", "Psychiatric" ,"Work", "Family", "Financial", "Suicide"],
                datasets: [{
                    label: "Number Of Emails Based On Problem Type",
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(233,190,117)',
                        'rgb(96,156,136)',
                    ],
                    borderColor: [
                        'white'
                    ],
                    data: this.state.typeCount,
                }]
            },

            // Configuration options go here
            options: {
                legend: {
                    display: false
                },

                title: {
                    display: true,
                    text: "Number Of Emails Based On Problem Type",
                    fontSize: 15
                },

                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

        var ctx5 = document.getElementById('emailByPriority').getContext('2d');
        window.chart5 = new Chart(ctx5, {
            // The type of chart we want to create
            type: 'pie',

            // The data for our dataset
            data: {
                labels: ["Low", "Medium", "High"],
                datasets: [{
                    label: "Email Priority",
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
                    data: this.state.priorityCount,
                }]
            },

            // Configuration options go here
            options: {
                title: {
                    display: true,
                    text: "Email Priority",
                    fontSize: 25
                }
            }
        });
    }

    render() {
        if(this.state.noData){
            return (<h3>No Data Yet For This Month</h3>);
        }
        return (
            <div>
                <h3>Email Report (Monthly)</h3>
                <div style={{ display: "inline-block", height: 270, width: 520 }}>
                    <canvas id="emailByAge" className="chartjs-render-monitor"></canvas>
                </div>
                <div style={{ display: "inline-block", height: 270, width: 520 }}>
                    <canvas id="emailByRace" className="chartjs-render-monitor"></canvas>
                </div>
                <div style={{ display: "inline-block", height: 270, width: 520 }}>
                    <canvas id="emailByGender" className="chartjs-render-monitor"></canvas>
                </div>
                <div style={{ display: "inline-block", height: 270, width: 520 }}>
                    <canvas id="emailByProblemType" className="chartjs-render-monitor"></canvas>
                </div>
                <div style={{ display: "inline-block", height: 500, width: 800 }}>
                    <canvas id="emailByPriority" className="chartjs-render-monitor"></canvas>
                </div>
            </div>
        );
    }
}