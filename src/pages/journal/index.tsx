import React, { useState } from 'react';
import { Table, Space, Button, Form, Input, Row, Col, Divider, Pagination  } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import './index.scss'

const FormItem = Form.Item;
interface IJournalDataItem {
	id: string,
	content: string,
	createTime: string,
	updateTime: string,
	createUser: string,
}

const Journal = () => {
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
			title: '更新时间',
			dataIndex: 'updateTime',
		},
		{
			title: '发布人',
			dataIndex: 'createUser',
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
		<div className="journal">
			<div className='journal-form'>
				<Form form={form} onFinish={handleSubmit}>
					<Row justify='space-around'>
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
			<Divider orientation='center'>❤</Divider>
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
					showTotal={ total => `共${total}条`}
					showSizeChanger={true}
					pageSizeOptions={[10, 20, 30, 40, 50]}
				/>
			</div>
		</div>
	)
}

export default Journal;