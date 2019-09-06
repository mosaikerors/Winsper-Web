import React from 'react';
import { Card } from 'antd';
import 'antd/dist/antd.css'
import PersonalAccount from './PersonalAccount';

const tab = [
    {
        key: 'info',
        tab: '个人信息',
    }
];

const content = {
    info: <PersonalAccount />
};

export default class TabsCard extends React.Component {
    state = {
        key: 'info'
    };
    
    onTabChange = (key) => {
        this.setState({ key });
    };
    
    render() {
        return (
            <div>
                <Card
                    style={{ width: '100%' }}
                    tabList={tab}
                    activeTabKey={this.state.key}
                    onTabChange={key => {
                        this.onTabChange(key);
                    }}
                >
                    {content[this.state.key]}
                </Card>
            </div>
        );
    }
}