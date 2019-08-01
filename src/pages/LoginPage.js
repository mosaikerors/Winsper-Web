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
        background: "#fff9c4"
      }}>
        <Login/>
      </div>
    )
  }
}