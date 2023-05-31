import React from 'react';
import { Layout, Menu, ConfigProvider, Button } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

const Home = () => {
    return (
        <Layout>
            <Sider>
                <div></div>
                <Menu></Menu>
            </Sider>
            <Layout>
                <Header>Header</Header>
                <Content>Content <Button>123</Button></Content>
                <Footer>Footer</Footer>
            </Layout>
        </Layout>
    )
}

export default Home;