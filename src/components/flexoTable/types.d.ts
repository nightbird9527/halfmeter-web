import type {TableProps, ButtonProps} from 'antd';

export type FlexoButton = ButtonProps & {
  showText: string;
};

export interface FlexoConfig {
  upperButtons?: FlexoButton | FlexoButton[];
  downloadConf?: {
    url: string;
    filename: string;
  };
}

// FlexoTable Props类型定义
export interface FlexoTableProps extends TableProps<any> {
  flexoConfig?: FlexoConfig;
}
