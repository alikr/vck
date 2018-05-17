
const events = [];
export function domEvent(type, dom, callback) {
	return window.addEventListener ? dom.addEventListener(type, callback)
		: dom.attachEvent('on' + type, callback);
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

// 点击点击事件
export function clickEvent() {
	emitEvent('click');
}

// 绑定页面点击事件
if (typeof document === 'object') {
	domEvent('DOMContentLoaded', document, function() {
		domEvent('click', document.body,  clickEvent);
	});
}