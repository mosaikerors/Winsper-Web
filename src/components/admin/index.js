import React from 'react';
import { Card } from 'antd';
import 'antd/dist/antd.css'
import AdminUser from './AdminUser';
import AdminHean from './AdminHean';
import AdminJournel from './AdminJournel';

const tab = [
    {
        key: 'user',
        tab: '用户管理',
    },
    {
        key: 'hean',
        tab: '函管理',
    },
    {
        key: 'journel',
        tab: '手账管理',
    },
    {
        key: 'post',
        tab: '投稿管理',
    },
    {
        key: 'diary',
        tab: '日记管理',
    }
];

const content = {
    user: <AdminUser />,
    hean: <AdminHean />,
    journel: <AdminJournel />,
    post: <div>待开发</div>,
    diary: <div>待开发</div>
};

export default class TabsCard extends React.Component {
    state = {
        key: 'user'
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