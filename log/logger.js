/*
 * Created Date: 2018-03-01 11:14:20
 * Author: yinzhida Email: yinzhida@qiyi.com
 * -----
 * Last Modified: 2019-03-28 10:30:22
 * Modified By: yinzhida yinzhida@qiyi.com
 * -----
 * Copyright (c) 2018 IQIYI
 */

class Logger {
  constructor (component) {
    this.name = component;
    this.debug = process.env.NODE_ENV !== 'production';
  }

  log (...args) {
    if (this.debug) {
      console.log(...args);
    }
  }

  trans (method, ...data) {
    this.log(`%c[Data Transmission][${new Date().toUTCString()}] component: ${this.name} > method: ${method} > data: `, 'color: blue;', ...data);
  }

  info (method, ...information) {
    this.log(`%c[Info][${new Date().toUTCString()}] component: ${this.name} > method: ${method} > information: `, 'color: green;', ...information);
  }

  warn (method, ...warning) {
    console.warn(`[Warning][${new Date().toUTCString()}] component: ${this.name} > method: ${method} > warning: `, ...warning);
  }

  error (method, ...error) {
    console.error(`[Error][${new Date().toUTCString()}] component: ${this.name} > method: ${method} > error: `, ...error);
  }
}

export default Logger;
