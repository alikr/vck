import {interval} from './timer.js';
// 队列
const $queue = {};

// 默认参数
const defaultOpt = {
  id: 0, // 自增ID
  fun: null, // 执行函数
  immediate: false, // 是否立即执行
  delay: 1000 // 间隔时间
}

export function addInterval(item) {
  if (typeof item !== 'object' || typeof item.fun !== 'function') return;
  defaultOpt.id++;
  for (let key in defaultOpt) {
    if (item[key] === undefined) {
      item[key] = defaultOpt[key];
    }
  }
  let {immediate, delay, fun} = item;
  if (immediate) {
    fun();
  }
  if (!$queue[delay]) {
   $queue[delay] = {
      interval: null,
      data: []
    };
  }
  $queue[delay].data.push(item);

  for (let delay in $queue) {
    if (!$queue[delay]['interval']) {
      $queue[delay]['interval'] = interval(function(){
        $queue[delay].data.forEach((item) => {
          item.fun();
        });
      }, +delay);
    }
  }
  return `${delay}_${item.id}`;
}

export function removeInterval(key) {
  if (!key || !isNaN(key)) return;
  let _pos = key.indexOf('_');
  let delay = key.slice(0, _pos);
  let id = key.slice(_pos + 1);
  let data = $queue[delay] ? $queue[delay].data : [];
  let index = findIndex(data, (d) => d.id === +id);
  if (~index && $queue[delay]) {
    $queue[delay].data.splice(index, 1);
  }
  if ($queue[delay] && $queue[delay].data.length === 0 && $queue[delay].interval) {
     $queue[delay].interval.stop();
    delete $queue[delay];
  }
}

function findIndex(array, filter) {
  let index = -1;
  let length = array.length;
  while (++index < length) {
    if (filter(array[index])) {
      return index;
    }
  }
  return -1;
}
