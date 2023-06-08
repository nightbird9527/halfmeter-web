import React, { useState } from 'react'

// interface IAsyncImport {
// 	(func: any): React.FC
// }

export const asyncImport = (importFunc) => {
	return async function () {
		const [component, setComponent] = useState(null);

		await importFunc().then((module) => {
			setComponent(module.default)
		})

		return React.createElement(component)
	}
}