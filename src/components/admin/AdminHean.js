import {Table,Input} from 'antd';
import React from 'react';
import requests from 'superagent';
import 'antd/dist/antd.css'
const Search = Input.Search;
const columns = [
    {
        title: '用户',
        dataIndex: 'uId',
    },
    {
        title: '创建时间',
        dataIndex: 'createdTime',
    },
    {
        title: '内容',
        dataIndex: 'text',
    },
    {
        title:"收藏数",
        dataIndex:"starCount",
        sorter: (a, b) => Number(a["starCount"]) - Number(b["starCount"]),
        sortDirections: ['descend', 'ascend']
    },
    {
        title:"点赞数",
        dataIndex:"likeCount",
        sorter: (a, b) => Number(a["likeCount"]) - Number(b["likeCount"]),
        sortDirections: ['descend', 'ascend']
    },
    {
        title:"评论数",
        dataIndex:"commentCount",
        sorter: (a, b) => Number(a["commentCount"]) - Number(b["commentCount"]),
        sortDirections: ['descend', 'ascend']
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
    }
    
    handleSearch(value){
        let tableData = [];
        let {data} = this.state;
        for(let p in data){
            if(data.hasOwnProperty(p)){
                if(data[p].uId===Number(value)||data[p].text.indexOf(value)>=0){
                    tableData.push(data[p])
                }
            }
        }
        this.setState({
            tableData
        });
    }
    
    componentWillMount() {
        let storage = window.localStorage;
        requests.get("/api/admin/getAllHean")
            .set({"uId":storage.getItem("uId")})
            .set({"Authorization":"Bearer "+storage.getItem("Authorization")})
            .then(res=>JSON.parse(res.text))
            .then(res=>{
                if(res["rescode"]===0){
                    for(let p in res["data"]){
                        if(res["data"].hasOwnProperty(p)){
                            if(res["data"][p].text.length>50){
                                res["data"][p].text = res["data"][p].text.substr(0,50)+"………"
                            }
                            res["data"][p].key = p;
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
                        placeholder="输入内容、User ID搜索"
                        onSearch={this.handleSearch}
                        enterButton
                        style={{margin:"10px auto"}}
                    />
                </div>
                <Table bordered={true} columns={columns} dataSource={this.state.tableData} />
            </div>)
    }
    
}