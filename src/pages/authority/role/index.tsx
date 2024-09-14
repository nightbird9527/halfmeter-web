import React, {useState, useEffect} from 'react';
import {Space, Button, Form, Input, Select, Row, Col, Divider, Modal, App} from 'antd';
import {FlexoTable} from 'src/components';
import {reqFetchRoleList, reqCreateRole, reqUpdateRole, reqDeleteRole} from 'src/services';
import './index.scss';

const FormItem = Form.Item;
const {Option} = Select;
const statusMap = {
  active: '正常',
  inactive: '禁用',
};

const RoleManage = () => {
  const [form] = Form.useForm();
  const {modal, message} = App.useApp();
  const [queryParams, setQueryParams] = useState({});
  const [tableLoading, setTableLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [recordData, setRecordData] = useState({} as any);
  const [modalVisible, setModalVisible] = useState(false);
  const [operateType, setOperateType] = useState('create');
  const [pageInfo, setPageInfo] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const columns: any = [
    {
      title: '角色ID',
      dataIndex: 'roleId',
      align: 'center',
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
      align: 'center',
    },
    {
      title: '描述',
      dataIndex: 'description',
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      render: (text: any) => {
        let renderContent = '';
        if (text && statusMap[text]) {
          renderContent = statusMap[text];
        }
        return renderContent;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      align: 'center',
      render: (...args) => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              onClick={() => {
                handleUpdate(args[1]);
              }}
            >
              编辑
            </Button>
            <Button
              danger
              onClick={() => {
                handleDelete(args[1]);
              }}
            >
              删除
            </Button>
          </Space>
        );
      },
    },
  ];

  // 角色列表查询接口请求函数
  const fetchRoleList = (payload: any) => {
    setTableLoading(true);
    const {values, pageNo, pageSize} = payload;
    const input = {
      roleName: values.roleName,
      description: values.description,
      status: values.status,
      pageNo,
      pageSize,
    };
    reqFetchRoleList(input)
      .then((res) => {
        const {total, rows} = res.data;
        setQueryParams({...values});
        setPageInfo({current: pageNo, pageSize, total});
        setDataSource(rows || []);
      })
      .catch((error) => {
        modal.error({
          title: error.title,
          content: error.message,
        });
      })
      .finally(() => {
        setTableLoading(false);
      });
  };

  useEffect(() => {
    const payload = {
      values: {},
      pageNo: 1,
      pageSize: 10,
    };
    fetchRoleList(payload);
  }, []);

  // 查询
  const handleSubmit = () => {
    form.validateFields(['roleName', 'description', 'status']).then((values) => {
      const payload = {
        values,
        pageNo: 1,
        pageSize: 10,
      };
      fetchRoleList(payload);
    });
  };

  // 重置
  const handleReset = () => {
    form.resetFields();
  };

  // 翻页
  const handlePageChange = (pageNo, pageSize) => {
    if (pageSize !== pageInfo.pageSize) {
      pageNo = 1;
    }
    const payload = {
      values: {...queryParams},
      pageNo,
      pageSize,
    };
    fetchRoleList(payload);
  };

  // 新建
  const handleCreate = () => {
    setOperateType('create');
    setModalVisible(true);
  };

  // 编辑
  const handleUpdate = (record: any) => {
    setRecordData(record);
    setOperateType('update');
    setModalVisible(true);
  };

  useEffect(() => {
    if (modalVisible) {
      if (operateType === 'create') {
        form.setFieldsValue({
          roleName_modal: '',
          description_modal: '',
          status_modal: '',
        });
      }
      if (operateType === 'update') {
        form.setFieldsValue({
          roleName_modal: recordData.roleName,
          description_modal: recordData.description,
          status_modal: recordData.status,
        });
      }
    } else {
      form.resetFields(['title_modal', 'status_modal', 'color_modal']);
    }
  }, [modalVisible]);

  // 删除
  const handleDelete = (record: any) => {
    modal.confirm({
      title: '提示',
      content: '确认要删除该角色吗？',
      onOk: () => {
        const payload = {
          roleId: record.roleId,
        };
        reqDeleteRole(payload)
          .then((res) => {
            message.success(res.msg);
            const queryPayload = {
              values: {...queryParams},
              pageNo: pageInfo.current,
              pageSize: pageInfo.pageSize,
            };
            fetchRoleList(queryPayload);
          })
          .catch((error) => {
            modal.error({
              title: error.title,
              content: error.message,
            });
          });
      },
    });
  };

  // Modal保存
  const handleModalSave = () => {
    const fieldNames = ['roleName_modal', 'description_modal', 'status_modal'];
    form
      .validateFields(fieldNames)
      .then((values) => {
        if (operateType === 'create') {
          const payload = {
            roleName: values.roleName_modal,
            description: values.description_modal,
            status: values.status_modal,
          };
          reqCreateRole(payload)
            .then((res) => {
              message.success(res.msg);
              closeModal();
              const queryPayload = {
                values: {...queryParams},
                pageNo: pageInfo.current,
                pageSize: pageInfo.pageSize,
              };
              fetchRoleList(queryPayload);
            })
            .catch((error) => {
              modal.error({
                title: error.title,
                content: error.message,
              });
            });
        }
        if (operateType === 'update') {
          const payload = {
            roleId: recordData.roleId,
            roleName: values.roleName_modal,
            description: values.description_modal,
            status: values.status_modal,
          };
          reqUpdateRole(payload)
            .then((res) => {
              message.success(res.msg);
              closeModal();
              const queryPayload = {
                values: {...queryParams},
                pageNo: pageInfo.current,
                pageSize: pageInfo.pageSize,
              };
              fetchRoleList(queryPayload);
            })
            .catch((error) => {
              modal.error({
                title: error.title,
                content: error.message,
              });
            });
        }
      })
      .catch((error) => {
        console.log('validateFailed:', error);
      });
  };

  // 关闭Modal
  const closeModal = () => {
    setModalVisible(false);
  };

  // 角色状态opts
  const statusOpts = Object.keys(statusMap).map((item) => {
    return (
      <Option key={item} value={item}>
        {statusMap[item]}
      </Option>
    );
  });

  return (
    <div className="role">
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
          <Col span={8}>
            <FormItem name="status">
              <Select placeholder="状态">{statusOpts}</Select>
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
            showText: '新建角色',
            type: 'primary',
            onClick: handleCreate,
          },
        }}
        bordered
        columns={columns}
        dataSource={dataSource}
        rowKey={(record: any) => record.roleId}
        loading={tableLoading}
        pagination={{
          ...pageInfo,
          onChange: handlePageChange,
        }}
      />
      {modalVisible && (
        <Modal
          open={modalVisible}
          title={operateType === 'create' ? '新建角色' : '编辑角色'}
          onCancel={closeModal}
          footer={null}
          width={600}
        >
          <div style={{padding: '20px'}}>
            <Form form={form} labelCol={{span: 4}} wrapperCol={{span: 18}}>
              <Row>
                <Col span={24}>
                  <FormItem
                    name="roleName_modal"
                    label="角色名称"
                    rules={[{required: true, message: '请输入角色名称'}]}
                  >
                    <Input />
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem name="description_modal" label="描述">
                    <Input />
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem name="status_modal" label="状态">
                    <Select>{statusOpts}</Select>
                  </FormItem>
                </Col>
              </Row>
              <Row justify="center">
                <Space>
                  <Button type="primary" onClick={handleModalSave}>
                    保存
                  </Button>
                  <Button onClick={closeModal}>取消</Button>
                </Space>
              </Row>
            </Form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default RoleManage;
