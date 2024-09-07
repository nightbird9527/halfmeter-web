/**
 * 事件发布-订阅
 */

class EventBus {
  public events: {
    [key: string]: any;
  };

  constructor() {
    this.events = {};
  }

  /**
   * 订阅事件
   * @param eventName @description 事件名
   * @param listener @description 监听器
   */
  subscribe(eventName: string, listener: (...args: any[]) => void) {
    const {events} = this;
    if (!events[eventName]) {
      events[eventName] = [];
    }
    events[eventName].push(listener);
  }

  /**
   * 发布事件
   * @param eventName @description 事件名
   * @param args @description 监听器参数
   */
  publish(eventName: string, ...args: any[]) {
    const {events} = this;
    if (events[eventName]) {
      events[eventName].forEach((listener: (...args: any[]) => void) => listener(...args));
    }
  }

  /**
   * 取消订阅
   * @param eventName @description 事件名
   * @param listener @description 监听器
   */
  unsubscribe(eventName: string, listener: (...args: any[]) => void) {
    const {events} = this;
    if (events[eventName]) {
      const listenerIndex = events[eventName].indexOf(listener);
      events.splice(listenerIndex, 1);
    }
  }

  /**
   * 清空事件
   */
  clear() {
    this.events = {};
  }
}

export default new EventBus();
