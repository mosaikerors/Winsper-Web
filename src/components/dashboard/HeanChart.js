import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import requests from 'superagent';

class RegisterChart extends React.Component{
  constructor(props){
    super(props);
    this.state={
      data:{}
    }
  }
  componentWillMount() {
    let storage = window.localStorage;
    let statistics = {}
    let data = []
    requests.get("/api/admin/getAllHean")
      .set({"uId":storage.uId})
      .set({"Authorization":"Bearer "+storage.token})
      .then(res=>JSON.parse(res.text))
      .then(res=>{
        if(res["rescode"]===0){
          for(let p in res["data"]){
            if(res["data"].hasOwnProperty(p)){
              let dateObj = new Date(res["data"][p].createdTime);
              let time = dateObj.getFullYear().toString() + '-' + dateObj.getMonth().toString();
              if(statistics.hasOwnProperty(time)){
                statistics[time] += 1;
              }
              else{
                statistics[time] = 1;
              }
            }
          }
          for(let k in statistics){
            let s = {}
            s["count"] = statistics[k];
            s["month"] = k;
            data.push(s);
          }
          this.setState({
            data
          })
        }
      })
  }

  render(){
    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={this.state.data}
        >
          <XAxis dataKey="month" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{r: 8}} />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
export default RegisterChart;