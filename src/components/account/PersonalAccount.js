import {Input, Button} from 'antd';
import React, {Component, Fragment} from 'react';
import requests from 'superagent';
import 'antd/dist/antd.css'

export default class PersonalAccount extends Component {
  constructor(props){
    super(props);
    this.state={
      phone:"",
      oldUsername:"",
      newUsername:"",
      newPassword:"",
      oldPassword:"",
      token:"",
      uId:-1
    }
    this.changeUsername = this.changeUsername.bind(this);
    this.changeOldPassword = this.changeOldPassword.bind(this);
    this.changeNewPassword = this.changeNewPassword.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  componentWillMount(){
    let storage = window.localStorage;
    this.setState ({
      phone: storage["phone"],
      oldUsername: storage["username"],
      token: storage["token"],
      uId: storage["uId"]
    })
  }

  changeUsername = e=>{
    this.setState({
      newUsername: e.target.value
    })
  }

  changeNewPassword = (e) =>{
    this.setState({
      newPassword: e.target.value
    })
  }

  changeOldPassword = (e) =>{
    this.setState ({
      oldPassword: e.target.value
    })
  }

  handleChangePassword = () =>{
    const { oldPassword, newPassword } = this.state;
    requests.put("/api/user/password/update")
    .set("uId", this.state.uId)
    .set("Authorization", "Bearer "+ this.state.token)
    .send({"oldPassword":oldPassword, "password": newPassword})
    .then(res=>JSON.parse(res.text))
    .then(res=>{
      if(res["rescode"]===0){
        alert("修改密码成功！");
      }
      else{
        alert("修改失败，请稍后再试！")
      }
    })
  }

  handleChangeUsername =()=>{
    const username = this.state.newUsername;
    requests.put("/api/user/username/update")
    .set("uId", this.state.uId)
    .set("Authorization", "Bearer "+ this.state.token)
    .send({"username":this.state.newUsername})
    .then(res=>JSON.parse(res.text))
    .then(res=>{
      if(res["rescode"]===0){
        alert("修改用户名成功！");
        this.setState({
          oldUsername: username
        })
        window.localStorage.username = username;
      }
      else{
        alert("修改失败，请稍后再试！")
      }
    })
  }


  
  render(){
      return(
          <Fragment>
              <div>
                <span>手机号:</span>
                <Input disabled={true} placeholder={this.state.phone}/>
              </div>
              <div>
                <span>用户名</span>
                <Input placeholder={this.state.username} onChange={this.changeUsername}/>
                <Button type="primary" onClick={this.handleChangeUsername}>修改用户名</Button>
              </div>
              <div>
                <span>原密码</span>
                <Input.Password />
              </div>
              <div>
                <span>新密码</span>
                <Input.Password />
                <Button type="primary" onClick={this.handleChangePassword}>修改密码</Button>
              </div>
          </Fragment>)
  }
}