/*
 * Created Date: 2019-03-22 19:15:33
 * Author: yinzhida Email: yinzhida@qiyi.com
 * -----
 * Last Modified: 2019-03-27 20:54:16
 * Modified By: yinzhida yinzhida@qiyi.com
 * -----
 * Copyright (c) 2019 IQIYI
 */

import _ from 'lodash';
class Store {
  constructor (name = 'mplayer') {
    if (window.mplayer.store[name]) {
      return window.mplayer.store[name];
    }
    this.dataStack = [];
    this.pointer = undefined;
  }

  add (state) {
    console.log('add', state);
    let storeState = _.cloneDeep(state);
    if (this.dataStack.length === 0) {
      this.dataStack.push(storeState);
    } else {
      this.dataStack.splice(this.pointer + 1, this.dataStack.length, storeState);
    }
    console.log('dataStack', this.dataStack);
    this.pointer = this.dataStack.length - 1;
  }

  getStateByPointer () {
    if (typeof this.pointer === 'number') {
      return this.dataStack[this.pointer];
    }
    return undefined;
  }

  movePointerBack () {
    if (this.pointer > 0) {
      this.pointer -= 1;
      return true;
    }
  }

  movePointerForward () {
    if (this.pointer < this.dataStack.length - 1) {
      this.pointer += 1;
      return true;
    }
  }

  undo () {
    if (this.movePointerBack()) {
      return this.getStateByPointer();
    }
  }

  redo () {
    if (this.movePointerForward()) {
      return this.getStateByPointer();
    }
  }
}

export default Store;
