import React, {useState, useEffect} from 'react';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import {Space, Button, Form, Input, Row, Col, Divider, App, Select, Modal, Upload} from 'antd';
import type {UploadProps} from 'antd';
import {FlexoTable} from 'src/components';
import {reqFetchUserList, reqFetchUserDetailInfo, reqCreateUser, reqUpdateUser, reqDeleteUser} from 'src/services';

const FormItem = Form.Item;
const TextArea = Input.TextArea;
const {Option} = Select;
const statusMap = {
  active: '正常',
  inactive: '禁用',
};
const genderMap = {
  male: '男',
  female: '女',
  other: '保密',
};

const User = () => {
  const [form] = Form.useForm();
  const {modal, message} = App.useApp();
  const [queryParams, setQueryParams] = useState({});
  const [tableLoading, setTableLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [recordData, setRecordData] = useState({} as any);
  const [modalVisible, setModalVisible] = useState(false);
  const [operateType, setOperateType] = useState('create');
  const [editBtnLoading, setEditBtnLoading] = useState(false);
  const [userDetail, setUserDetail] = useState({} as any);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const columns: any = [
    {
      title: '用户ID',
      dataIndex: 'userId',
      align: 'center',
    },
    {
      title: '用户名',
      dataIndex: 'username',
      align: 'center',
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
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
      title: '角色',
      dataIndex: 'rolesInfo',
      align: 'center',
      render: (text: any) => {
        let renderContent = '';
        if (Array.isArray(text)) {
          const roleDescs = text.map((item) => item.roleDesc);
          renderContent = roleDescs.join(',');
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
      render: (text, record) => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              loading={editBtnLoading && record.userId === recordData.userId}
              onClick={() => {
                handleUpdate(record);
              }}
            >
              编辑
            </Button>
            <Button
              danger
              onClick={() => {
                handleDelete(record);
              }}
            >
              删除
            </Button>
          </Space>
        );
      },
    },
  ];

  // 用户列表查询接口请求函数
  const fetchUserList = (payload: any) => {
    setTableLoading(true);
    const {values, pageNo, pageSize} = payload;
    const input = {
      username: values.username,
      nickname: values.nickname,
      status: values.status,
      pageNo,
      pageSize,
    };
    reqFetchUserList(input)
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
    fetchUserList(payload);
  }, []);

  // 查询
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields(['userName', 'nickName', 'status']);
      const payload = {
        values,
        pageNo: 1,
        pageSize: 10,
      };
      fetchUserList(payload);
    } catch (error) {
      console.log('Form validation failed:', error);
    }
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
    fetchUserList(payload);
  };

  // 新建
  const handleCreate = () => {
    setOperateType('create');
    setModalVisible(true);
  };

  // 用户详细信息查询接口请求函数
  const fetchUserDetailInfo = async (payload) => {
    setEditBtnLoading(true);
    const {userId} = payload;
    const input = {userId};
    try {
      const res = await reqFetchUserDetailInfo(input);
      const {userInfo} = res.resOutput.data;
      console.log('user-detailInfo', userInfo);
      setUserDetail(userInfo);
      setModalVisible(true);
    } catch (error) {
      modal.error({
        title: error.title,
        content: error.message,
      });
    } finally {
      setEditBtnLoading(false);
    }
  };

  // 编辑
  const handleUpdate = async (record: any) => {
    try {
      setRecordData(record);
      setOperateType('update');
      const payload = {
        userId: record.userId,
      };
      await fetchUserDetailInfo(payload);
    } catch (error) {
      console.log('Error', error);
    }
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
          username_modal: userDetail.username,
          password_modal: userDetail.password,
          nickname_modal: userDetail.nickname,
          status_modal: userDetail.status,
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
      content: '确认要删除该用户吗？',
      onOk: () => {
        const payload = {
          roleId: record.roleId,
        };
        reqDeleteUser(payload)
          .then((res) => {
            message.success(res.msg);
            const queryPayload = {
              values: {...queryParams},
              pageNo: pageInfo.current,
              pageSize: pageInfo.pageSize,
            };
            fetchUserList(queryPayload);
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
          reqCreateUser(payload)
            .then((res) => {
              message.success(res.msg);
              closeModal();
              const queryPayload = {
                values: {...queryParams},
                pageNo: pageInfo.current,
                pageSize: pageInfo.pageSize,
              };
              fetchUserList(queryPayload);
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
          reqUpdateUser(payload)
            .then((res) => {
              message.success(res.msg);
              closeModal();
              const queryPayload = {
                values: {...queryParams},
                pageNo: pageInfo.current,
                pageSize: pageInfo.pageSize,
              };
              fetchUserList(queryPayload);
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

  // 用户状态options
  const statusOpts = Object.keys(statusMap).map((item) => {
    return (
      <Option key={item} value={item}>
        {statusMap[item]}
      </Option>
    );
  });

  // 用户性别options
  const genderOpts = Object.keys(genderMap).map((item) => {
    return (
      <Option key={item} value={item}>
        {genderMap[item]}
      </Option>
    );
  });

  const uploadProps: UploadProps = {
    name: 'userAvatar',
    listType: 'picture-card',
    showUploadList: false,
    beforeUpload: (file) => {
      // 上传前校验文件类型和文件大小
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
      }
      return isJpgOrPng && isLt2M;
    },
    onChange: (info) => {
      form.setFieldsValue({
        avatarFileList_modal: [...info.fileList],
      });
      if (info.file.status === 'uploading') {
        setAvatarLoading(true);
        return;
      }
      if (info.file.status === 'error') {
        message.error('File upload failed');
      }
      if (info.file.status === 'done') {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          setAvatarUrl(reader.result as string);
        });
        reader.readAsDataURL(info.file.originFileObj as Blob);
      }
      setAvatarLoading(false);
    },
  };

  return (
    <div className="user">
      <Form form={form} onFinish={handleSubmit}>
        <Row>
          <Col span={8}>
            <FormItem name="username">
              <Input placeholder="用户名" />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem name="nickname">
              <Input placeholder="昵称" />
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
            showText: '新建用户',
            type: 'primary',
            onClick: handleCreate,
          },
        }}
        bordered
        columns={columns}
        dataSource={dataSource}
        rowKey={(record: any) => record.userId}
        loading={tableLoading}
        pagination={{
          ...pageInfo,
          onChange: handlePageChange,
        }}
      />
      {modalVisible && (
        <Modal
          open={modalVisible}
          title={operateType === 'create' ? '新建用户' : '编辑用户信息'}
          onCancel={closeModal}
          footer={null}
          width={1200}
        >
          <div style={{padding: '20px'}}>
            <Form form={form} labelCol={{span: 6}} wrapperCol={{span: 16}}>
              <Row>
                <Col span={12}>
                  <FormItem
                    name="username_modal"
                    label="登录用户名"
                    rules={[{required: true, message: '请输入登录用户名'}]}
                  >
                    <Input />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem name="password_modal" label="密码" rules={[{required: true, message: '请输入密码'}]}>
                    <Input />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem name="nickname_modal" label="昵称" rules={[{required: true, message: '请输入昵称'}]}>
                    <Input />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem name="status_modal" label="状态">
                    <Select>{statusOpts}</Select>
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem name="realname_modal" label="姓名">
                    <Input />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem name="gender_modal" label="性别">
                    <Select>{genderOpts}</Select>
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem name="email_modal" label="邮箱" rules={[{required: true, message: '请输入邮箱'}]}>
                    <Input />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem name="phoneNumber_modal" label="手机号">
                    <Input />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem name="avatarFileList_modal" label="用户头像" valuePropName="fileList">
                    <Upload {...uploadProps}>
                      {avatarUrl ? (
                        <img src={avatarUrl} />
                      ) : (
                        <button style={{border: 0, background: 'none'}} type="button">
                          {avatarLoading ? <LoadingOutlined /> : <PlusOutlined />}
                          <div style={{marginTop: 8}}>Upload</div>
                        </button>
                      )}
                    </Upload>
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem name="notes_modal" label="备注" labelCol={{span: 3}} wrapperCol={{span: 20}}>
                    <TextArea autoSize={{minRows: 4}} />
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

export default User;
