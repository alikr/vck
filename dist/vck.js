'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var _core = createCommonjsModule(function (module) {
var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});
var _core_1 = _core.version;

var _aFunction = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding

var _ctx = function (fn, that, length) {
  _aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var _isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var _anObject = function (it) {
  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var _fails = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

var document$1 = _global.document;
// typeof document.createElement is 'object' in old IE
var is = _isObject(document$1) && _isObject(document$1.createElement);
var _domCreate = function (it) {
  return is ? document$1.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function () {
  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function (it, S) {
  if (!_isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var dP = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  _anObject(O);
  P = _toPrimitive(P, true);
  _anObject(Attributes);
  if (_ie8DomDefine) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f
};

var _propertyDesc = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var _hide = _descriptors ? function (object, key, value) {
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? _ctx(out, _global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) _hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
var _export = $export;

var hasOwnProperty = {}.hasOwnProperty;
var _has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var toString = {}.toString;

var _cof = function (it) {
  return toString.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings

// eslint-disable-next-line no-prototype-builtins
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return _cof(it) == 'String' ? it.split('') : Object(it);
};

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

// to indexed object, toObject with fallback for non-array-like ES3 strings


var _toIobject = function (it) {
  return _iobject(_defined(it));
};

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
var _toInteger = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// 7.1.15 ToLength

var min = Math.min;
var _toLength = function (it) {
  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min;
var _toAbsoluteIndex = function (index, length) {
  index = _toInteger(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};

// false -> Array#indexOf
// true  -> Array#includes



var _arrayIncludes = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = _toIobject($this);
    var length = _toLength(O.length);
    var index = _toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var SHARED = '__core-js_shared__';
var store = _global[SHARED] || (_global[SHARED] = {});
var _shared = function (key) {
  return store[key] || (store[key] = {});
};

var id = 0;
var px = Math.random();
var _uid = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var shared = _shared('keys');

var _sharedKey = function (key) {
  return shared[key] || (shared[key] = _uid(key));
};

var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO = _sharedKey('IE_PROTO');

var _objectKeysInternal = function (object, names) {
  var O = _toIobject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (_has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

// 19.1.2.14 / 15.2.3.14 Object.keys(O)



var _objectKeys = Object.keys || function keys(O) {
  return _objectKeysInternal(O, _enumBugKeys);
};

var f$1 = Object.getOwnPropertySymbols;

var _objectGops = {
	f: f$1
};

var f$2 = {}.propertyIsEnumerable;

var _objectPie = {
	f: f$2
};

// 7.1.13 ToObject(argument)

var _toObject = function (it) {
  return Object(_defined(it));
};

// 19.1.2.1 Object.assign(target, source, ...)





var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
var _objectAssign = !$assign || _fails(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = _toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = _objectGops.f;
  var isEnum = _objectPie.f;
  while (aLen > index) {
    var S = _iobject(arguments[index++]);
    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;

// 19.1.3.1 Object.assign(target, source)


_export(_export.S + _export.F, 'Object', { assign: _objectAssign });

var assign = _core.Object.assign;

var assign$1 = createCommonjsModule(function (module) {
module.exports = { "default": assign, __esModule: true };
});

var _Object$assign = unwrapExports(assign$1);

var d3 = _Object$assign({}, require("d3-timer"), require("d3-format"), require("d3-color"), require("d3-scale"));

var colors = d3.scaleOrdinal().range(['#61A5E8', '#EECB5F', '#7ECF51', '#9570E5', '#E3935D', '#E16757', '#605FF0']);

var events = [];
document.body.onclick = function () {
	emitEvent('click');
};

function addEvent(namespace, fun, options) {
	var namespaces = namespace.split(':');
	var name = namespaces[0];
	var eventType = namespaces[1] || namespaces[0];
	events.push({ name: name, eventType: eventType, fun: fun, options: options });
}

function delEvent(namespace) {
	var i = 0;
	while (events[i]) {
		var _ns = events[i].name + ':' + events[i].eventType;
		if (_ns === namespace || events[i].eventType === namespace) {
			events.splice(i, 1);
		} else {
			i++;
		}
	}
}

function emitEvent(namespace) {
	var i = 0;
	while (events[i]) {
		var _ns = events[i].name + ':' + events[i].eventType;
		if (_ns === namespace || events[i].eventType === namespace) {
			events[i].fun(events[i].options);
		}
		i++;
	}
}

var tick_id = 0;
function tick() {
	for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
		args[_key] = arguments[_key];
	}

	var duration = 1000;

	function next(fun) {
		var timer = void 0;
		var timeout = d3.timeout(function () {
			var t = 0;
			var startTime = new Date().getTime();
			timer = d3.timer(function () {
				if (typeof fun === 'function') {
					fun.apply(undefined, [t].concat(args));
				}
				t = (new Date().getTime() - startTime) / duration;
				t = t > 1 ? 1 : t;
				if (t >= 1) {
					fun.apply(undefined, [t].concat(args));
					timer.stop();
					tick_id -= duration;
					timeout.stop();
					timeout = null;
				}
			});
			return timer;
		}, tick_id);
		timeout.clear = function () {
			timeout && timeout.stop();
			timer && timer.stop();
		};
		return timeout;
	}
	next.duration = function (d) {
		duration = d;

		return next;
	};
	return next;
}

function rgbaString(rgb, opacity) {
	if (typeof rgb === 'string') {
		rgb = d3.rgb(rgb);
	}
	return 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + opacity + ')';
}

function point2cur(p) {
	var cur = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.3;

	var p1 = p[0];
	var p2 = p[1];
	var curveness = cur;
	var c = [(p1[0] + p2[0]) / 2 - (p1[1] - p2[1]) * curveness, (p1[1] + p2[1]) / 2 - (p2[0] - p1[0]) * curveness];
	return c;
}

function curPoint(t, p) {
	var x = Math.pow(1 - t, 2) * p[0][0] + 2 * t * (1 - t) * p[2][0] + Math.pow(t, 2) * p[1][0];
	var y = Math.pow(1 - t, 2) * p[0][1] + 2 * t * (1 - t) * p[2][1] + Math.pow(t, 2) * p[1][1];
	return [x, y];
}

function round(x, n) {
	return n ? Math.round(x * (n = Math.pow(10, n))) / n : Math.round(x);
}

function num2SI(num) {
	var fixed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

	if (num < 1000) {
		return num + 'B';
	}
	var n = d3.format("s")(num);
	var p = n.slice(-1).toLocaleUpperCase();
	var x = +n.slice(0, -1);
	var m = round(x, fixed);
	return m + p + 'B';
}

function num2CN(num) {
	var fixed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
	var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

	var up = 10000;
	if (num < up) {
		return num + prefix;
	}
	var w = num / up;
	var u = round(w, fixed);
	var m = round(w, 0);
	var size = String(m).length;
	var names = ['', '十', '百', '千'];
	var unit = '万';
	if (size > 4) {
		unit = '亿';
		u = round(m / up, fixed);
		m = round(m / up, 0);
		size = String(m).length;
	}
	if (u >= 10) {
		u = round(u / Math.pow(10, size - 1), fixed);
	}
	var p = names[size - 1] + unit;
	return u + p;
}

function timestamp(time) {
	time = time instanceof Date ? time : parse2Date(time);
	return +Date.parse(time).toString().slice(0, 10);
}

function getMapLevel(code) {
	var idSize = String(+code).length;
	return code === 'world' ? 1 : code === 'china' ? 2 : idSize === 2 ? 3 : idSize === 4 ? 4 : 4;
}

function parse2Date(time) {
	if (time instanceof Date) return time;
	if (time === undefined) return new Date();
	var str = typeof time === 'number' ? time : String(time).replace(/(\d+)-(\d+)-(\d+)\s+/g, '$1/$2/$3 ');
	return new Date(str);
}

function guid(prefix) {
	var id = 'xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = Math.random() * 16 | 0;
		var v = c === 'x' ? r : r & 0x3 | 0x8;
		return v.toString(16);
	});
	return typeof prefix === 'string' ? prefix + '-' + id : id;
}

function storage() {}
storage.set = function (key, value) {
	if (!key) return;
	if (window.localStorage) {
		window.localStorage.setItem(key, value);
	}
};
storage.del = function (key) {
	if (window.localStorage) {
		window.localStorage.removeItem(key);
	}
};
storage.get = function (key) {
	var val = null;
	if (window.localStorage) {
		val = window.localStorage.getItem(key);
	}
	return val;
};

exports.colors = colors;
exports.addEvent = addEvent;
exports.delEvent = delEvent;
exports.emitEvent = emitEvent;
exports.tick = tick;
exports.rgbaString = rgbaString;
exports.point2cur = point2cur;
exports.curPoint = curPoint;
exports.round = round;
exports.num2SI = num2SI;
exports.num2CN = num2CN;
exports.timestamp = timestamp;
exports.getMapLevel = getMapLevel;
exports.parse2Date = parse2Date;
exports.guid = guid;
exports.storage = storage;
