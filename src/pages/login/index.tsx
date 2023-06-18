import React from 'react';
import { Form, Button, Input, Row, Col } from 'antd';
import { LockFilled, UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { request } from 'utils';
import './index.scss';

const FormItem = Form.Item;

const Login: React.FC = () => {
  const navigate = useNavigate();

  // 登陆
  const onFinish = (values) => {
    console.log(values);
    const params = {
      username: 'gufee',
      password: 123456
    }
    request.post('/login', params).then(res => {
      console.log(res);
    }).catch(error => {
      console.log(error);
    });
  }

  // 游客登陆
  const handleVisitorLogin = () => {
    navigate('/')
  }

  return (
    <div className='login'>
      <div className='login-box'>
        <h2>半米小站</h2>
        <Form
          onFinish={onFinish}
          autoComplete="off"
          size='large'
        >
          <FormItem
            name='username'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder='用户名' />
          </FormItem>
          <FormItem
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input prefix={<LockFilled />} placeholder='密码' />
          </FormItem>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
            </Col>
            <Col span={24}>
              <Button type="primary" onClick={handleVisitorLogin}>
                游客登录
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  )
}

export default Login