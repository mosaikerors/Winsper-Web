import { Form, Icon, Input, Button, Checkbox } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';
import requests from 'superagent';
import {Redirect} from "react-router";
import ws from "../ws"

class NormalLoginForm extends React.Component {
  
  constructor(props){
      super(props);
      this.state={
          login: false
      }
  }
  
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        requests.post("/api/user/login")
          .send({"phone": values.phone,"password":values.password})
          .then(res=>res.body)
          .then(res=>{
            if(res["rescode"]===0 && res["status"]===100){
              let storage = window.localStorage;
              storage["token"] = res["token"];
              storage["uId"] = res["uId"];
              storage["phone"] = values.phone;
              storage["username"] = res["username"];
              this.setState({
                login: true
              });
              /*ws = new WebSocket(\`ws://202.120.40.8:30525/websocket?senderUId=${res.uId}\`);
              ws.onopen = () => console.log("open");
              ws.onmessage = (e) => console.log(e);
              ws.onclose = () => console.log("close");
              ws.send(\`{"type": 5, "receiverUId":1000, "d": "123"}`);
              window.localStorage["ws"] = ws*/
            }
            else{
              alert("手机号或者密码错误！")
            }

          })
          .catch(err=>{
            console.log(err)
        })
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const {login} = this.state;
    return (
        !login
          ?
            <Form onSubmit={this.handleSubmit} style={{backgroundColor:"#ffffff", padding:"30px 30px"}}>
              <p style={{font:"25px bold"}}>{"Winsper后台管理系统"}</p>
              <Form.Item>
                {getFieldDecorator('phone', {
                  rules: [{ required: true, message: '请输入手机号!' }],
                })(
                  <Input
                    prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="手机号"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码!' }],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(<Checkbox>记住</Checkbox>)}
                <Button type="primary" htmlType="submit" style={{width:"100%"}}>
                  登录
                </Button>
              </Form.Item>
            </Form>
            :
      <Redirect to={"/admin"}/>
    );
  }
  
}

export default Form.create({ name: 'normal_login' })(NormalLoginForm);