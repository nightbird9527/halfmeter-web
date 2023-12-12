import React, { useState, useEffect } from 'react';
import { Table, Space, Button, Form, Input, Row, Col, Divider, Pagination, Modal, App, DatePicker } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { reqFetchJournalList, reqCreateJournal, reqUpdateJournal, reqDeleteJournal } from 'src/services/journalService'
import { AxiosResponseData } from 'utils'
import dayjs from 'dayjs'
import './index.scss'

const FormItem = Form.Item;
const { TextArea } = Input;
const { RangePicker } = DatePicker
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
	const { modal, message } = App.useApp()
	const [form] = Form.useForm()
	const [queryParams, setQueryParams] = useState({})
	const [dataSource, setDataSource] = useState([]);
	const [recordData, setRecordData] = useState({} as any);
	const [modalVisible, setModalVisible] = useState(false);
	const [operateType, setOperateType] = useState('create');
	const [tableLoading, setTableLoading] = useState(false);
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

	// 日志列表查询接口请求函数
	const fetchJournalList = (payload: any) => {
		setTableLoading(true)
		const { values, current, pageSize } = payload;
		const input = {
			content: values.content,
			startDate: values.startDate,
			endDate: values.endDate,
			pageNo: current,
			pageSize
		}
		reqFetchJournalList(input).then((res: AxiosResponseData) => {
			const { total, dataList } = res.resOutput.data;
			setQueryParams({ ...values })
			setPageInfo({ current, pageSize, total })
			setDataSource(dataList || [])
		}).catch(error => {
			modal.error({
				title: error.title,
				content: error.message
			})
		}).finally(() => {
			setTableLoading(false)
		});
	}

	// 查询
	const handleSubmit = () => {
		form.validateFields(['content', 'date']).then(values => {
			if (values.date && values.date.length) {
				values.startDate = dayjs(values.date[0]).format('YYYYMMDD');
				values.endDate = dayjs(values.date[1]).format('YYYYMMDD');
				delete values.date
			}
			const payload = {
				values,
				current: 1,
				pageSize: 10
			};
			fetchJournalList(payload)
		})
	}

	// 重置
	const handleReset = () => {
		form.resetFields();
	}

	// 翻页
	const handlePageChange = (page, pageSize) => {
		let current = page;
		if (pageSize !== pageInfo.pageSize) {
			current = 1;
		}
		const payload = {
			values: { ...queryParams },
			current,
			pageSize
		}
		fetchJournalList(payload)
	}

	// 新建
	const handleCreate = () => {
		setOperateType('create');
		setModalVisible(true);
	}

	// 编辑
	const handleUpdate = (record) => {
		setOperateType('update');
		setRecordData(record);
		setModalVisible(true);
	}

	useEffect(() => {
		if (modalVisible) {
			if (operateType === 'create') {
				form.setFieldValue('content_modal', '')
			}
			if (operateType === 'update') {
				form.setFieldValue('content_modal', recordData.content)
			}
		} else {
			form.resetFields(['content_modal'])
		}
	}, [modalVisible])

	// 删除
	const handleDelete = (record) => {
		modal.confirm({
			title: '提示',
			content: '确认要删除该条日志吗？',
			onOk: () => {
				const payload = {
					id: record.id
				}
				reqDeleteJournal(payload).then((res: AxiosResponseData) => {
					const { resOutput } = res;
					message.success(resOutput.msg)
					const queryPayload = {
						values: { ...queryParams },
						current: pageInfo.current,
						pageSize: pageInfo.pageSize
					}
					fetchJournalList(queryPayload)
				}).catch(error => {
					modal.error({
						title: error.title,
						content: error.message
					})
				})
			}
		})
	}

	// Modal提交
	const handleModalFinish = () => {
		form.validateFields(['content_modal']).then(values => {
			if (operateType === 'create') {
				const payload = {
					content: values.content_modal
				}
				reqCreateJournal(payload).then((res: AxiosResponseData) => {
					const { resOutput } = res;
					message.success(resOutput.msg)
					closeModal()
					const queryPayload = {
						values: { ...queryParams },
						current: pageInfo.current,
						pageSize: pageInfo.pageSize
					}
					fetchJournalList(queryPayload)
				}).catch(error => {
					modal.error({
						title: error.title,
						content: error.message
					})
				})
			}
			if (operateType === 'update') {
				const payload = {
					id: recordData.id,
					content: values.content_modal
				}
				reqUpdateJournal(payload).then((res: AxiosResponseData) => {
					const { resOutput } = res;
					message.success(resOutput.msg)
					closeModal()
					const queryPayload = {
						values: { ...queryParams },
						current: pageInfo.current,
						pageSize: pageInfo.pageSize
					}
					fetchJournalList(queryPayload)
				}).catch(error => {
					modal.error({
						title: error.title,
						content: error.message
					})
				})
			}
		})
	}

	// 关闭Modal
	const closeModal = () => {
		setModalVisible(false)
	}

	return (
		<div className="journal">
			<div className='journal-form'>
				<Form form={form} onFinish={handleSubmit}>
					<Row>
						<Col span={8}>
							<FormItem name='content'><Input placeholder='内容' /></FormItem>
						</Col>
						<Col span={8}>
							<FormItem name='date'><RangePicker placeholder={['开始日期', '结束日期']} style={{ width: '100%' }} /></FormItem>
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
					pagination={false}
					loading={tableLoading}
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
				modalVisible ? <Modal open={modalVisible} title={modalTitleMap[operateType]} destroyOnClose={true} footer={null} maskClosable={false} onCancel={closeModal}>
					<Form form={form} preserve={false} onFinish={handleModalFinish}>
						<Row>
							<Col span={24}>
								<FormItem
									name='content_modal'
									rules={[
										{
											required: true,
											message: '请输入内容'
										}
									]}
								>
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
				</Modal> : null
			}
		</div>
	)
}

export default JournalManage;