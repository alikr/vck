import {timer, timeout} from './timer.js';
// 过度动画[0 - 1]
let tick_id = 0;
export function tick(...args) {
	let duration = 1000;
	// tick_id += duration;
	function next(fun) {
		let _timer;
		let _timeout = timeout(() => {
			let t = 0;
			let startTime = new Date().getTime();
			_timer = timer(() => {
				if (typeof fun === 'function') {
					fun(t, ...args)
				}
				t = (new Date().getTime() - startTime) / duration;
		    t = t > 1 ? 1 : t;
		    if (t >= 1) {
		    	fun(t, ...args);
		      _timer.stop();
		      tick_id -= duration;
		      _timeout.stop();
		      _timeout = null;
		    }
			});
			return _timer;
		}, tick_id);
		_timeout.clear = () => {
			_timeout && _timeout.stop();
			_timer && _timer.stop();
		}
		return _timeout;
	}
	next.duration = (d) => {
		duration = d;
		// tick_id += duration;
		return next;
	}
	return next;
}