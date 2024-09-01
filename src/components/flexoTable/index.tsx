import React from "react";
import { Button, ButtonProps, Table, TableProps, Pagination, PaginationProps } from "antd";
import { getTypeOf } from "utils";
import "./index.scss";

interface IButtonConfig extends ButtonProps {
  label: string;
}

interface IFlexoTableProps extends TableProps<any> {
  upperBtnsConfig?: IButtonConfig | IButtonConfig[],
}

const FlexoTable: React.FC<IFlexoTableProps> = (props) => {
  const { upperBtnsConfig, pagination, ...restTableProps } = props;

  // 渲染表格上方按钮
  const renderButtonsAboveTable = () => {
    if (typeof upperBtnsConfig === "undefined") {
      return null;
    } else if (Array.isArray(upperBtnsConfig)) {
      return upperBtnsConfig.map((btnConfig) => {
				const { label, ...restBtnProps } = btnConfig;
				return <Button {...restBtnProps}>{label}</Button>;
			})
    } else if (getTypeOf(upperBtnsConfig) === "Object") {
      const { label, ...restBtnProps } = upperBtnsConfig;
      return <Button {...restBtnProps}>{upperBtnsConfig.label}</Button>
    }
  };

  return (
    <div className="flexo-table">
			<div className="flexo-table-buttons">
				{renderButtonsAboveTable()}
			</div>
			<div className="flexo-table-main">
				<Table pagination={false} {...restTableProps} />
			</div>
			<div className="flexo-table-pagination">
				<Pagination
					showTotal={(total) => `共${total}条`}
          showSizeChanger={true}
          pageSizeOptions={[10, 20, 30, 40, 50]}
					{...pagination}
				/>
			</div>
    </div>
  );
};

export default FlexoTable;
