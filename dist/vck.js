'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _global = createCommonjsModule(function (module) {
var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if (typeof __g == 'number') __g = global;
});

var _core = createCommonjsModule(function (module) {
var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core;
});
var _core_1 = _core.version;

var _aFunction = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

var _ctx = function (fn, that, length) {
  _aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1:
      return function (a) {
        return fn.call(that, a);
      };
    case 2:
      return function (a, b) {
        return fn.call(that, a, b);
      };
    case 3:
      return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
  }
  return function () {
    return fn.apply(that, arguments);
  };
};

var _fails = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

var _descriptors = !_fails(function () {
  return Object.defineProperty({}, 'a', { get: function () {
      return 7;
    } }).a != 7;
});

_export(_export.S + _export.F * !_descriptors, 'Object', { defineProperty: require$$0.f });

var $Object = _core.Object;
var defineProperty = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};

var defineProperty$1 = createCommonjsModule(function (module) {
module.exports = { "default": defineProperty, __esModule: true };
});

var _Object$defineProperty = unwrapExports(defineProperty$1);

var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = _Object$defineProperty;

exports.f = require('./_descriptors') ? _Object$defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) {}
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var require$$0 = Object.freeze({

});

var _propertyDesc = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var _hide = _descriptors ? function (object, key, value) {
  return require$$0.f(object, key, _propertyDesc(1, value));
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
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;

    out = own ? target[key] : source[key];

    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key] : IS_BIND && own ? _ctx(out, _global) : IS_WRAP && target[key] == out ? function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0:
              return new C();
            case 1:
              return new C(a);
            case 2:
              return new C(a, b);
          }return new C(a, b, c);
        }return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    }(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;

    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;

      if (type & $export.R && expProto && !expProto[key]) _hide(expProto, key, out);
    }
  }
};

$export.F = 1;
$export.G = 2;
$export.S = 4;
$export.P = 8;
$export.B = 16;
$export.W = 32;
$export.U = 64;
$export.R = 128;
var _export = $export;

var _defined = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

var _toObject = function (it) {
  return Object(_defined(it));
};

var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = _Object$keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

var getKeys = Object.freeze({

});

var _objectSap = function (KEY, exec) {
  var fn = (_core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  _export(_export.S + _export.F * _fails(function () {
    fn(1);
  }), 'Object', exp);
};

_objectSap('keys', function () {
  return function keys(it) {
    return getKeys(_toObject(it));
  };
});

var keys = _core.Object.keys;

var keys$1 = createCommonjsModule(function (module) {
module.exports = { "default": keys, __esModule: true };
});

var _Object$keys = unwrapExports(keys$1);

var hasOwnProperty = {}.hasOwnProperty;
var _has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var _redefine = _hide;

var _isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var meta = _meta.onFreeze;

_objectSap('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && _isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});

var preventExtensions = _core.Object.preventExtensions;

var preventExtensions$1 = createCommonjsModule(function (module) {
module.exports = { "default": preventExtensions, __esModule: true };
});

var _Object$preventExtensions = unwrapExports(preventExtensions$1);

_objectSap('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return _isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});

var isExtensible = _core.Object.isExtensible;

var isExtensible$1 = createCommonjsModule(function (module) {
module.exports = { "default": isExtensible, __esModule: true };
});

var _Object$isExtensible = unwrapExports(isExtensible$1);

var META = require('./_uid')('meta');
var isObject = require('./_is-object');
var has = require('./_has');
var setDesc = require('./_object-dp').f;
var id = 0;
var isExtensible$2 = _Object$isExtensible || function () {
  return true;
};
var FREEZE = !require('./_fails')(function () {
  return isExtensible$2(_Object$preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
      i: 'O' + ++id,
      w: {} } });
};
var fastKey = function (it, create) {
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    if (!isExtensible$2(it)) return 'F';

    if (!create) return 'E';

    setMeta(it);
  }return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    if (!isExtensible$2(it)) return true;

    if (!create) return false;

    setMeta(it);
  }return it[META].w;
};

var onFreeze = function (it) {
  if (FREEZE && meta$1.NEED && isExtensible$2(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta$1 = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};

var _meta = Object.freeze({

});

var SHARED = '__core-js_shared__';
var store = _global[SHARED] || (_global[SHARED] = {});
var _shared = function (key) {
  return store[key] || (store[key] = {});
};

var id$1 = 0;
var px = Math.random();
var _uid = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id$1 + px).toString(36));
};

var _wks = createCommonjsModule(function (module) {
var store = _shared('wks');

var Symbol = _global.Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] = USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
};

$exports.store = store;
});

var def = require$$0.f;

var TAG = _wks('toStringTag');

var _setToStringTag = function (it, tag, stat) {
  if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

var f = _wks;

var _wksExt = {
	f: f
};

var _library = true;

var defineProperty$2 = require$$0.f;
var _wksDefine = function (name) {
  var $Symbol = _core.Symbol || (_core.Symbol = _library ? {} : _global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty$2($Symbol, name, { value: _wksExt.f(name) });
};

var getOwnPropertySymbols = _core.Object.getOwnPropertySymbols;

var getOwnPropertySymbols$1 = createCommonjsModule(function (module) {
module.exports = { "default": getOwnPropertySymbols, __esModule: true };
});

var _Object$getOwnPropertySymbols = unwrapExports(getOwnPropertySymbols$1);

exports.f = _Object$getOwnPropertySymbols;

var _objectGops = Object.freeze({

});

var f$1 = {}.propertyIsEnumerable;

var _objectPie = {
	f: f$1
};

var _enumKeys = function (it) {
  var result = getKeys(it);
  var getSymbols = _objectGops.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = _objectPie.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  }return result;
};

var toString = {}.toString;

var _cof = function (it) {
  return toString.call(it).slice(8, -1);
};

var _isArray = Array.isArray || function isArray(arg) {
  return _cof(arg) == 'Array';
};

var _anObject = function (it) {
  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return _cof(it) == 'String' ? it.split('') : Object(it);
};

var _toIobject = function (it) {
  return _iobject(_defined(it));
};

var _toPrimitive = function (it, S) {
  if (!_isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

_export(_export.S, 'Object', { create: _objectCreate });

var $Object$1 = _core.Object;
var create = function create(P, D) {
  return $Object$1.create(P, D);
};

var create$1 = createCommonjsModule(function (module) {
module.exports = { "default": create, __esModule: true };
});

var _Object$create = unwrapExports(create$1);

var anObject$1 = require('./_an-object');
var dPs = require('./_object-dps');
var enumBugKeys$1 = require('./_enum-bug-keys');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var Empty = function () {};
var PROTOTYPE$1 = 'prototype';

var createDict = function () {
  var iframe = require('./_dom-create')('iframe');
  var i = enumBugKeys$1.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:';
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE$1][enumBugKeys$1[i]];
  return createDict();
};

module.exports = _Object$create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE$1] = anObject$1(O);
    result = new Empty();
    Empty[PROTOTYPE$1] = null;

    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

var _objectCreate = Object.freeze({

});

_objectSap('getOwnPropertyNames', function () {
  return _objectGopnExt.f;
});

var $Object$2 = _core.Object;
var getOwnPropertyNames = function getOwnPropertyNames(it) {
  return $Object$2.getOwnPropertyNames(it);
};

var getOwnPropertyNames$1 = createCommonjsModule(function (module) {
module.exports = { "default": getOwnPropertyNames, __esModule: true };
});

var _Object$getOwnPropertyNames = unwrapExports(getOwnPropertyNames$1);

var toIObject = require('./_to-iobject');
var gOPN = require('./_object-gopn').f;
var toString$1 = {}.toString;

var windowNames = typeof window == 'object' && window && _Object$getOwnPropertyNames ? _Object$getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

var _objectGopnExt = Object.freeze({

});

var $getOwnPropertyDescriptor = _objectGopd.f;

_objectSap('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(_toIobject(it), key);
  };
});

var $Object$3 = _core.Object;
var getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  return $Object$3.getOwnPropertyDescriptor(it, key);
};

var getOwnPropertyDescriptor$1 = createCommonjsModule(function (module) {
module.exports = { "default": getOwnPropertyDescriptor, __esModule: true };
});

var _Object$getOwnPropertyDescriptor = unwrapExports(getOwnPropertyDescriptor$1);

var pIE = require('./_object-pie');
var createDesc = require('./_property-desc');
var toIObject$1 = require('./_to-iobject');
var toPrimitive$1 = require('./_to-primitive');
var has$1 = require('./_has');
var IE8_DOM_DEFINE$1 = require('./_ie8-dom-define');
var gOPD = _Object$getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject$1(O);
  P = toPrimitive$1(P, true);
  if (IE8_DOM_DEFINE$1) try {
    return gOPD(O, P);
  } catch (e) {}
  if (has$1(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};

var _objectGopd = Object.freeze({

});

var $keys$1 = require('./_object-keys-internal');
var hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = _Object$getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys$1(O, hiddenKeys);
};

var _objectGopn = Object.freeze({

});

var META$1 = _meta.KEY;



















var gOPD$1 = _objectGopd.f;
var dP$1 = require$$0.f;
var gOPN$1 = _objectGopnExt.f;
var $Symbol = _global.Symbol;
var $JSON = _global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE$2 = 'prototype';
var HIDDEN = _wks('_hidden');
var TO_PRIMITIVE = _wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = _shared('symbol-registry');
var AllSymbols = _shared('symbols');
var OPSymbols = _shared('op-symbols');
var ObjectProto = Object[PROTOTYPE$2];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = _global.QObject;

var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

var setSymbolDesc = _descriptors && _fails(function () {
  return _objectCreate(dP$1({}, 'a', {
    get: function () {
      return dP$1(this, 'a', { value: 7 }).a;
    }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD$1(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP$1(it, key, D);
  if (protoDesc && it !== ObjectProto) dP$1(ObjectProto, key, protoDesc);
} : dP$1;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  _anObject(it);
  key = _toPrimitive(key, true);
  _anObject(D);
  if (_has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!_has(it, HIDDEN)) dP$1(it, HIDDEN, _propertyDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (_has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _objectCreate(D, { enumerable: _propertyDesc(0, false) });
    }return setSymbolDesc(it, key, D);
  }return dP$1(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  _anObject(it);
  var keys = _enumKeys(P = _toIobject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = _toPrimitive(key, true));
  if (this === ObjectProto && _has(AllSymbols, key) && !_has(OPSymbols, key)) return false;
  return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor$1 = function getOwnPropertyDescriptor(it, key) {
  it = _toIobject(it);
  key = _toPrimitive(key, true);
  if (it === ObjectProto && _has(AllSymbols, key) && !_has(OPSymbols, key)) return;
  var D = gOPD$1(it, key);
  if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN$1(_toIobject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META$1) result.push(key);
  }return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN$1(IS_OP ? OPSymbols : _toIobject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  }return result;
};

if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (_has(this, HIDDEN) && _has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, _propertyDesc(1, value));
    };
    if (_descriptors && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  _redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
    return this._k;
  });

  _objectGopd.f = $getOwnPropertyDescriptor$1;
  require$$0.f = $defineProperty;
  _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
  _objectPie.f = $propertyIsEnumerable;
  _objectGops.f = $getOwnPropertySymbols;

  if (_descriptors && !_library) {
    _redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  _wksExt.f = function (name) {
    return wrap(_wks(name));
  };
}

_export(_export.G + _export.W + _export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = 'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(','), j = 0; es6Symbols.length > j;) _wks(es6Symbols[j++]);

for (var wellKnownSymbols = getKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) _wksDefine(wellKnownSymbols[k++]);

_export(_export.S + _export.F * !USE_NATIVE, 'Symbol', {
  'for': function (key) {
    return _has(SymbolRegistry, key += '') ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
  },

  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () {
    setter = true;
  },
  useSimple: function () {
    setter = false;
  }
});

_export(_export.S + _export.F * !USE_NATIVE, 'Object', {
  create: $create,

  defineProperty: $defineProperty,

  defineProperties: $defineProperties,

  getOwnPropertyDescriptor: $getOwnPropertyDescriptor$1,

  getOwnPropertyNames: $getOwnPropertyNames,

  getOwnPropertySymbols: $getOwnPropertySymbols
});

$JSON && _export(_export.S + _export.F * (!USE_NATIVE || _fails(function () {
  var S = $Symbol();

  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!_isObject(replacer) && it === undefined || isSymbol(it)) return;
    if (!_isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

$Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);

_setToStringTag($Symbol, 'Symbol');

_setToStringTag(Math, 'Math', true);

_setToStringTag(_global.JSON, 'JSON', true);

_wksDefine('asyncIterator');

_wksDefine('observable');

var symbol = _core.Symbol;

var symbol$1 = createCommonjsModule(function (module) {
module.exports = { "default": symbol, __esModule: true };
});

var _Symbol = unwrapExports(symbol$1);

var getKeys$1 = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE$1 = require('./_object-pie');
var toObject = require('./_to-object');
var IObject = require('./_iobject');
var $assign = _Object$assign;

module.exports = !$assign || require('./_fails')(function () {
  var A = {};
  var B = {};

  var S = _Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) {
    B[k] = k;
  });
  return $assign({}, A)[S] != 7 || _Object$keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) {
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE$1.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys$1(S).concat(getSymbols(S)) : getKeys$1(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  }return T;
} : $assign;

var _objectAssign = Object.freeze({

});

_export(_export.S + _export.F, 'Object', { assign: _objectAssign });

var assign = _core.Object.assign;

var assign$1 = createCommonjsModule(function (module) {
module.exports = { "default": assign, __esModule: true };
});

var _Object$assign = unwrapExports(assign$1);

const d3 = _Object$assign({}, require("d3-timer"), require("d3-format"), require("d3-color"), require("d3-scale"));

const colors = d3.scaleOrdinal().range(['#61A5E8', '#EECB5F', '#7ECF51', '#9570E5', '#E3935D', '#E16757', '#605FF0']);

const events = [];
document.body.onclick = function () {
	emitEvent('click');
};

function addEvent(namespace, fun, options) {
	let namespaces = namespace.split(':');
	let name = namespaces[0];
	let eventType = namespaces[1] || namespaces[0];
	events.push({ name, eventType, fun, options });
}

function delEvent(namespace) {
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

function emitEvent(namespace) {
	let i = 0;
	while (events[i]) {
		let _ns = events[i].name + ':' + events[i].eventType;
		if (_ns === namespace || events[i].eventType === namespace) {
			events[i].fun(events[i].options);
		}
		i++;
	}
}

let tick_id = 0;
function tick(...args) {
	let duration = 1000;

	function next(fun) {
		let timer;
		let timeout = d3.timeout(() => {
			let t = 0;
			let startTime = new Date().getTime();
			timer = d3.timer(() => {
				if (typeof fun === 'function') {
					fun(t, ...args);
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
		};
		return timeout;
	}
	next.duration = d => {
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

function point2cur(p, cur = 0.3) {
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

function num2SI(num, fixed = 2) {
	if (num < 1000) {
		return num + 'B';
	}
	let n = d3.format("s")(num);
	let p = n.slice(-1).toLocaleUpperCase();
	let x = +n.slice(0, -1);
	let m = round(x, fixed);
	return m + p + 'B';
}

function num2CN(num, fixed = 2, prefix = '') {
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

function timestamp(time) {
	time = time instanceof Date ? time : parse2Date(time);
	return +Date.parse(time).toString().slice(0, 10);
}

function getMapLevel(code) {
	let idSize = String(+code).length;
	return code === 'world' ? 1 : code === 'china' ? 2 : idSize === 2 ? 3 : idSize === 4 ? 4 : 4;
}

function parse2Date(time) {
	if (time instanceof Date) return time;
	if (time === undefined) return new Date();
	let str = typeof time === 'number' ? time : String(time).replace(/(\d+)-(\d+)-(\d+)\s+/g, '$1/$2/$3 ');
	return new Date(str);
}

function guid(prefix) {
	let id = 'xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		let r = Math.random() * 16 | 0;
		let v = c === 'x' ? r : r & 0x3 | 0x8;
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
	let val = null;
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
