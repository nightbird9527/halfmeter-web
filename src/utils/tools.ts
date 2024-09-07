/**
 * @description 工具函数
 */

// 获取变量数据类型
export const getTypeOf = (value: any): string => {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
};
