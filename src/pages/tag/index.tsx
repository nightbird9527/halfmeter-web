import React, {useState, useEffect} from 'react';
import {
  Space,
  Button,
  Form,
  Input,
  Row,
  Col,
  Divider,
  Tag,
  Modal,
  ColorPicker,
  theme,
  App,
  Select,
  DatePicker,
} from 'antd';
import type {Color} from 'antd/es/color-picker';
import {FlexoTable} from 'src/components';
import {reqFetchTagList, reqCreateTag, reqUpdateTag, reqDeleteTag} from 'src/services';
import dayjs from 'dayjs';
import './index.scss';

const FormItem = Form.Item;
const {Option} = Select;
const {RangePicker} = DatePicker;
const statusMap = {
  '0': '无效',
  '1': '有效',
};

const TagManage = () => {
  const [form] = Form.useForm();
  const {modal, message} = App.useApp();
  const {token} = theme.useToken();
  const [queryParams, setQueryParams] = useState({});
  const [dataSource, setDataSource] = useState([]);
  const [recordData, setRecordData] = useState({} as any);
  const [tagColor, setTagColor] = useState<Color | string>(token.colorPrimary);
  const [tableLoading, setTableLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [operateType, setOperateType] = useState('create');
  const [pageInfo, setPageInfo] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const columns: any = [
    {
      title: 'ID',
      dataIndex: 'tagId',
      align: 'center',
    },
    {
      title: '标题',
      dataIndex: 'title',
      align: 'center',
    },
    {
      title: '颜色',
      dataIndex: 'color',
      align: 'center',
    },
    {
      title: '标签',
      dataIndex: 'tag',
      align: 'center',
      render: (...args: any) => {
        return <Tag color={args[1].color}>{args[1].title}</Tag>;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      render: (text: any) => {
        let renderText = '';
        if (text && statusMap[text]) {
          renderText = statusMap[text];
        }
        return renderText;
      },
    },
    {
      title: '文章数量',
      dataIndex: 'articalCount',
      align: 'center',
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

  // 标签列表查询接口请求函数
  const fetchTagList = (payload: any) => {
    setTableLoading(true);
    const {values, pageNo, pageSize} = payload;
    const input = {
      title: values.title,
      status: values.status,
      startDate: values.startDate,
      endDate: values.endDate,
      pageNo,
      pageSize,
    };
    reqFetchTagList(input)
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
    fetchTagList(payload);
  }, []);

  // 查询
  const handleSubmit = () => {
    form.validateFields(['title', 'status', 'date']).then((values) => {
      if (values.date && values.date.length) {
        values.startDate = dayjs(values.date[0]).format('YYYYMMDD');
        values.endDate = dayjs(values.date[1]).format('YYYYMMDD');
        delete values.date;
      }
      const payload = {
        values,
        pageNo: 1,
        pageSize: 10,
      };
      fetchTagList(payload);
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
    fetchTagList(payload);
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
    setTagColor(record.color);
    setModalVisible(true);
  };

  useEffect(() => {
    if (modalVisible) {
      if (operateType === 'create') {
        form.setFieldsValue({
          title_modal: '',
          status_modal: '',
          color_modal: '',
        });
      }
      if (operateType === 'update') {
        form.setFieldsValue({
          title_modal: recordData.title,
          status_modal: recordData.status,
          color_modal: tagColor,
        });
      }
    } else {
      form.resetFields(['title_modal', 'status_modal', 'color_modal']);
      setTagColor(token.colorPrimary);
    }
  }, [modalVisible]);

  // 删除
  const handleDelete = (record: any) => {
    modal.confirm({
      title: '提示',
      content: '确认要删除该标签吗？',
      onOk: () => {
        const payload = {
          tagId: record.tagId,
        };
        reqDeleteTag(payload)
          .then((res) => {
            message.success(res.msg);
            const queryPayload = {
              values: {...queryParams},
              pageNo: pageInfo.current,
              pageSize: pageInfo.pageSize,
            };
            fetchTagList(queryPayload);
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

  // 颜色选择器Change
  const handleColorModalChange = (color: Color) => {
    setTagColor(color.toHexString());
    form.setFieldsValue({color_modal: color.toHexString()});
  };

  // Modal保存
  const handleModalSave = () => {
    const fieldNames = ['title_modal', 'status_modal'];
    form.validateFields(fieldNames).then((values) => {
      if (operateType === 'create') {
        const payload = {
          title: values.title_modal,
          status: values.status_modal,
          color: tagColor,
        };
        reqCreateTag(payload)
          .then((res) => {
            message.success(res.msg);
            closeModal();
            const queryPayload = {
              values: {...queryParams},
              pageNo: pageInfo.current,
              pageSize: pageInfo.pageSize,
            };
            fetchTagList(queryPayload);
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
          tagId: recordData.tagId,
          title: values.title_modal,
          status: values.status_modal,
          color: tagColor,
        };
        reqUpdateTag(payload)
          .then((res) => {
            message.success(res.msg);
            closeModal();
            const queryPayload = {
              values: {...queryParams},
              pageNo: pageInfo.current,
              pageSize: pageInfo.pageSize,
            };
            fetchTagList(queryPayload);
          })
          .catch((error) => {
            modal.error({
              title: error.title,
              content: error.message,
            });
          });
      }
    });
  };

  // 关闭Modal
  const closeModal = () => {
    setModalVisible(false);
  };

  // 标签状态Opts
  const statusOpts = Object.keys(statusMap).map((item) => {
    return (
      <Option key={item} value={item}>
        {statusMap[item]}
      </Option>
    );
  });

  return (
    <div className="tag">
      <Form form={form} onFinish={handleSubmit}>
        <Row>
          <Col span={8}>
            <FormItem name="title">
              <Input placeholder="标题" />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem name="status">
              <Select placeholder="状态">{statusOpts}</Select>
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem name="date">
              <RangePicker placeholder={['开始日期', '结束日期']} style={{width: '100%'}} />
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
            showText: '新建标签',
            type: 'primary',
            onClick: handleCreate,
          },
        }}
        bordered
        columns={columns}
        dataSource={dataSource}
        rowKey={(record: any) => record.tagId}
        loading={tableLoading}
        pagination={{
          ...pageInfo,
          onChange: handlePageChange,
        }}
      />
      {modalVisible && (
        <Modal
          open={modalVisible}
          title={operateType === 'create' ? '新建标签' : '编辑标签'}
          onCancel={closeModal}
          footer={null}
        >
          <div style={{padding: '20px'}}>
            <Form form={form}>
              <Row>
                <Col span={24}>
                  <FormItem name="title_modal" label="标题">
                    <Input />
                  </FormItem>
                  <FormItem name="status_modal" label="状态">
                    <Select>{statusOpts}</Select>
                  </FormItem>
                  <FormItem name="color_modal" label="颜色">
                    <ColorPicker showText trigger="hover" value={tagColor} onChange={handleColorModalChange} />
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

export default TagManage;
