import React from 'react'
import Login from '../components/login'
import './LoginPage.css'

export default class LoginPage extends React.Component{
  render(){
    return(
      <div className={"background"}>
        <Login/>
      </div>
    )
  }
}