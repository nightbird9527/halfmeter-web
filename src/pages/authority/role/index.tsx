import React, { useState, useEffect } from "react";
import {
	Space,
	Button,
	Form,
	Input,
	Row,
	Col,
	Divider,
	Pagination,
	Modal,
	Table,
	App,
} from "antd";
import {reqFetchRoleList, reqCreateRole, reqUpdateRole, reqDeleteRole} from 'src/services'
import "./index.scss";

const FormItem = Form.Item;

const Role = () => {
	const [form] = Form.useForm();
	const { modal, message } = App.useApp();
	const [queryParams, setQueryParams] = useState({});
	const [tableLoading, setTableLoading] = useState(false);
	const [dataSource, setDataSource] = useState([]);
	const [recordData, setRecordData] = useState({} as any);
	const [modalVisible, setModalVisible] = useState(false);
	const [operateType, setOperateType] = useState("create");
	const [pageInfo, setPageInfo] = useState({
		current: 1,
		pageSize: 10,
		total: 0,
	});

	const columns: any = [
		{
			title: "角色ID",
			dataIndex: "roleId",
			align: "center",
		},
		{
			title: "角色名称",
			dataIndex: "roleName",
			align: "center",
		},
		{
			title: "创建时间",
			dataIndex: "createTime",
			align: "center",
		},
		{
			title: "创建用户",
			dataIndex: "createUser",
		},
		{
			title: "更新时间",
			dataIndex: "updateTime",
			align: "center",
		},
		{
			title: "更新用户",
			dataIndex: "updateUser",
		},
		{
			title: "操作",
			dataIndex: "operation",
			align: "center",
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
	const fetchRoleList = (payload: any) => {
		setTableLoading(true);
		const { values, current, pageSize } = payload;
		const input = {
			roleId: values.roleId,
			roleName: values.roleName,
			pageNo: current,
			pageSize,
		};
		reqFetchRoleList(input).then((res) => {
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
	};

	// 查询
	const handleSubmit = () => {
		form.validateFields(["roleId", "roleName"]).then((values) => {
			const payload = {
				values,
				current: 1,
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
	const handlePageChange = (page, pageSize) => {
		let current = page;
		if (pageSize !== pageInfo.pageSize) {
			current = 1;
		}
		const payload = {
			values: { ...queryParams },
			current,
			pageSize,
		};
		fetchRoleList(payload);
	};

	// 新建
	const handleCreate = () => {
		setOperateType("create");
		setModalVisible(true);
	};

	// 编辑
	const handleUpdate = (record: any) => {
		setRecordData(record);
		setOperateType("update");
		setModalVisible(true);
	};

	useEffect(() => {
		if (modalVisible) {
			if (operateType === "create") {
				form.setFieldsValue({
					title_modal: "",
					status_modal: "",
					color_modal: "",
				});
			}
			if (operateType === "update") {
				form.setFieldsValue({
					title_modal: recordData.title,
					status_modal: recordData.status,
				});
			}
		} else {
			form.resetFields(["title_modal", "status_modal", "color_modal"]);
		}
	}, [modalVisible]);

	// 删除
	const handleDelete = (record: any) => {
		modal.confirm({
			title: "提示",
			content: "确认要删除该标签吗？",
			onOk: () => {
				const payload = {
					id: record.id,
				};
				// reqDeleteTag(payload).then((res: AxiosResponseData) => {
				// 	const { resOutput } = res;
				// 	message.success(resOutput.msg)
				// 	const queryPayload = {
				// 		values: { ...queryParams },
				// 		current: pageInfo.current,
				// 		pageSize: pageInfo.pageSize
				// 	}
				// 	fetchTagList(queryPayload)
				// }).catch(error => {
				// 	modal.error({
				// 		title: error.title,
				// 		content: error.message
				// 	})
				// })
			},
		});
	};

	// Modal保存
	const handleModalSave = () => {
		const fieldNames = ["roleName_modal"];
		form.validateFields(fieldNames).then((values) => {
			if (operateType === "create") {
				const payload = {
					title: values.title_modal,
					status: values.status_modal,
				};
				// reqCreateTag(payload).then((res: AxiosResponseData) => {
				// 	const { resOutput } = res;
				// 	message.success(resOutput.msg)
				// 	closeModal()
				// 	const queryPayload = {
				// 		values: { ...queryParams },
				// 		current: pageInfo.current,
				// 		pageSize: pageInfo.pageSize
				// 	}
				// 	fetchTagList(queryPayload)
				// }).catch(error => {
				// 	modal.error({
				// 		title: error.title,
				// 		content: error.message
				// 	})
				// })
			}
			if (operateType === "update") {
				const payload = {
					id: recordData.id,
					title: values.title_modal,
					status: values.status_modal,
				};
				// reqUpdateTag(payload).then((res: AxiosResponseData) => {
				// 	const { resOutput } = res;
				// 	message.success(resOutput.msg)
				// 	closeModal()
				// 	const queryPayload = {
				// 		values: { ...queryParams },
				// 		current: pageInfo.current,
				// 		pageSize: pageInfo.pageSize
				// 	}
				// 	fetchTagList(queryPayload)
				// }).catch(error => {
				// 	modal.error({
				// 		title: error.title,
				// 		content: error.message
				// 	})
				// })
			}
		});
	};

	// 关闭Modal
	const closeModal = () => {
		setModalVisible(false);
	};

	return (
		<div className="role">
			<div className="role-form">
				<Form form={form} onFinish={handleSubmit}>
					<Row>
						<Col span={8}>
							<FormItem name="roleId">
								<Input placeholder="角色ID" />
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem name="roleName">
								<Input placeholder="角色名称" />
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
			</div>
			<Divider orientation="center">💙💙💙</Divider>
			<div className="role-tablebar">
				<Button type="primary" onClick={handleCreate}>
					新建角色
				</Button>
			</div>
			<div className="role-table">
				<Table
					bordered
					columns={columns}
					dataSource={dataSource}
					rowKey={(record: any) => record.id}
					pagination={false}
					loading={tableLoading}
				/>
			</div>
			<div className="role-pagination">
				<Pagination
					{...pageInfo}
					onChange={handlePageChange}
					showTotal={(total) => `共${total}条`}
					showSizeChanger={true}
					pageSizeOptions={[10, 20, 30, 40, 50]}
				/>
			</div>
			{modalVisible && (
				<Modal
					open={modalVisible}
					title={operateType === "create" ? "新建角色" : "编辑角色"}
					onCancel={closeModal}
					footer={null}
				>
					<div style={{ padding: "20px" }}>
						<Form form={form} labelCol={{span: 4}} wrapperCol={{span: 18}}>
							<Row>
								<Col span={24}>
									<FormItem name="roleId_modal" label="角色ID">
										<Input />
									</FormItem>
								</Col>
								<Col span={24}>
									<FormItem name="roleName_modal" label="角色名称">
										<Input />
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

export default Role;
