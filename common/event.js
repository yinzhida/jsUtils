class Event {
  constructor () {
    this._events = {};
  }

  _toArray (list, start) {
    start = start || 0;
    let i = list.length - start;
    const ret = new Array(i);
    while (i--) {
      ret[i] = list[i + start];
    }
    return ret;
  }

  on (event, fn) {
    (this._events[event] || (this._events[event] = [])).push(fn);
    return this;
  }

  once (event, fn) {
    function on () {
      this.off(event, on);
      fn.apply(this, arguments);
    }
    on.fn = fn;
    this.on(event, on);
    return this;
  }

  off (event, fn) {
    // all
    if (!arguments.length) {
      this._events = Object.create(null);
      return this;
    }
    // specific event
    const cbs = this._events[event];
    if (!cbs) {
      return this;
    }
    if (arguments.length === 1) {
      this._events[event] = null;
      return this;
    }
    // specific handler
    let cb;
    let i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break;
      }
    }
    return this;
  }

  emit (event) {
    let cbs = this._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? this._toArray(cbs) : cbs;
      const args = this._toArray(arguments, 1);
      for (let i = 0, l = cbs.length; i < l; i++) {
        cbs[i].apply(this, args);
      }
    }
    return this;
  }

  trigger (event) {
    return this.emit(event);
  }
}

export default Event;
