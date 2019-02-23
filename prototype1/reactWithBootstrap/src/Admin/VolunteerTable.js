import React, { Component } from 'react';

const config = require('../config');

export default class VolunteerTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : null,
            volunteers: []
        };

        this.displayBody = this.displayBody.bind(this);
        this.convertIntToDuration = this.convertIntToDuration.bind(this);
        this.getNewMonthData = this.getNewMonthData.bind(this);
    }

    componentDidMount() {
        let url = config.settings.serverPath + "/api/getVolunteerData?month=" + this.props.month;
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
            if (result.volunteers !== null) {
                this.setState({
                    volunteers: result.volunteers,
                });
            }
        })
    }

    displayBody() {
        if (this.state.volunteers.length !== 0) {
            return (
                this.state.volunteers.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>
                                {index + 1}
                            </td>
                            <td>
                                {item.name}
                            </td>
                            <td>
                                {item.email}
                            </td>
                            <td>
                                {item.count}
                            </td>
                            <td>
                                {item.avgDuration === 0 ? "No Record Yet" : this.convertIntToDuration(item.avgDuration)}
                            </td>
                        </tr>
                    );
                })
            );
        }
        else {
            return <tr></tr>;
        }
    }

    getNewMonthData(month){
        let url = config.settings.serverPath + "/api/getVolunteerData?month=" + month;
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
            if (result.volunteers !== null) {
                this.setState({
                    volunteers: result.volunteers,
                });
            }
        })
    }

    convertIntToDuration(num) {
        var hour = Math.floor(num / 3600);
        var minute = Math.floor(num / 60);
        var second = 0;
        second = parseInt(num % 60);

        if (hour === 0 && minute === 0) {
            return second + " second ";
        }
        else if (hour === 0) {
            return minute + " minute " + second + " second ";
        }
        else {
            return hour + " hour " + minute + " minute " + second + " second ";
        }
    }

    render() {
        return (
            <table className="table table-hover">
                <caption>List of Volunteers</caption>
                <thead className="thead-light">
                    <tr>
                        <th>
                            #
              </th>
                        <th>
                            Name
              </th>
                        <th>
                            Email
              </th>
                        <th>
                            Number of Emails Answered
              </th>
                        <th>
                            Average Length of Time to Reply
              </th>
                    </tr>
                </thead>
                <tbody>
                    {this.displayBody()}
                </tbody>
            </table>
        );
    }
}
