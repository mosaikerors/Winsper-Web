import {Button, Table,Input} from 'antd';
import React from 'react';
import requests from 'superagent';
import 'antd/dist/antd.css'
const Search = Input.Search;
const columns = [
  {
    title: 'User ID',
    dataIndex: 'uId',
  },
  {
    title: '手机号码',
    dataIndex: 'phone',
  },
  {
    title: '用户名',
    dataIndex: 'username',
  },
  {
    title:"是否可用",
    dataIndex:"status"
  },
  {
    title:"羽毛数",
    dataIndex:"features"
  },
  {
    title:"粉丝数",
    dataIndex:"followers"
  },
  {
    title:"关注数",
    dataIndex:"following"
  }
];

export default class AdminUser extends React.Component {
  constructor(props){
    super(props);
    this.state={
      data:[],
      tableData:[],
      selectedItems:[]
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.disable = this.disable.bind(this);
    this.enable  =this.enable.bind(this);
    this.changeState = this.changeState.bind(this);
    this.rowSelection = {
      hideDefaultSelections: true,
      onChange: (selectedRowKeys, selectedRows) => {
        let selectedItems = [];
        for(let p in selectedRows){
          if(selectedRows.hasOwnProperty(p)){
            selectedItems.push(selectedRows[p].uId)
          }
        }
        this.setState({
          selectedItems
        });
      }
    };
  }

  handleSearch(value){
    let tableData = [];
    let {data} = this.state;
    for(let p in data){
      if(data.hasOwnProperty(p)){
        if(data[p].uId===value||data[p].username.indexOf(value)>=0||data[p].phone.indexOf(value)>=0){
          tableData.push(data[p])
        }
      }
    }
    this.setState({
      tableData
    });
  }

  changeState(status){
    let {data, tableData, selectedItems} = this.state;
    for(let p in tableData){
      if(tableData.hasOwnProperty(p)){
        if(selectedItems.indexOf(tableData[p].uId)!==-1){
          tableData[p].status = status;
        }
      }
    }
    for(let p in data){
      if(data.hasOwnProperty(p)){
        if(selectedItems.indexOf(tableData[p].uId)!==-1){
          tableData[p].status = status;
        }
      }
    }
    this.setState({
      data, tableData
    });
  }

  disable(){
    let storage = window.localStorage;
    let {selectedItems} = this.state;
    requests.post("/api/admin/disable-user")
      .set({"uId":storage.getItem("uId")})
      .set({"Authorization":"Bearer "+storage.getItem("Authorization")})
      .field({"user":selectedItems})
      .then(res=>JSON.parse(res.text))
      .then(res=>{
        if(res["rescode"]===0){
          this.changeState(0 );
          alert("成功禁用"+ selectedItems);
        }
      })
  }

  enable(){
    let storage = window.localStorage;
    let {selectedItems} = this.state;
    requests.post("/api/admin/enable-user")
      .set({"uId":storage.getItem("uId")})
      .set({"Authorization":"Bearer "+storage.getItem("Authorization")})
      .field({"user":selectedItems})
      .then(res=>JSON.parse(res.text))
      .then(res=>{
        if(res["rescode"]===0){
          this.changeState(1);
          alert("解禁成功！"+selectedItems);
        }
      })
  }

  componentWillMount() {
    let storage = window.localStorage;
    requests.get("/api/admin/getAllUser")
      .set({"uId":storage.getItem("uId")})
      .set({"Authorization":"Bearer "+storage.getItem("Authorization")})
      .then(res=>JSON.parse(res.text))
      .then(res=>{
        if(res["rescode"]===0){
          for(let p in res["data"]){
            if(res["data"].hasOwnProperty(p)){
              res["data"][p].key = res["data"][p].uId;
            }
          }
          this.setState({
            tableData:res["data"],
            data:res["data"]
          })
        }
      })
  }

  render(){
    return(
      <div>
        <div>
          <Search
            placeholder="输入用户名、手机号、User ID搜索"
            onSearch={this.handleSearch}
            enterButton
            style={{margin:"10px auto"}}
          />
        </div>
        <Table rowSelection={this.rowSelection} columns={columns} dataSource={this.state.tableData} />
        <div style={{marginLeft:"40%", marginTop:"20px"}}>
          <Button type={"primary"} style={{marginRight:"20px"}} onClick={this.disable}>禁用用户</Button>
          <Button type={"primary"} onClick={this.enable}>解禁用户</Button>
        </div>
      </div>)
  }

}