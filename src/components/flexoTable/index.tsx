import React, {useState, useMemo} from 'react';
import {Table, Button, Dropdown, Checkbox} from 'antd';
import type {FlexoButton, FlexoTableProps} from './types';
import {getTypeOf} from '@/utils/tools';
import ColumnOperator from './columnOperator';
import './index.scss';

/**
 * @description FlexoTable组件，集成下载功能
 *
 * @param {object} props - 组件props
 * @param {object} props.flexoConfig - 配置项
 * @param {object | array} props.flexoConfig.btnConfig - 按钮配置
 * @param {string} props.flexoConfig.btnConfig.showText - 按钮显示文本
 * @param {object} props.flexoConfig.download - 下载配置
 * @returns {React.ReactElement}
 */
const FlexoTable: React.FC<FlexoTableProps> = (props) => {
  const {flexoConfig, columns, ...restProps} = props;

  // #region 列操作

  // #endregion

  // #region 按钮渲染
  const upperButtons = flexoConfig?.upperButtons;
  const buttonElements = useMemo((): JSX.Element[] | undefined => {
    if (!upperButtons) return;
    const configs = [] as FlexoButton[];
    if (getTypeOf(upperButtons) === 'array') {
      (upperButtons as FlexoButton[]).forEach((config: FlexoButton, index: number) => {
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
  const downloadConfig = flexoConfig?.download;
  // #endregion

  return (
    <div className="flexo-table">
      <div className="flexo-table-upper clearfix">
        <div className="flexo-table-upper-filter">
          <ColumnOperator columns={columns} />
        </div>
        <div className="flexo-table-upper-btns">{upperButtons && buttonElements}</div>
      </div>
      <div className="flexo-table-main">
        <Table columns={columns} {...restProps} />
      </div>
    </div>
  );
};

export default FlexoTable;
