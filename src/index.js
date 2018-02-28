const d3 = Object.assign({},
  require("d3-timer"),
  require("d3-format"),
  require("d3-color"),
  require("d3-scale"),
);

export const colors = d3.scaleOrdinal().range(['#61A5E8','#EECB5F','#7ECF51','#9570E5','#E3935D','#E16757','#605FF0']);

const events = [];
document.body.onclick = function() {
	emitEvent('click');
}

// 添加事件（命名空间）
export function addEvent(namespace, fun, options) {
	let namespaces = namespace.split(':');
	let name = namespaces[0];
	let eventType = namespaces[1] || namespaces[0];
	events.push({name, eventType, fun, options});
}

// 移除事件（命名空间）
export function delEvent(namespace) {
	let i = 0;
	while (events[i]) {
		let _ns = events[i].name + ':' + events[i].eventType;
		if (_ns === namespace || events[i].eventType === namespace) {
			events.splice(i, 1);
		} else {
			i++;
		}
	}
}

// 触发事件（命名空间）
export function emitEvent(namespace) {
	let i = 0;
	while (events[i]) {
		let _ns = events[i].name + ':' + events[i].eventType;
		if (_ns === namespace || events[i].eventType === namespace) {
			events[i].fun(events[i].options);
		}
		i++;
	}
}

// 过度动画[0 - 1]
let tick_id = 0;
export function tick(...args) {
	let duration = 1000;
	// tick_id += duration;
	function next(fun) {
		let timer;
		let timeout = d3.timeout(() => {
			let t = 0;
			let startTime = new Date().getTime();
			timer = d3.timer(() => {
				if (typeof fun === 'function') {
					fun(t, ...args)
				}
				t = (new Date().getTime() - startTime) / duration;
		    t = t > 1 ? 1 : t;
		    if (t >= 1) {
		    	fun(t, ...args);
		      timer.stop();
		      tick_id -= duration;
		      timeout.stop();
		      timeout = null;
		    }
			});
			return timer;
		}, tick_id);
		timeout.clear = () => {
			timeout && timeout.stop();
			timer && timer.stop();
		}
		return timeout;
	}
	next.duration = (d) => {
		duration = d;
		// tick_id += duration;
		return next;
	}
	return next;
}

// 转RGBA
export function rgbaString(rgb, opacity) {
	if (typeof rgb === 'string') {
		rgb = d3.rgb(rgb);
	}
  return 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + opacity + ')';
}

// 计算控制点
export function point2cur(p, cur = 0.3) {
  var p1 = p[0];
  var p2 = p[1];
  var curveness = cur;
  var c = [
      (p1[0] + p2[0]) / 2 - (p1[1] - p2[1]) * curveness,
      (p1[1] + p2[1]) / 2 - (p2[0] - p1[0]) * curveness
  ];
  return c;
}

// 计算时间t的2次贝赛尔曲线坐标
export function curPoint(t, p) {
  var x = Math.pow((1 - t), 2) * p[0][0] + 2 * t * (1 - t) * p[2][0] + Math.pow(t, 2) * p[1][0];
  var y = Math.pow((1 - t), 2) * p[0][1] + 2 * t * (1 - t) * p[2][1] + Math.pow(t, 2) * p[1][1];
  return [x, y];
}

// 保留数字有效位数
export function round(x, n) {
  return n
      ? Math.round(x * (n = Math.pow(10, n))) / n
      : Math.round(x);
}

// 数字类型转数字单位
export function num2SI(num, fixed = 2) {
	if (num < 1000) {
		return num + 'B';
	}
  let n = d3.format("s")(num); // SI-prefix
  let p = n.slice(-1).toLocaleUpperCase(); // 单位:K/M/G...
  let x = +n.slice(0, -1);
  let m = round(x, fixed);
  return m + p + 'B';
}

// 数字类型转中文名称单位，最大千亿
export function num2CN(num, fixed = 2, prefix = '') {
	let up = 10000;
	if (num < up) {
		return num + prefix;
	}
	let w = num / up;
	let u = round(w, fixed);
  let m = round(w, 0);
  let size = String(m).length;
  let names = ['', '十', '百', '千'];
  let unit = '万';
  if (size > 4) {
  	unit = '亿';
  	u = round(m / up, fixed);
  	m = round(m / up, 0);
  	size = String(m).length;
  }
  if (u >= 10) {
  	u = round(u / Math.pow(10, size - 1), fixed);
  }
  let p = names[size - 1] + unit;
  return u + p;
}

// 转换10位时间戳
export function timestamp(time) {
	time = time instanceof Date ? time : parse2Date(time);
	return +Date.parse(time).toString().slice(0, 10);
}

// 获取地图等级
export function getMapLevel(code) {
	let idSize = String(+code).length;
  return code === 'world' ? 1
        : code === 'china' ? 2
        : idSize === 2 ? 3
        : idSize === 4 ? 4
        : 4;
}

export function parse2Date(time) {
	if (time instanceof Date) return time;
	if (time === undefined) return new Date();
	let str = typeof time === 'number' ? time
		: String(time).replace(/(\d+)-(\d+)-(\d+)\s+/g, '$1/$2/$3 ');
  return new Date(str);
}

// 生成GUID
export function guid(prefix) {
	let id = 'xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = Math.random() * 16 | 0;
    let v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
  return typeof prefix === 'string' ? prefix + '-' + id : id;
}

export function storage() {
}
storage.set = function(key, value) {
	if (!key) return;
	if (window.localStorage) {
		window.localStorage.setItem(key, value);
	}
}
storage.del = function(key) {
	if (window.localStorage) {
		window.localStorage.removeItem(key);
	}
}
storage.get = function(key) {
	let val = null;
	if (window.localStorage) {
		val = window.localStorage.getItem(key);
	}
	return val;
}