import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu} from 'antd';
import Admin from '../components/admin/index';
import DashBoard from '../components/dashboard/index'
import Account from '../components/account/index'
import {Route, BrowserRouter, Link, Redirect} from "react-router-dom";
const { Header, Content, Footer } = Layout;

export default class AdminPage extends React.Component{
    constructor(pros){
        super(pros);
        this.state={
          login:false
        };
        this.logout = this.logout.bind(this);
    }
    
    componentWillMount() {
        let storage= window.localStorage;
        if(storage["token"]!==undefined){
            this.setState({
                login: true
            })
        }
    }
    
    logout(){
        let storage= window.localStorage;
        storage.removeItem("token");
        storage.removeItem("uId");
        this.setState({
            login: false
        });
    };
    
    render(){
        const {login} = this.state;
        return(
            login ?
            <BrowserRouter>
                <Layout style={{minHeight:"100vh"}}>
                    <Header style={styles["header"]}>
                        <div style={styles["logo"]} />
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['dashboard']}
                            style={{ lineHeight: '64px'}}
                        >
                            <Menu.Item key="dashboard">
                                <Link to={"/admin"}>控制面板</Link>
                            </Menu.Item>
                            <Menu.Item key="admin">
                                <Link to={"/admin/all"}>管理</Link>
                            </Menu.Item>
                            <Menu.Item key="account">
                                <Link to={"/admin/account"}>个人信息</Link>
                            </Menu.Item>
                            <Menu.Item style={styles["logout"]} onClick={this.logout}>
                                退出
                            </Menu.Item>
                        </Menu>
                    </Header>
                    <Content style={{ margin:"80px auto 0 auto", width:"80%" }}>
                        <Route exact path={"/admin"} component={DashBoard} />
                        <Route exact path={"/admin/all"} component={Admin} />
                        <Route exact path={"/admin/account"} component={Account} />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Winsper ©2019</Footer>
                </Layout>
            </BrowserRouter>
                :
                <Redirect to={"/"}/>
        )
    }
}

const styles={
    "logo":{
        width: "120px",
        height: "31px",
        background: "rgba(255, 255, 255, 0.2)",
        margin: "16px 24px 16px 0",
        float: "left"
    },
    "header":{
        position:"fixed",
        zIndex:2,
        width: "100%"
    },
    "logout":{
        float: "right",
    },
};
