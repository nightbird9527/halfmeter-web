import React from 'react';
import { Form, Button, Input, Row, Col } from 'antd';
import { LockFilled, UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { crypto, AxiosResponseData } from 'utils';
import { reqUserLogin, reqTouristLogin } from 'src/services'
import useStaticFuncStore from 'src/store'
import './index.scss';

const FormItem = Form.Item;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const message = useStaticFuncStore((state: any) => state.message);

  // 登陆
  const onFinish = (values) => {
    console.log(message);
    
    const encryptedPassword = crypto.encryptSHA256(values.password);
    const params = {
      nameOrEmail: values.nameOrEmail,
      password: encryptedPassword
    }
    reqUserLogin(params).then((res: AxiosResponseData) => {
      console.log(res);
      const {resDesc} = res;
      message.success(resDesc)
      navigate('/')
    })
    // request.post('/login', params).then((res: AxiosResponseData) => {
    //   console.log('status and data', res);
      
    //   const {resCode} = res;
    //   if (resCode === '0001') {
        
    //   }

    // }).catch(error => {
    //   console.log(error);
    // });
  }

  // 游客登陆
  const handleVisitorLogin = () => {
    navigate('/admin')
    // request.post('/touristLogin', {}).then(res => {
    //   console.log(res);
    // }).catch(error => {
    //   console.log(error);
    // });
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
            name='nameOrEmail'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder='用户名/邮箱' />
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