import React, { useState } from 'react';
import { Table, Space, Button, Form, Input, Row, Col, Divider, Pagination, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
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
	const handleCreate = (record) => {
		console.log(record);
	}

	// 编辑
	const handleUpdate = (record) => {
		console.log(record);
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
			<div className="tag-operatebar">
				<Button type='primary' onClick={handleCreate}>新建标签</Button>
			</div>
			<div className="tag-table">
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
			<div className="tag-pagination">
				<Pagination
					{...pageInfo}
					onChange={handlePageChange}
					showTotal={total => `共${total}条`}
					showSizeChanger={true}
					pageSizeOptions={[10, 20, 30, 40, 50]}
				/>
			</div>
		</div>
	)
}

export default TagManage;