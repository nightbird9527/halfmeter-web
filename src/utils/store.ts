/**
 * @description 操作浏览器本地存储的工具模块
 */

class Store {
    store: Storage

    constructor(storage: Storage) {
        this.store = storage
    }

    set = (key, value) => {
        this.store.setItem(key, JSON.stringify(value))
    }

    get = (key) => {
        const result = this.store.getItem(key);
        return JSON.parse(result || '{}')
    }

    remove = (key) => {
        this.store.removeItem(key)
    }

    clearAll = () => {
        this.store.clear()
    }
}

const localStore = new Store(localStorage);
const sessionStore = new Store(sessionStorage);

export {localStore, sessionStore}