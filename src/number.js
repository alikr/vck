const prefixes = ["K", "M", "G", "T", "P", "E", "Z", "Y"];

// 保留数字有效位数
export function round(x, n) {
  return n ? Math.round(x * (n = Math.pow(10, n))) / n : Math.round(x);
}

// 数字类型转数字单位
export function num2SI(num, fixed = 2, prefix = "B", return_value = true) {
  num = +num;
  if (num < 1000) {
    if (return_value) {
      return round(num, fixed) + prefix;
    }
    return {
      value: round(num, fixed),
      unit: "",
      prefix: prefix
    }
  }
  let size = num.toLocaleString().match(/,/g);
  let index = size ? size.length : 0;
  let p = prefixes[index - 1];
  let u = index * 3;
  let n2 = num.toString();
  let u3 = n2.slice(0, n2.length - u);
  let decimal = n2.slice(n2.length - u, n2.length - u + fixed + 1);
  if (+decimal) {
    u3 = +(u3 + "." + decimal);
  }
  let m = round(u3, fixed);
  if (return_value) {
    return m + p + prefix;
  }
  return {
    value: m,
    unit: p,
    prefix: prefix
  }
}

// 数字类型转中文名称单位，最大千亿
export function num2CN(num, fixed = 2, prefix = "") {
  let up = 10000;
  if (num < up) {
    return num + prefix;
  }
  let w = num / up;
  let u = round(w, fixed);
  let m = round(w, 0);
  let size = String(m).length;
  let names = ["", "十", "百", "千"];
  let unit = "万";
  if (size > 4) {
    unit = "亿";
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

// 格式化数字
export function formatNumber(num, fixed, prefix = "") {
  let value = 0;
  let unit = "";
  function values() {
    let _val = num2SI(num, fixed, prefix, false);
    value = _val.value;
    unit = _val.unit;
    return values;
  }
  values.string = function(is_string = true) {
    return is_string ? value + unit + prefix : value;
  };
  values.unit = function(is_full) {
    return is_full ? unit + prefix : unit;
  };
  return values();
}

// 指定单位转换数值
export function formatNumberByUnit(num, unit, fixed = 2) {
  let index = -1;
  let size = prefixes.length;
  for (let i = 0; i < size; i++) {
    if (unit === prefixes[i]) {
      index = i;
      break;
    }
  }
  let k = Math.pow(1000, index + 1);
  return round(num / k, fixed);
}
