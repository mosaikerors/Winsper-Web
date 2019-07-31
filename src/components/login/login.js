import { Form, Icon, Input, Button, Checkbox } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';
import requests from 'superagent';
class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        requests.post("/api/admin/login")
          .query({"phone": values.phone})
          .query({"password":values.password})
          .then(res=>JSON.parse(res.text))
          .then(res=>{
            let storage = window.localStorage;
            storage["token"] = res["token"];
            storage["uId"] = res["uId"];
          })
          .catch(err=>{
            console.log(err)
        })
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
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
          <p style={{float:"right"}}>忘记密码</p>
          <Button type="primary" htmlType="submit" style={{width:"100%"}}>
            登录
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: 'normal_login' })(NormalLoginForm);