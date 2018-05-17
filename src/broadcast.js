function dispatch() {
  let listeners = {};
  return {
    on(event, fn) {
      event = "$" + event;
      (listeners[event] || (listeners[event] = [])).push(fn);
    },

    once(event, fn) {
      const eventAlias = event;
      event = "$" + event;
      function on() {
        this.off(eventAlias, on);
        fn.apply(this, arguments);
      }
      (listeners[event] || (listeners[event] = [])).push(on);
    },

    off(event, fn) {
      event = "$" + event;
      if (!arguments.length) {
        listeners = {};
      } else {
        const cbs = listeners[event];
        if (cbs) {
          if (!fn) {
            listeners[event] = null;
            delete listeners[event];
          } else {
            for (let i = 0, l = cbs.length; i < l; i++) {
              const cb = cbs[i];
              if (cb === fn || cb.fn === fn) {
                cbs.splice(i, 1);
                break;
              }
            }
          }
        }
      }
    },

    emit(event) {
      event = "$" + event;
      let cbs = listeners[event];
      if (cbs) {
        const args = [].slice.call(arguments, 1);
        cbs = cbs.slice();
        for (let i = 0, l = cbs.length; i < l; i++) {
          cbs[i].apply(this, args);
        }
      }
    },

    removeAllListeners() {
      for (let key in listeners) {
        this.off(key.slice(1));
      }
      listeners = {};
    }
  };
}
export const broadcast = dispatch();
