const prefixes = ['K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];

// 保留数字有效位数
export function round(x, n) {
  return n
      ? Math.round(x * (n = Math.pow(10, n))) / n
      : Math.round(x);
}

// 数字类型转数字单位
export function num2SI(num, fixed = 2) {
	num = +num;
	if (num < 1000) {
		return round(num, fixed) + 'B';
	}
	let size = num.toLocaleString().match(/,/g);
	let index = size ? size.length : 0;
  let p = prefixes[index - 1];
  let u = index * 3;
  let n2 = num.toString();
  let u3 = n2.slice(0, n2.length - u);
  let decimal = n2.slice(n2.length - u, n2.length - u + fixed);
  if (+decimal) {
  	u3 = +(u3 + '.' + decimal);
  }
  let m = round(u3, fixed);
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