import {Button, Table,Input, Icon} from 'antd';
import React from 'react';
import requests from 'superagent';
import 'antd/dist/antd.css';
import ws from "../../ws"

const Search = Input.Search;
const columns = [
  {
    title: 'User ID',
    dataIndex: 'uId',
  },
  {
    title: '投稿时间',
    dataIndex: 'date',
    render: (value)=>{
      const dateObj = new Date(value);
      return <span>{dateObj.toISOString()}</span>
    }
  },
  {
    title: '投稿原因',
    dataIndex: 'reason',
  },
  {
    title:"投稿状态",
    dataIndex:"status",
    render: (value)=>{
      if(value===0) return <Icon type="question" />;
      if(value===2) return <Icon type="close" />;
      if(value===1) return <Icon type="check" />;
    }
  }
];

export default class AdminSubmission extends React.Component {
  constructor(props){
    super(props);
    this.state={
      data:[],
      tableData:[],
      selectedItems:[],
      selectedRows:[]
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
            selectedItems.push(selectedRows[p].cId)
          }
        }
        this.setState({
          selectedItems,
          selectedRows
        });
      }
    };
  }

  handleSearch(value){
    let tableData = [];
    let {data} = this.state;
    for(let p in data){
      if(data.hasOwnProperty(p)){
        if(data[p].uId===value){
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
        if(selectedItems.indexOf(tableData[p].cId)!==-1){
          tableData[p].status = status;
        }
      }
    }
    for(let p in data){
      if(data.hasOwnProperty(p)){
        if(selectedItems.indexOf(tableData[p].cId)!==-1){
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
    requests.put("/api/admin/check")
      .set("uId",storage.uId)
      .set("Authorization","Bearer "+storage.token)
      .send({"cIds":selectedItems, "status":2})
      .then(res=>JSON.parse(res.text))
      .then(res=>{
        if(res["rescode"]===0){
          this.changeState(2);
          alert("不通过"+ selectedItems);
        }
      })
  }

  enable(){
    let storage = window.localStorage;
    let {selectedItems, selectedRows} = this.state;
    console.log(selectedItems, selectedRows);
    requests.put("/api/admin/check")
      .set({"uId":storage.uId})
      .set({"Authorization":"Bearer "+storage.token})
      .send({"cIds":selectedItems, "status":1})
      .then(res=>JSON.parse(res.text))
      .then(res=>{
        if(res["rescode"]===0){
          this.changeState(1);
          for(let p in selectedRows){
            if(selectedRows.hasOwnProperty(p)){
              let targetUId = selectedRows[p]["uId"];
              let sendUId = window.localStorage["uId"];
              let type = 5;
              let hId = selectedRows[p]["hId"];
              console.log(targetUId,sendUId,type,hId);
              ws.send(`{"type": 5, "receiverUId": ${targetUId}, "hId": "${hId}"}`);
            }
          }
          alert("通过"+selectedItems);
        }
      })
  }

  componentWillMount() {
    let storage = window.localStorage;
    requests.get("/api/admin/getAllSubmission")
      .set({"uId":storage.uId})
      .set({"Authorization":"Bearer "+storage.token})
      .then(res=>JSON.parse(res.text))
      .then(res=>{
        if(res["rescode"]===0){
          for(let p in res["data"]){
            if(res["data"].hasOwnProperty(p)){
              res["data"][p].key = res["data"][p].cId;
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
            placeholder="输入User ID搜索"
            onSearch={this.handleSearch}
            enterButton
            style={{margin:"10px auto"}}
          />
        </div>
        <Table rowSelection={this.rowSelection} columns={columns} dataSource={this.state.tableData} />
        <div style={{marginLeft:"40%", marginTop:"20px"}}>
          <Button type={"primary"} style={{marginRight:"20px"}} onClick={this.enable}>通过</Button>
          <Button type={"primary"} onClick={this.disable}>不通过</Button>
        </div>
      </div>)
  }
}