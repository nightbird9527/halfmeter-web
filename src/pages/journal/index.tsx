import React, { useState } from 'react';
import { Table, Space, Button, Form, Input, Row, Col, Divider, Pagination, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import './index.scss'

const FormItem = Form.Item;
const { TextArea } = Input;
const modalTitleMap = {
	'create': '新建',
	'update': '编辑'
}
interface IJournalDataItem {
	id: string,
	content: string,
	createTime: string,
	updateTime: string,
	createUser: string,
}

const JournalManage = () => {
	const [form] = Form.useForm()
	const [selectedKeys, setSelectedKeys] = useState([]);
	const [dataSource, setDataSource] = useState([]);
	const [recordData, setRecordData] = useState({});
	const [loading, setLoading] = useState(false);
	const [pageInfo, setPageInfo] = useState({
		current: 1,
		pageSize: 10,
		total: 0,
	});
	const [modalVisible, setModalVisible] = useState(false);
	const [operateType, setOperateType] = useState('create');

	const columns: ColumnsType<IJournalDataItem> = [
		{
			title: 'ID',
			dataIndex: 'id',
		},
		{
			title: '内容',
			dataIndex: 'content',
			ellipsis: true
		},
		{
			title: '发布时间',
			dataIndex: 'createTime',
		},
		{
			title: '发布用户',
			dataIndex: 'createUser',
		},
		{
			title: '更新时间',
			dataIndex: 'updateTime',
		},
		{
			title: '更新用户',
			dataIndex: 'updateUser',
		},
		{
			title: '操作',
			dataIndex: 'operation',
			align: 'center',
			render: (text, record) => (
				<Space size="middle">
					<Button type='primary' onClick={() => { handleUpdate(record) }}>编辑</Button>
					<Button danger onClick={() => { handleDelete(record) }}>删除</Button>
				</Space>
			),
		},
	];

	// 查询
	const handleSubmit = (values) => {
		console.log(values);
	}

	// 重置
	const handleReset = () => {
		form.resetFields();
	}

	// 新建
	const handleCreate = (record) => {
		console.log(record);
		setModalVisible(true);
	}

	// 编辑
	const handleUpdate = (record) => {
		console.log(record);
		setRecordData(record);
	}

	// 删除
	const handleDelete = (record) => {
		console.log(record);
	}

	// Table-rowSelection
	const rowSelection = {
		selectedRowKeys: selectedKeys,
		onChange: (selectedKeys) => {
			setSelectedKeys(selectedKeys);
		}
	}

	// Pagination-onChange
	const handlePageChange = (page, pageSize) => {
		console.log(page, pageSize);
	}

	// Modal提交
	const handleModalFinish = (values) => {
		console.log(values);
	}

	// 关闭Modal
	const closeModal = () => {
		if (form.getFieldValue('contentModal')) {
			const handleSaveAndClose = () => { }
			const handleDestroy = () => {
				modal.destroy();
			}
			const handleJustClose = () => {
				modal.destroy();
				setModalVisible(false)
			}
			const modal = Modal.confirm({
				title: '提示',
				content: '直接关闭的话内容将不会被保存，确认要继续吗?',
				footer: (
					<Row justify='center' style={{ marginTop: '10px' }}>
						<Space>
							<Button type='primary' onClick={handleSaveAndClose}>保存并关闭</Button>
							<Button onClick={handleDestroy}>取消</Button>
							<Button danger onClick={handleJustClose}>确定</Button>
						</Space>
					</Row>
				)
			})
			return
		}
		setModalVisible(false)
	}

	return (
		<div className="journal">
			<div className='journal-form'>
				<Form form={form} onFinish={handleSubmit}>
					<Row>
						<Col span={8}>
							<FormItem name='title'><Input placeholder='标题' /></FormItem>
						</Col>
						<Col span={8}>
							<FormItem name='content'><Input placeholder='内容' /></FormItem>
						</Col>
						<Col span={8}>
							<FormItem name='date'><Input placeholder='日期' /></FormItem>
						</Col>
					</Row>
					<Row>
						<Col span={8}>
							<Space>
								<Button type='primary' htmlType='submit'>查询</Button>
								<Button onClick={handleReset}>重置</Button>
							</Space>
						</Col>
					</Row>
				</Form>
			</div>
			<Divider orientation='center'>🧡🧡🧡</Divider>
			<div className="journal-operatebar">
				<Button type='primary' onClick={handleCreate}>新建日志</Button>
			</div>
			<div className="journal-table">
				<Table
					bordered
					columns={columns}
					dataSource={dataSource}
					rowKey={record => record.id}
					rowSelection={rowSelection}
					pagination={false}
					loading={loading}
				/>
			</div>
			<div className="journal-pagination">
				<Pagination
					{...pageInfo}
					onChange={handlePageChange}
					showTotal={total => `共${total}条`}
					showSizeChanger={true}
					pageSizeOptions={[10, 20, 30, 40, 50]}
				/>
			</div>
			{
				modalVisible && <Modal open={modalVisible} title={modalTitleMap[operateType]} footer={null} maskClosable={false} onCancel={closeModal}>
					<Form form={form} onFinish={handleModalFinish}>
						<Row>
							<Col span={24}>
								<FormItem name='contentModal'>
									<TextArea autoSize={{ minRows: 6 }} maxLength={500} showCount={true} placeholder='请输入内容...' />
								</FormItem>
							</Col>
						</Row>
						<Row justify='center'>
							<Space>
								<Button type='primary' htmlType='submit'>保存</Button>
								<Button onClick={closeModal}>取消</Button>
							</Space>
						</Row>
					</Form>
				</Modal>
			}
		</div>
	)
}

export default JournalManage;