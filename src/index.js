import rgb from './color.js';
import {addInterval, removeInterval} from './setinterval.js';
import {timer, timeout, interval} from './timer.js';
import {ordinal} from './ordinal.js';
import {domEvent, clickEvent, addEvent, delEvent, emitEvent} from './domEvent.js';
import tick from './tick.js';
import {round, num2SI, num2CN} from './number.js';
import {storage, setStorage, delStorage, getStorage} from './storage.js';

export {
	rgb,
	ordinal,
	addInterval,
	removeInterval,
	timer,
	timeout,
	interval,
	domEvent,
	clickEvent,
	addEvent,
	delEvent,
	emitEvent,
	tick,
	round,
	num2SI,
	num2CN,
	storage,
	setStorage,
	delStorage,
	getStorage,
}

// 默认图表颜色
export const colors = ordinal().range(['#61A5E8','#EECB5F','#7ECF51','#9570E5','#E3935D','#E16757','#605FF0']);

// 绑定页面点击事件
if (typeof document === 'object') {
	domEvent('DOMContentLoaded', document, function() {
		domEvent('click', document.body,  clickEvent);
	});
}

// 转RGBA
export function rgbaString(color, opacity = 1) {
	if (typeof color === 'string') {
		color = rgb(color);
	}
  return 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + opacity + ')';
}

// 计算控制点
export function getBezierCtrls(p, cur = 0.3) {
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
export function getBezierCurve(t, p) {
	// [[x1, y1], [x2, y2], [ctrlx, ctrly]]
  var x = Math.pow((1 - t), 2) * p[0][0] + 2 * t * (1 - t) * p[2][0] + Math.pow(t, 2) * p[1][0];
  var y = Math.pow((1 - t), 2) * p[0][1] + 2 * t * (1 - t) * p[2][1] + Math.pow(t, 2) * p[1][1];
  return [x, y];
}

// 计算时间t的1次贝赛尔曲线坐标
export function getBezierLine(t, p) {
	// [[x1, y1], [x2, y2]]
  var x = (1 - t) * p[0][0] + t * p[1][0];
  var y = (1 - t) * p[0][1] + t * p[1][1];
  return [x, y];
}

// 计算2点距离
export function dist(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// 转换10位时间戳
export function timestamp(time, size = 10) {
	time = time instanceof Date ? time : parse2Date(time);
	return +Date.parse(time).toString().slice(0, size);
}

// 时间转换为Date对象
export function parse2Date(time) {
	if (time instanceof Date) return time;
	if (time === undefined) return new Date();
	let str = typeof time === 'number' ? time
		: !isNaN(+time) ? +time
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
