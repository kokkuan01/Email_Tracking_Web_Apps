import React, { Component } from 'react';
import Chart from 'chart.js';

const config = require('../config');

export default class ClientChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ageCount: [],
            raceCount: [],
            genderCount: [],
            typeCount: [],
            token: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : null,
        };

        this.displayChart = this.displayChart.bind(this);
    }

    componentDidMount() {
        let url = config.settings.serverPath + '/api/getClientData';
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
                if (result.CountOfEmail !== null) {
                    this.setState({
                        ageCount: result.ageCount,
                        raceCount: result.raceCount,
                        genderCount: result.genderCount,
                        typeCount: result.typeCount,
                    }, this.displayChart);
                }
            });
    }

    displayChart() {
        var ctx = document.getElementById('age').getContext('2d');
        window.chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'pie',

            // The data for our dataset
            data: {
                labels: ["11-20", "21-30", "31-40", "41-50", "51-60"],
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
                    data: this.state.ageCount,
                }]
            },

            // Configuration options go here
            options: {
                title: {
                    display: true,
                    text: "Age Of Clients",
                    fontSize: 15
                }
            }
        });

        var ctx2 = document.getElementById('race').getContext('2d');
        window.chart2 = new Chart(ctx2, {
            // The type of chart we want to create
            type: 'bar',
    
            // The data for our dataset
            data: {
                labels: ["Malay", "Chinese","Indian", "Others"],
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
                text:"Race Of Clients",
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

        var ctx3 = document.getElementById('gender').getContext('2d');
        window.chart3 = new Chart(ctx3, {
            // The type of chart we want to create
            type: 'bar',

            // The data for our dataset
            data: {
                labels: ["Male", "Female"],
                datasets: [{
                    label: "Gender Of Clients",
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
                    text: "Gender Of Clients",
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

        var ctx4 = document.getElementById('problemType').getContext('2d');
        window.chart4 = new Chart(ctx4, {
            // The type of chart we want to create
            type: 'bar',

            // The data for our dataset
            data: {
                labels: ["Relationship", "Illness", "Marital", "Psychiatric" ,"Work", "Family", "Financial", "Suicide"],
                datasets: [{
                    label: "Problem Type",
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
                    text: "Problem Type",
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
    }

    render() {
        return (
            <div>
                <h3>Client Report (Lifetime)</h3>
                <div style={{ display: "inline-block", height: 270, width: 520 }}>
                    <canvas id="age" className="chartjs-render-monitor"></canvas>
                </div>
                <div style={{ display: "inline-block", height: 270, width: 520 }}>
                    <canvas id="race" className="chartjs-render-monitor"></canvas>
                </div>
                <div style={{ display: "inline-block", height: 270, width: 520 }}>
                    <canvas id="gender" className="chartjs-render-monitor"></canvas>
                </div>
                <div style={{ display: "inline-block", height: 270, width: 520 }}>
                    <canvas id="problemType" className="chartjs-render-monitor"></canvas>
                </div>
            </div>
        );
    }
}