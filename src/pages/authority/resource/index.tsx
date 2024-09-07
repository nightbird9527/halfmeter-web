import React, {useState} from 'react';
import {Form, Row, Col, Space, Button, Divider, Select, Input, Table} from 'antd';
import {FlexoTable} from '@/components';

const FormItem = Form.Item;

const Resource = () => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      name: 'John Brown',
      age: 32,
      sex: '男',
    },
  ]);
  const [tableLoading, setTableLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const columns: any = [
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      align: 'center',
    },
    {
      title: 'Sex',
      dataIndex: 'sex',
      align: 'center',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      align: 'center',
    },
  ];

  const handleSubmit = () => {
    console.log('submit');
  };

  const handleReset = () => {
    console.log('reset');
  };

  const handleCreate = () => {
    console.log('create');
  };

  return (
    <div>
      <Form form={form} onFinish={handleSubmit}>
        <Row>
          <Col span={8}>
            <FormItem name="roleName">
              <Input placeholder="角色名称" />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem name="description">
              <Input placeholder="描述" />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Space>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button onClick={handleReset}>重置</Button>
            </Space>
          </Col>
        </Row>
      </Form>
      <Divider orientation="center">💙💙💙</Divider>
      <FlexoTable
        flexoConfig={{
          upperButtons: {
            showText: '新增',
            type: 'primary',
            onClick: handleCreate,
          },
        }}
        bordered
        columns={columns}
        dataSource={dataSource}
        rowKey={(record: any) => record.id}
        loading={tableLoading}
        onChange={() => {
          console.log('Page Changed');
        }}
      />
    </div>
  );
};

export default Resource;
