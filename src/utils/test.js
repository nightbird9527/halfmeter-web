/**
 * 数组求和函数，可使用handler自定义求和过程
 * @private
 * @version 1.0.0 版本号
 * @param {Array} array 待处理的源数组
 * @param {Function} handler 处理函数
 * @returns {number} 求和结果
 */

function sum(array, handler) {
	let result

	for (const value of array) {
		const current = handler(value)
		if (current !== undefined) {
			result = result === undefined ? current : (result + current)
		}
	}
	return result
}

export default sum