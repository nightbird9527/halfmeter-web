import React, { useState } from 'react';
import { Space, Button, Form, Input, Row, Col, Divider, Pagination, Tag, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { MaxTable } from 'src/components'
import {reqCreateTag, reqUpdateTag} from 'src/services'
import './index.scss'

const FormItem = Form.Item;
interface ITagDataItem {
	id: string,
	title: string,
	color: string,
	tag: string,
	status: string,
	articalCount: string,
	createTime: string,
	createUser: string,
	updateTime: string,
	updateUser: string,
}

const TagManage = () => {
	const [form] = Form.useForm()
	const [selectedKeys, setSelectedKeys] = useState([]);
	const [dataSource, setDataSource] = useState([]);
	const [recordData, setRecordData] = useState({});
	const [loading, setLoading] = useState(false);
	const [modalVisible, setModalVisible] = useState(false)
	const [modalType, setModalType] = useState('create')
	const [pageInfo, setPageInfo] = useState({
		current: 1,
		pageSize: 10,
		total: 0,
	});

	const columns: ColumnsType<ITagDataItem> = [
		{
			title: 'ID',
			dataIndex: 'id',
			align: 'center',
		},
		{
			title: '标题',
			dataIndex: 'title',
			align: 'center'
		},
		{
			title: '颜色',
			dataIndex: 'color',
			align: 'center'
		},
		{
			title: '标签',
			dataIndex: 'tag',
			align: 'center',
			render: (...args) => {
				return <Tag color={args[1].color}>{args[1].title}</Tag>
			}
		},
		{
			title: '状态',
			dataIndex: 'status',
			align: 'center',
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
		},
		{
			title: '更新时间',
			dataIndex: 'updateTime',
			align: 'center',
		},
		{
			title: '更新用户',
			dataIndex: 'updateUser',
		},
		{
			title: '操作',
			dataIndex: 'operation',
			align: 'center',
			render: (...args) => {
				return (
					<Space size="middle">
						<Button type='primary' onClick={() => { handleUpdate(args[1]) }}>编辑</Button>
						<Button danger onClick={() => { handleDelete(args[1]) }}>删除</Button>
					</Space>
				)
			}
		}
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
	const handleCreate = () => {
		setModalType('create')
		setModalVisible(true)
		
	}

	// 编辑
	const handleUpdate = (record) => {
		console.log(record);
		setModalType('update')
		setModalVisible(true)
	}

	// Modal保存
	const handleModalSave = () => {
		const fieldNames = ['title_modal', 'color_modal', 'status_modal']
		form.validateFields(fieldNames).then(values => {
			console.log('values', values);
			const input = {
				title: 'hhh',
				age: '10'
			}
			reqCreateTag(input)
		})
	}

	// 关闭Modal
	const closeModal = () => {
		setModalVisible(false)
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

	const tableBar = (
		<div className='tag-table-bar'>
			<div className='tag-table-bar-container'>
				<Button type='primary' onClick={handleCreate}>新建标签</Button>
			</div>
		</div>
	)

	return (
		<div className='tag'>
			<div className='tag-form'>
				<Form form={form} onFinish={handleSubmit}>
					<Row>
						<Col span={8}>
							<FormItem name='title'><Input placeholder='标题' /></FormItem>
						</Col>
						<Col span={8}>
							<FormItem name='status'><Input placeholder='状态' /></FormItem>
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
			<Divider orientation='center'>💙💙💙</Divider>
			<div className="tag-table">
				<MaxTable
					bar={tableBar}
					bordered
					columns={columns}
					dataSource={dataSource}
					rowKey={record => record.id}
					rowSelection={rowSelection}
					pagination={false}
					loading={loading}
				/>
			</div>
			<div className="tag-pagination">
				<Pagination
					{...pageInfo}
					onChange={handlePageChange}
					showTotal={total => `共${total}条`}
					showSizeChanger={true}
					pageSizeOptions={[10, 20, 30, 40, 50]}
				/>
			</div>
			{
				modalVisible && (
					<Modal open={modalVisible} title={modalType === 'create' ? '新建标签' : '编辑标签'} onCancel={closeModal} footer={null}>
						<Form form={form}>
							<Row>
								<Col span={24}>
									<FormItem name='title_modal'><Input placeholder='标题' /></FormItem>
									<FormItem name='color_modal'><Input placeholder='颜色' /></FormItem>
									<FormItem name='status_modal'><Input placeholder='状态' /></FormItem>
								</Col> 
							</Row>
							<Row>
								<Button type='primary' onClick={handleModalSave}>保存</Button>
								<Button onClick={closeModal}>取消</Button>
							</Row>
						</Form>
					</Modal>
				)
			}
		</div>
	)
}

export default TagManage;