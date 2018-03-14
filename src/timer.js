const requestFrame = typeof window === 'object' && window.requestAnimationFrame
	? window.requestAnimationFrame : function(f) {setTimeout(f, 17)}
	
export function Timer(callback, delay, count, immediate) {
	count = count === undefined ? 1 : +count;
	this._callback = callback;
	this._delay = delay ? +delay : 0;
	this._time = immediate ? 0 : now() + this._delay;
	this._count = count; // 允许执行次数
	this._run = 0; // 已执行次数
	this._immediate = immediate;
	return this;
}
Timer.prototype.start = function() {
	requestFrame(this.restart.bind(this));
	return this;
}
Timer.prototype.restart = function() {
	if (this._callback) {
		if (now() >= this._time) {
			this._time = now() + this._delay;
			this._callback();
			this._run++;
			if (this._run >= this._count) {
				this.stop();
				return;
			}
		}
		this.start();
	}
	return this;
}
Timer.prototype.stop = function() {
	this._callback = this._delay = this._time = this._once = null;
}

export function timer(callback) {
	checkCall(callback);
	let time = new Timer(callback, 0, Infinity);
	time.start();
	return time;
}

export function timeout(callback, delay) {
	checkCall(callback);
	let time = new Timer(callback, delay, 1);
	time.start();
	return time;
}

export function interval(callback, delay, count, immediate = true) {
	checkCall(callback);
	let time = new Timer(callback, delay, count, immediate);
	time.start();
	return time;
}

function checkCall(callback) {
	if (typeof callback !== "function") throw new TypeError("callback is not a function");
}

function now() {
	return new Date().getTime();
}