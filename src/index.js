export * from "./color.js";
export * from './setinterval.js';
export * from './timer.js';
export * from './ordinal.js';
export * from './domEvent.js';
export * from './tick.js';
export * from './number.js';
export * from "./storage.js";
export * from "./broadcast.js";
export * from "./dom.js";

// 计算控制点
export function getBezierCtrls(points, curveness = 0.3) {
  let [x1, y1] = points[0];
  let [x2, y2] = points[1];
  return [
      (x1 + x2) / 2 - (y1 - y2) * curveness,
      (y1 + y2) / 2 - (x2 - x1) * curveness
  ];
}

// 计算时间t的2次贝赛尔曲线坐标
export function getBezierCurve(t, points) {
  // [[x1, y1], [x2, y2], [ctrlx, ctrly]]
  let t1 = 1 - t;
  let t1_pow = t1 * t1;
  let t_pow = t * t;
  let [x1, y1] = points[0];
  let [x2, y2] = points[1];
  let [ctrlx, ctrly] = points[2];
  let x = t1_pow * x1 + 2 * t * t1 * ctrlx + t_pow * x2;
  let y = t1_pow * y1 + 2 * t * t1 * ctrly + t_pow * y2;
  return [x, y];
}

// 计算时间t的1次贝赛尔曲线坐标
export function getBezierLine(t, points) {
  // [[x1, y1], [x2, y2]]
  let t1 = 1 - t;
  let [x1, y1] = points[0];
  let [x2, y2] = points[1];
  let x = t1 * x1 + t * x2;
  let y = t1 * y1 + t * y2;
  return [x, y];
}

// 计算2点距离
export function dist(x1, y1, x2, y2) {
  let p1 = x2 - x1;
  let p2 = y2 - y1;
	return Math.sqrt(p1 * p1 + p2 * p2);
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
