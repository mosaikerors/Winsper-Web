import React from 'react';
import { Card, Row, Col } from 'antd';
import RegisterChart from './RegisterChart';
import HeanChart from "./HeanChart";
import DiaryChart from "./DiaryChart";
import JournelChart from "./JournelChart";
import PostChart from "./PostChart";

class Recharts extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Row style={{width:"100%"}}>
          <Col>
            <Card title="用户注册统计图" bordered={true} style={{marginTop:"100px"}}>
              <RegisterChart />
            </Card>
          </Col>
        </Row>
        <Row style={{width:"100%"}}>
          <Col span={12}>
            <Card title="函统计图" bordered={true}>
              <HeanChart />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="日记统计图" bordered={true}>
              <DiaryChart />
            </Card>
          </Col>
        </Row>
        <Row style={{width:"100%"}}>
          <Col span={12}>
            <Card title="手账统计图" bordered={true}>
              <JournelChart />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="投稿统计图" bordered={true}>
              <PostChart />
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default Recharts;