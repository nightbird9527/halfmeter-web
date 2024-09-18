import React, {useEffect, useState, useRef} from 'react';
import {Form, Row, Col, Space, Button, Divider, Select, Input, App, Modal, Cascader} from 'antd';
import {FlexoTable} from '@/components';
import {
  reqFetchResourceList,
  reqFetchResourceTree,
  reqCreateResource,
  reqUpdateResource,
  reqDeleteResource,
} from '@/services';

const FormItem = Form.Item;
const {Option} = Select;
const resourceTypeMap = new Map([
  ['menu', '菜单'],
  ['button', '按钮'],
]);
const resourceStatusMap = new Map([
  ['active', '正常'],
  ['inactive', '禁用'],
]);

const Resource = () => {
  const [form] = Form.useForm();
  const {modal, message} = App.useApp();

  const [dataSource, setDataSource] = useState([]);

  const columns: any = [
    {
      title: 'ID',
      dataIndex: 'resourceId',
      align: 'center',
    },
    {
      title: '资源名称',
      dataIndex: 'resourceName',
      align: 'center',
    },
    {
      title: '资源类型',
      dataIndex: 'resourceType',
      align: 'center',
      render: (text: any) => {
        let renderContent = '';
        if (text && resourceTypeMap.get(text)) {
          renderContent = resourceTypeMap.get(text) || '';
        }
        return renderContent;
      },
    },
    {
      title: 'URI',
      dataIndex: 'resourceURI',
    },
    {
      title: '上级资源',
      dataIndex: 'parentResourceName',
      align: 'center',
    },
    {
      title: '资源图标',
      dataIndex: 'resourceIcon',
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'resourceStatus',
      align: 'center',
      render: (text: any) => {
        let renderContent = '';
        if (text && resourceStatusMap.get(text)) {
          renderContent = resourceStatusMap.get(text) || '';
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
      title: '创建用户',
      dataIndex: 'createUser',
      align: 'center',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      align: 'center',
    },
    {
      title: '更新用户',
      dataIndex: 'updateUser',
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      align: 'center',
      fixed: 'right',
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

  // #region 获取菜单树
  const parentResourceOpts = useRef<any>([]);
  const convertTreeToOptions = (tree: any) => {
    return tree.map((item: any) => {
      const {children} = item;
      return {
        value: item.resourceId,
        label: item.resourceName,
        children: children && children.length > 0 ? convertTreeToOptions(children) : [],
      };
    });
  };
  const fetchMenuTree = async (payload: any) => {
    try {
      const res = await reqFetchResourceTree(payload);
      parentResourceOpts.current = convertTreeToOptions(res.data || []);
    } catch (error) {
      modal.error({
        title: error.title,
        content: error.message,
      });
    }
  };
  useEffect(() => {
    const payload = {
      resourceType: 'menu',
    };
    fetchMenuTree(payload);
  }, []);
  // #endregion

  // #region 获取资源列表
  const [tableLoading, setTableLoading] = useState(false);
  const [queryParams, setQueryParams] = useState({});
  const fetchResourceList = async (payload: any) => {
    setTableLoading(true);
    const {values, pageNo, pageSize} = payload;
    const input = {
      resourceName: values.resourceName,
      resourceType: values.resourceType,
      parentResourceId: values.parentResourceId,
      pageNo,
      pageSize,
    };
    if (input.parentResourceId) {
      input.parentResourceId = input.parentResourceId[input.parentResourceId.length - 1];
    }
    try {
      const res = await reqFetchResourceList(input);
      const {total, rows} = res.data;
      setQueryParams({...values});
      setPageInfo({current: pageNo, pageSize, total});
      setDataSource(rows || []);
    } catch (error) {
      modal.error({
        title: error.title,
        content: error.message,
      });
    } finally {
      setTableLoading(false);
    }
  };
  useEffect(() => {
    const payload = {
      values: {},
      pageNo: 1,
      pageSize: 10,
    };
    fetchResourceList(payload);
  }, []);
  // #endregion

  // #region 查询按钮 & 重置按钮
  const handleSubmit = () => {
    form.validateFields(['resourceName', 'resourceType', 'parentResourceId']).then((values) => {
      const payload = {
        values,
        pageNo: 1,
        pageSize: 10,
      };
      fetchResourceList(payload);
    });
  };
  const handleReset = () => {
    form.resetFields();
  };
  // #endregion

  // #region 分页
  const [pageInfo, setPageInfo] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const handleTableChange = (pagination) => {
    if (pagination.pageSize !== pageInfo.pageSize) {
      pagination.current = 1;
    }
    const payload = {
      values: {...queryParams},
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
    };
    fetchResourceList(payload);
  };
  // #endregion

  // #region 新建 & 编辑
  const [recordData, setRecordData] = useState({} as any);
  const [modalVisible, setModalVisible] = useState(false);
  const [operateType, setOperateType] = useState('create');
  const handleCreate = () => {
    setOperateType('create');
    setModalVisible(true);
  };
  const handleUpdate = (record: any) => {
    setRecordData(record);
    setOperateType('update');
    setModalVisible(true);
  };
  useEffect(() => {
    if (modalVisible) {
      if (operateType === 'create') {
        form.setFieldsValue({
          resourceName_modal: '',
          resourceType_modal: '',
          resourceURI_modal: '',
          parentResourceId_modal: '',
          resourceIcon_modal: '',
          resourceStatus_modal: '',
        });
      }
      if (operateType === 'update') {
        form.setFieldsValue({
          resourceName_modal: recordData.resourceName,
          resourceType_modal: recordData.resourceType,
          resourceURI_modal: recordData.resourceURI,
          parentResourceId_modal: recordData.parentResourceId,
          resourceIcon_modal: recordData.resourceIcon,
          resourceStatus_modal: recordData.resourceStatus,
        });
      }
    } else {
      form.resetFields(['title_modal', 'status_modal', 'color_modal']);
    }
  }, [modalVisible]);
  const closeModal = () => {
    setModalVisible(false);
  };
  const handleModalSave = () => {
    const fieldNames = [
      'resourceName_modal',
      'resourceType_modal',
      'resourceURI_modal',
      'parentResourceId_modal',
      'resourceIcon_modal',
      'resourceStatus_modal',
    ];
    form
      .validateFields(fieldNames)
      .then((values) => {
        if (operateType === 'create') {
          const payload = {
            resourceName: values.resourceName_modal,
            resourceType: values.resourceType_modal,
            resourceURI: values.resourceURI_modal,
            parentResourceId: values.parentResourceId_modal,
            resourceIcon: values.resourceIcon_modal,
            resourceStatus: values.resourceStatus_modal,
          };
          if (payload.parentResourceId) {
            payload.parentResourceId = payload.parentResourceId[payload.parentResourceId.length - 1];
          }
          reqCreateResource(payload)
            .then((res) => {
              message.success(res.msg);
              closeModal();
              const queryPayload = {
                values: {...queryParams},
                pageNo: pageInfo.current,
                pageSize: pageInfo.pageSize,
              };
              fetchResourceList(queryPayload);
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
            resourceId: recordData.resourceId,
            resourceName: values.resourceName_modal,
            resourceType: values.resourceType_modal,
            resourceURI: values.resourceURI_modal,
            parentResourceId: values.parentResourceId_modal,
            resourceIcon: values.resourceIcon_modal,
            resourceStatus: values.resourceStatus_modal,
          };
          if (payload.parentResourceId) {
            payload.parentResourceId = payload.parentResourceId[payload.parentResourceId.length - 1];
          }
          reqUpdateResource(payload)
            .then((res) => {
              message.success(res.msg);
              closeModal();
              const queryPayload = {
                values: {...queryParams},
                pageNo: pageInfo.current,
                pageSize: pageInfo.pageSize,
              };
              fetchResourceList(queryPayload);
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
        message.error(error.message);
      });
  };
  // #endregion

  const handleDelete = (record: any) => {
    modal.confirm({
      title: '提示',
      content: '确认要删除该资源吗？',
      onOk: () => {
        const payload = {
          roleId: record.roleId,
        };
        reqDeleteResource(payload)
          .then((res) => {
            message.success(res.msg);
            const queryPayload = {
              values: {...queryParams},
              pageNo: pageInfo.current,
              pageSize: pageInfo.pageSize,
            };
            fetchResourceList(queryPayload);
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

  const resourceTypeOpts = Array.from(resourceTypeMap.keys()).map((item) => {
    return (
      <Option key={item} value={item}>
        {resourceTypeMap.get(item)}
      </Option>
    );
  });
  const resourceStatusOpts = Array.from(resourceStatusMap.keys()).map((item) => {
    return (
      <Option key={item} value={item}>
        {resourceStatusMap.get(item)}
      </Option>
    );
  });
  return (
    <div style={{width: '100%'}}>
      <Form form={form} onFinish={handleSubmit}>
        <Row>
          <Col span={8}>
            <FormItem name="resourceName">
              <Input placeholder="资源名称" />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem name="resourceType">
              <Select placeholder="资源类型" allowClear>
                {resourceTypeOpts}
              </Select>
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem name="parentResourceId">
              <Cascader placeholder="上级资源" options={parentResourceOpts.current} changeOnSelect />
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
          downloadConf: {
            url: '/api/download',
            filename: 'resource.xlsx',
          },
        }}
        bordered
        columns={columns}
        dataSource={dataSource}
        rowKey={(record: any) => record.resourceId}
        loading={tableLoading}
        pagination={{...pageInfo}}
        onChange={handleTableChange}
      />
      {modalVisible && (
        <Modal
          title={operateType === 'create' ? '新建资源' : '编辑资源'}
          open={modalVisible}
          onCancel={closeModal}
          footer={null}
          width={600}
        >
          <div style={{padding: '20px'}}>
            <Form form={form} labelCol={{span: 4}} wrapperCol={{span: 18}}>
              <Row>
                <Col span={24}>
                  <FormItem
                    name="resourceName_modal"
                    label="资源名称"
                    rules={[{required: true, message: '请输入资源名称'}]}
                  >
                    <Input />
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem
                    name="resourceType_modal"
                    label="资源类型"
                    rules={[{required: true, message: '请选择资源类型'}]}
                  >
                    <Select>{resourceTypeOpts}</Select>
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem name="resourceURI_modal" label="URI" rules={[{required: true, message: '请输入URI'}]}>
                    <Input />
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem name="parentResourceId_modal" label="上级资源">
                    <Cascader placeholder="上级资源" options={parentResourceOpts.current} changeOnSelect />
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem name="resourceIcon_modal" label="资源图标">
                    <Input />
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem name="resourceStatus_modal" label="状态">
                    <Select>{resourceStatusOpts}</Select>
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

export default Resource;
