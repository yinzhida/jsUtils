/*
 * Created Date: 2019-03-28 10:50:48
 * Author: yinzhida Email: yinzhida@qiyi.com
 * -----
 * Last Modified: 2019-04-13 16:36:30
 * Modified By: yinzhida yinzhida@qiyi.com
 * -----
 * Copyright (c) 2019 IQIYI
 */
import { Logger } from '../log';

class Queue {
  constructor (max) {
    this.logger = new Logger('Queue');
    this.que = [];
    this.max = max;
  }

  add (instance) {
    this.que.push(instance);
    if (this.que.length > this.max) {
      return this.popOldest();
    }
  }

  forceAdd (instance) {
    this.que.push(instance);
  }

  popOldest () {
    return this.que.shift();
  }

  popByIndex (index) {
    let popInstances = this.que.splice(index, 1);
    return popInstances[0];
  }

  getMax () {
    return this.max;
  }

  getLength () {
    return this.que.length;
  }

  getByIndex (index) {
    if (this.que.length - 1 < index || index < 0) {
      this.logger.info('getByIndex', 'index out of queue range, get undefined');
      return undefined;
    }
    return this.que[index];
  }

  getOldest () {
    return this.getByIndex(0);
  }

  getNewest () {
    return this.getByIndex(this.que.length - 1);
  }

  getAll () {
    return this.que;
  }

  each (callback) {
    let que = this.que;
    let len = que.length;
    for (let i = 0; i < len; i++) {
      let result = callback(que[i], i, que);
      if (result === false) {
        break;
      }
    }
  }

  findIndex (finder) {
    let que = this.que;
    let len = que.length;
    for (let i = 0; i < len; i++) {
      if (finder(que[i], i, que) === true) {
        return i;
      }
    }
  }

  clear () {
    this.que.length = [];
  }

  eat (...args) {
    this.clear();
    args.forEach((item) => {
      this.que = this.que.concat(item.getAll());
      item.clear();
    });
    if (this.getLength() > this.max) {
      this.que.splice(this.max, this.getLength());
    }
  }
}

export default Queue;
