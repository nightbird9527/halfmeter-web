import React from 'react';
import { Form, Button, Input, Row, Col } from 'antd';
import { LockFilled, UserOutlined } from '@ant-design/icons';
import styles from './index.scss';

const FormItem = Form.Item;

const Login: React.FC = () => {

  const onFinish = (values) => {
    console.log(values);
  }

  return (
    <div className={styles.login}>
      <div className={styles.loginBox}>
        <div className={styles.contentContainer}>
          <h2 className={styles.boxTitle}>半米小站</h2>
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
                <Button type="primary" htmlType="submit">
                  游客登录
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login