import React from 'react'
import Login from '../components/login'

export default class LoginPage extends React.Component{
  render(){
    return(
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: document.documentElement.offsetHeight,
        backgroundImage: "url('https://tse3-mm.cn.bing.net/th?id=OIP.xXwDHPUDPPO0MOlasK4xyQAAAA&w=157&h=160&c=7&o=5&dpr=1.5&pid=1.7')",
      }}>
        <Login/>
      </div>
    )
  }
}