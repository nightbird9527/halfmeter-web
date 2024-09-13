import React, {useState, useMemo} from 'react';
import {Table, Button, Dropdown, Checkbox, Menu, Divider} from 'antd';
import {FilterOutlined} from '@ant-design/icons';
import * as XLSX from 'xlsx';
import type {FlexoButton, FlexoTableProps} from './types';
import {getTypeOf} from '@/utils/tools';
import {useThemeStore} from '@/zustand';
import './index.scss';

/**
 * @description FlexoTable组件，集成下载功能
 * @param {object} props - 组件props
 * @param {object} props.flexoConfig - 配置项
 * @param {object | array} props.flexoConfig.upperButtons - 按钮配置
 * @param {string} props.flexoConfig.upperButtons.showText - 按钮显示文本
 * @param {object} props.flexoConfig.downloadConf - 下载配置
 * @param {string} props.flexoConfig.downloadConf.url - 下载地址
 * @param {string} props.flexoConfig.downloadConf.filename - 下载文件名
 * @returns {React.ReactElement}
 */
const FlexoTable: React.FC<FlexoTableProps> = (props) => {
  const {flexoConfig = {}, columns = [], ...restProps} = props;
  const {themeFlag} = useThemeStore();

  // #region 列过滤器
  // Dropdown开关
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleOpenChange = (open: boolean) => {
    setDropdownOpen(open);
  };

  // Checkbox.Group & Select All
  const initialCheckedColumns = columns.map((column: any) => column.dataIndex || column.key);
  const [checkedColumns, setCheckedColumns] = useState(initialCheckedColumns);
  const [isCheckedAll, setIsCheckedAll] = useState(true);
  const handleGroupChange = (checkedValues: any) => {
    setIsCheckedAll(checkedValues.length === initialCheckedColumns.length);
    setCheckedColumns(checkedValues);
  };
  const handleSelectAllChange = (e: any) => {
    const isChecked = e.target.checked;
    setIsCheckedAll(isChecked);
    setCheckedColumns(isChecked ? initialCheckedColumns : []);
  };

  // 过滤后的列
  const filteredColumns = useMemo(() => {
    return columns.filter((column: any) => checkedColumns.includes(column.dataIndex || column.key));
  }, [checkedColumns]);

  // 下拉框渲染内容
  const menuItems = columns?.map((column: any) => {
    return {
      key: column.dataIndex,
      label: <Checkbox value={column.dataIndex}>{column.title}</Checkbox>,
    };
  });
  const dropdownRender = () => {
    return (
      <div className={themeFlag} style={{border: '1px solid #ccc', borderRadius: '10px', overflow: 'hidden'}}>
        <div style={{width: '100%'}}>
          <Checkbox.Group value={checkedColumns} onChange={handleGroupChange} style={{width: '100%'}}>
            <Menu items={menuItems} style={{width: '100%', boxShadow: 'none'}}></Menu>
          </Checkbox.Group>
        </div>
        <Divider style={{margin: '0'}} />
        <div style={{padding: '8px 16px'}}>
          <Checkbox checked={isCheckedAll} onChange={handleSelectAllChange}>
            Select All
          </Checkbox>
        </div>
      </div>
    );
  };
  // #endregion

  // #region 按钮渲染
  const upperButtons = flexoConfig.upperButtons;
  const buttonElements = useMemo((): JSX.Element[] => {
    if (!upperButtons) return [];
    const configs = [] as FlexoButton[];
    if (getTypeOf(upperButtons) === 'array') {
      (upperButtons as FlexoButton[]).forEach((config: FlexoButton) => {
        configs.push(config);
      });
    }
    if (getTypeOf(upperButtons) === 'object') {
      configs.push(upperButtons as FlexoButton);
    }
    return configs.map((config, index) => {
      const {showText = `Button${index}`, ...props} = config;
      return (
        <Button key={index} {...props}>
          {showText}
        </Button>
      );
    });
  }, [upperButtons]);
  // #endregion

  // #region 下载逻辑
  const downloadConf = flexoConfig.downloadConf;
  const [downloading, setDownloading] = useState(false);
  const handleDownload = () => {
    if (!downloadConf) return;
    const {filename = '未命名.xlsx'} = downloadConf;
    const mockData = [
      {
        id: 1,
        name: 'John Brown',
        age: 32,
        sex: '男',
        email: 'jon@example.com',
        height: 175,
      },
    ];
    const workbook = XLSX.utils.book_new(); // 创建工作簿
    const worksheet = XLSX.utils.json_to_sheet(mockData); // 创建工作表
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1'); // 将工作表添加到工作簿中
    console.log('worksheet', worksheet);
    worksheet['!cols'] = [
      {
        wpx: 100,
      },
    ];
    XLSX.writeFile(workbook, filename, {compression: true}); // 下载
  };
  // #endregion

  return (
    <div className="flexo-table">
      <div className="flexo-table-upper clearfix">
        <div className="flexo-table-upper-filter">
          <Dropdown
            trigger={['click']}
            dropdownRender={dropdownRender}
            open={dropdownOpen}
            onOpenChange={handleOpenChange}
          >
            <Button icon={<FilterOutlined />}>列操作</Button>
          </Dropdown>
        </div>
        <div className="flexo-table-upper-btns">
          {[
            ...buttonElements,
            downloadConf && (
              <Button key="download" type="primary" loading={downloading} onClick={handleDownload}>
                下载表格数据
              </Button>
            ),
          ]}
        </div>
      </div>
      <div className="flexo-table-main">
        <Table columns={filteredColumns} {...restProps} />
      </div>
    </div>
  );
};

export default FlexoTable;
