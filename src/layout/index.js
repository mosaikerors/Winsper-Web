import React from 'react'
import 'antd/dist/antd.css'
import './index.css'
import AdminUser from '../components/admin/adminUser'
import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class BasicLayout extends React.Component {

  render() {
    return (
      <Layout>
        <Sider style={{paddingTop:"100px", position: 'fixed', zIndex: 2, backgroundColor:"#fff", height:document.documentElement.offsetHeight}} >
          <Menu defaultSelectedKeys={"dashboard"} mode="inline" onClick={(keyPath)=>{console.log(keyPath)}}>
            <Menu.Item key="dashboard">
              <Icon type="file" />
              <span>控制面板</span>
            </Menu.Item>
            <SubMenu
              key="admin"
              title={
                <span>
                  <Icon type="user" />
                  <span>管理</span>
                </span>
              }
            >
              <Menu.Item key="user">用户管理</Menu.Item>
              <Menu.Item key="hean">函管理</Menu.Item>
              <Menu.Item key="diary">日记管理</Menu.Item>
              <Menu.Item key="journel">手账管理</Menu.Item>
              <Menu.Item key="post">投稿管理</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Header style={{ position: 'fixed', zIndex: 3, width: '100%', height:"80px", backgroundColor:"#fff"}}>
          <img style={{width:"64px",height:"64px", marginLeft:"20px"}} alt={"img"} src={"https://www.bing.com/th?id=OIP.JGAlBlV0Q8SkUIur8OYmpAHaNO&w=128&h=195&c=7&o=5&dpr=1.5&pid=1.7"}/>
        </Header>
        <Content style={{ marginTop:"100px", marginLeft:"250px" }}>
          <AdminUser />
        </Content>
        <Footer style={{ textAlign: 'center' }}>Winsper ©2018</Footer>
      </Layout>
    );
  }
}
