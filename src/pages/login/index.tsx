import React, {useEffect} from 'react';
import {Form, Button, Input, Row, Col, App} from 'antd';
import {LockFilled, UserOutlined} from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';
import {localStore} from 'utils';
import {reqUserLogin, reqTouristLogin} from 'src/services';
import {USER_INFO} from 'src/constants';
import './index.scss';

const FormItem = Form.Item;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const {modal, message} = App.useApp();
  const userInfo = localStore.get(USER_INFO);

  // 如果用户已经登陆，重定向到首页
  useEffect(() => {
    if (userInfo && userInfo.userName) {
      navigate('/');
    }
  }, []);

  // 登陆
  const onFinish = (values) => {
    // const encryptedPassword = crypto.encryptSHA256(values.password);
    const params = {
      username: values.username,
      // password: encryptedPassword
      password: values.password,
    };
    reqUserLogin(params)
      .then((res) => {
        const {data, msg} = res;
        message.success(msg);
        localStore.set(USER_INFO, data);
        navigate('/');
      })
      .catch((error) => {
        modal.error({
          title: error.title,
          content: error.message,
        });
      });
  };

  // 游客登陆
  const handleVisitorLogin = () => {
    const params = {
      name: 'visitor',
      password: 123456,
    };
    reqTouristLogin(params).then(() => {
      navigate('/');
    });
  };

  return (
    <div className="login">
      <div className="login-box">
        <h2>半米小站</h2>
        <Form onFinish={onFinish} autoComplete="off" size="large">
          <FormItem name="username" rules={[{required: true, message: 'Please input your username!'}]}>
            <Input prefix={<UserOutlined />} placeholder="用户名" />
          </FormItem>
          <FormItem name="password" rules={[{required: true, message: 'Please input your password!'}]}>
            <Input prefix={<LockFilled />} placeholder="密码" />
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
  );
};

export default Login;
