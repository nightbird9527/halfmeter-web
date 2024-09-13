import React, {useState, useEffect, useRef} from 'react';
import {Space, Button, Form, Input, Row, Col, Divider, Modal, DatePicker, App, Select, Tag} from 'antd';
import {EditOutlined} from '@ant-design/icons';
import {FlexoTable} from 'src/components';
import dayjs from 'dayjs';
import TiptapEditor from 'src/components/tiptapEditor';
import {EventBus} from 'src/utils';
import {reqFetchTagList, reqFetchArticalList, reqCreateArtical, reqUpdateArtical, reqDeleteArtical} from 'src/services';
import './index.scss';

const FormItem = Form.Item;
const {RangePicker} = DatePicker;
const modalTitleMap = {
  create: '新建',
  update: '编辑',
};
// 文章状态
const statusMap = {
  '0': '未完成',
  '1': '已完成',
};

const ArticalManage = () => {
  const {message, modal} = App.useApp();
  const [form] = Form.useForm();
  const editorContentRef = useRef('');
  const editorIsEmptyRef = useRef('');
  const [tagList, setTagList] = useState([]);
  const [articalList, setArticalList] = useState([]);
  const [queryParams, setQueryParams] = useState({});
  const [recordData, setRecordData] = useState({} as any);
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
      dataIndex: 'articalId',
      align: 'center',
    },
    {
      title: '标题',
      dataIndex: 'title',
      align: 'center',
    },
    {
      title: '分类',
      dataIndex: 'tagsInfo',
      align: 'center',
      render: (text: any) => {
        return text.map((item) => (
          <Tag key={item.tagId} color={item.color}>
            {item.title}
          </Tag>
        ));
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      render: (text) => {
        let renderText = '';
        if (text && statusMap[text]) {
          renderText = statusMap[text];
        }
        return renderText;
      },
    },
    {
      title: '发布时间',
      dataIndex: 'createTime',
      align: 'center',
    },
    {
      title: '发布用户',
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
      width: '15%',
      render: (_, record) => {
        return (
          <Space size="small">
            {/* <Button type='link' onClick={() => { handleCheck(record) }}>查看</Button> */}
            <Button
              type="link"
              onClick={() => {
                handleUpdate(record);
              }}
            >
              编辑
            </Button>
            <Button
              type="link"
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

  // 标签列表查询接口请求函数
  const fetchTagList = () => {
    const input = {
      status: '1',
      pageNo: 1,
      pageSize: 100,
    };
    reqFetchTagList(input)
      .then((res: any) => {
        const {dataList} = res.resOutput.data;
        console.log('dataList-tags', dataList);
        setTagList(dataList || []);
      })
      .catch((error) => {
        modal.error({
          title: error.title,
          content: error.message,
        });
      });
  };

  // 文章列表查询接口请求函数
  const fetchArticalList = (payload) => {
    setTableLoading(true);
    const {values, pageNo, pageSize} = payload;
    const input = {
      title: values.title,
      category: values.category,
      status: values.status,
      startDate: values.startDate,
      endDate: values.endDate,
      pageNo,
      pageSize,
    };
    reqFetchArticalList(input)
      .then((res: any) => {
        const {total, dataList} = res.resOutput.data;
        console.log('dataList-articals', dataList);
        setQueryParams({...values});
        setPageInfo({current: pageNo, pageSize, total});
        setArticalList(dataList || []);
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
    fetchTagList();
    const payload = {
      values: {},
      pageNo: 1,
      pageSize: 10,
    };
    fetchArticalList(payload);
  }, []);

  // 查询
  const handleSubmit = () => {
    form.validateFields(['title', 'category', 'status', 'date']).then((values) => {
      console.log('submit-values', values);
      if (values.date && values.date.length) {
        values.startDate = dayjs(values.date[0]).format('YYYYMMDD');
        values.endDate = dayjs(values.date[1]).format('YYYYMMDD');
        delete values.date;
      }
      if (values.category && values.category.length) {
        values.category = values.category.join(',');
      }
      const payload = {
        values,
        pageNo: 1,
        pageSize: 10,
      };
      fetchArticalList(payload);
    });
  };

  // 重置
  const handleReset = () => {
    form.resetFields();
  };

  // 新建
  const handleCreate = () => {
    editorContentRef.current = '';
    setOperateType('create');
    setModalVisible(true);
  };

  // 编辑
  const handleUpdate = (record) => {
    editorContentRef.current = record.content;
    setOperateType('update');
    setRecordData(record);
    setModalVisible(true);
  };

  useEffect(() => {
    if (modalVisible) {
      if (operateType === 'create') {
        form.setFieldsValue({
          title_modal: '',
          category_modal: [],
          status_modal: '',
        });
      }
      if (operateType === 'update') {
        form.setFieldsValue({
          title_modal: recordData.title,
          category_modal: recordData.tagsInfo.map((item) => item.tagId),
          status_modal: recordData.status,
        });
      }
    } else {
      form.resetFields(['title_modal', 'category_modal', 'status_modal']);
    }
  }, [modalVisible]);

  // 删除
  const handleDelete = (record) => {
    modal.confirm({
      title: '提示',
      content: '确认要删除该文章吗？',
      onOk: () => {
        const payload = {
          articalId: record.articalId,
        };
        reqDeleteArtical(payload)
          .then((res: any) => {
            const {resOutput} = res;
            message.success(resOutput.msg);
            const queryPayload = {
              values: {...queryParams},
              pageNo: pageInfo.current,
              pageSize: pageInfo.pageSize,
            };
            fetchArticalList(queryPayload);
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
    fetchArticalList(payload);
  };

  // Modal保存
  const handleModalFinish = () => {
    form.validateFields(['title_modal', 'category_modal', 'status_modal']).then((values) => {
      EventBus.publish('tiptapFinish');
      const editorIsEmpty = editorIsEmptyRef.current;
      const editorContent = editorContentRef.current;
      if (editorIsEmpty) {
        return message.warning('请编辑文章内容');
      }
      console.log('modal-values', values);
      if (operateType === 'create') {
        const input = {
          title: values.title_modal,
          category: values.category_modal,
          status: values.status_modal,
          content: editorContent,
        };
        reqCreateArtical(input)
          .then((res: any) => {
            const {resOutput} = res;
            message.success(resOutput.msg);
            closeModal();
            const queryPayload = {
              values: {...queryParams},
              pageNo: pageInfo.current,
              pageSize: pageInfo.pageSize,
            };
            fetchArticalList(queryPayload);
          })
          .catch((error) => {
            modal.error({
              title: error.title,
              content: error.message,
            });
          });
      }
      if (operateType === 'update') {
        const input = {
          articalId: recordData.articalId,
          title: values.title_modal,
          category: values.category_modal,
          status: values.status_modal,
          content: editorContent,
        };
        reqUpdateArtical(input)
          .then((res: any) => {
            const {resOutput} = res;
            message.success(resOutput.msg);
            closeModal();
            const queryPayload = {
              values: {...queryParams},
              pageNo: pageInfo.current,
              pageSize: pageInfo.pageSize,
            };
            fetchArticalList(queryPayload);
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

  const tagOpts = tagList.map((item: any) => {
    return {
      value: item.tagId,
      label: <Tag color={item.color}>{item.title}</Tag>,
    };
  });
  const statusOpts = Object.keys(statusMap).map((item) => {
    return {value: item, label: statusMap[item]};
  });

  return (
    <div className="artical">
      <Form form={form} onFinish={handleSubmit}>
        <Row>
          <Col span={8}>
            <FormItem name="title">
              <Input placeholder="标题" />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem name="category">
              <Select placeholder="分类" options={tagOpts} mode="multiple" />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem name="status">
              <Select placeholder="状态" options={statusOpts} />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem name="date">
              <RangePicker style={{width: '100%'}} />
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
      <Divider orientation="center">🧡🧡🧡</Divider>
      <FlexoTable
        flexoConfig={{
          upperButtons: {
            showText: '写文章',
            type: 'primary',
            icon: <EditOutlined />,
            onClick: handleCreate,
          },
        }}
        bordered
        columns={columns}
        dataSource={articalList}
        rowKey={(record: any) => record.articalId}
        loading={tableLoading}
        pagination={{
          ...pageInfo,
          onChange: handlePageChange,
        }}
      />
      {modalVisible && (
        <Modal
          width={1400}
          open={modalVisible}
          title={modalTitleMap[operateType]}
          destroyOnClose={true}
          footer={null}
          maskClosable={false}
          onCancel={closeModal}
        >
          <div style={{padding: '20px'}}>
            <Form form={form} preserve={false} onFinish={handleModalFinish}>
              <Row>
                <Col span={8}>
                  <FormItem name="title_modal" rules={[{required: true, message: '请输入标题'}]}>
                    <Input placeholder="标题" />
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem name="category_modal" rules={[{required: true, message: '请选择分类'}]}>
                    <Select placeholder="分类" options={tagOpts} mode="multiple" />
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem name="status_modal" rules={[{required: true, message: '请选择状态'}]}>
                    <Select placeholder="状态" options={statusOpts} />
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <TiptapEditor editorIsEmptyRef={editorIsEmptyRef} editorContentRef={editorContentRef} />
              </Row>
              <Row justify="center">
                <Space>
                  <Button type="primary" htmlType="submit">
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

export default ArticalManage;
