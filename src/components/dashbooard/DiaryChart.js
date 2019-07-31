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
    let token = storage.getItem("token");
    let uId = storage.getItem("uId");
    requests.get("/api/admin/diary-statictics")
      .set({uId:uId})
      .set({Authorization: "Bearer "+token})
      .then(res=>JSON.parse(res.text))
      .then(res=>{
        if(res["rescode"]===0){
          this.setState({
            data: res["data"]
          })
        }
      })
      .catch(err=>console.log(err))
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