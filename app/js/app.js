/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 32);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/* no static exports found */
/* all exports used */
/*!********************************!*\
  !*** ./sources/core/helper.js ***!
  \********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
class Helper {
	static ajax({ type, url, key = null, data = null }) {
		var promise = new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.open(type, url);

			xhr.setRequestHeader("content-type", "application/json");
			if (key) xhr.setRequestHeader('x-apikey', key);
			data ? xhr.send(JSON.stringify(data)) : xhr.send();

			xhr.addEventListener('load', function () {
				if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
					resolve(JSON.parse(xhr.responseText));
				}
				if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 201) {
					resolve({ success: true });
				}
				if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 400) {
					resolve({ success: false, message: JSON.parse(xhr.response).message });
				} else {
					reject(new Error(`Helper.ajax returned: ${xhr.status}`));
				}
			});
		});

		return promise;
	}

	static shuffle(array) {
		let i = 0,
		    j = 0,
		    temp = null;

		for (i = array.length - 1; i > 0; i -= 1) {
			j = Math.floor(Math.random() * (i + 1));
			temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}

		return array;
	}

	static unique(array, key) {
		const map = {};
		return array.reduce((items, item) => {
			item = item[key];

			if (!map[item]) {
				map[item] = true;
				items.push(item);
			}
			return items;
		}, []);
	}
}

exports.default = Helper;

/***/ }),
/* 1 */
/* exports provided: default */
/* exports used: default */
/*!********************************!*\
  !*** ./~/lodash-es/_Symbol.js ***!
  \********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__root_js__ = __webpack_require__(/*! ./_root.js */ 20);


/** Built-in value references. */
var Symbol = __WEBPACK_IMPORTED_MODULE_0__root_js__["a" /* default */].Symbol;

/* harmony default export */ __webpack_exports__["a"] = (Symbol);


/***/ }),
/* 2 */
/* exports provided: default */
/* exports used: default */
/*!**************************************!*\
  !*** ./~/lodash-es/isPlainObject.js ***!
  \**************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__ = __webpack_require__(/*! ./_baseGetTag.js */ 14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getPrototype_js__ = __webpack_require__(/*! ./_getPrototype.js */ 16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__ = __webpack_require__(/*! ./isObjectLike.js */ 21);




/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__["a" /* default */])(value) || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__["a" /* default */])(value) != objectTag) {
    return false;
  }
  var proto = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__getPrototype_js__["a" /* default */])(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

/* harmony default export */ __webpack_exports__["a"] = (isPlainObject);


/***/ }),
/* 3 */
/* no static exports found */
/* all exports used */
/*!******************************!*\
  !*** ./~/process/browser.js ***!
  \******************************/
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 4 */
/* exports provided: default */
/* exports used: default */
/*!*******************************!*\
  !*** ./~/redux/es/compose.js ***!
  \*******************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = compose;
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(undefined, arguments));
    };
  });
}

/***/ }),
/* 5 */
/* exports provided: ActionTypes, default */
/* exports used: default, ActionTypes */
/*!***********************************!*\
  !*** ./~/redux/es/createStore.js ***!
  \***********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ActionTypes; });
/* harmony export (immutable) */ __webpack_exports__["a"] = createStore;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__ = __webpack_require__(/*! lodash-es/isPlainObject */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_symbol_observable__ = __webpack_require__(/*! symbol-observable */ 28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_symbol_observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_symbol_observable__);



/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var ActionTypes = {
  INIT: '@@redux/INIT'

  /**
   * Creates a Redux store that holds the state tree.
   * The only way to change the data in the store is to call `dispatch()` on it.
   *
   * There should only be a single store in your app. To specify how different
   * parts of the state tree respond to actions, you may combine several reducers
   * into a single reducer function by using `combineReducers`.
   *
   * @param {Function} reducer A function that returns the next state tree, given
   * the current state tree and the action to handle.
   *
   * @param {any} [preloadedState] The initial state. You may optionally specify it
   * to hydrate the state from the server in universal apps, or to restore a
   * previously serialized user session.
   * If you use `combineReducers` to produce the root reducer function, this must be
   * an object with the same shape as `combineReducers` keys.
   *
   * @param {Function} [enhancer] The store enhancer. You may optionally specify it
   * to enhance the store with third-party capabilities such as middleware,
   * time travel, persistence, etc. The only store enhancer that ships with Redux
   * is `applyMiddleware()`.
   *
   * @returns {Store} A Redux store that lets you read the state, dispatch actions
   * and subscribe to changes.
   */
};function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    return currentState;
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__["a" /* default */])(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.INIT });
  }

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */
  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object') {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return { unsubscribe: unsubscribe };
      }
    }, _ref[__WEBPACK_IMPORTED_MODULE_1_symbol_observable___default.a] = function () {
      return this;
    }, _ref;
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[__WEBPACK_IMPORTED_MODULE_1_symbol_observable___default.a] = observable, _ref2;
}

/***/ }),
/* 6 */
/* exports provided: default */
/* exports used: default */
/*!*************************************!*\
  !*** ./~/redux/es/utils/warning.js ***!
  \*************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = warning;
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

/***/ }),
/* 7 */
/* no static exports found */
/* all exports used */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 8 */
/* no static exports found */
/* all exports used */
/*!************************!*\
  !*** ./sources/app.js ***!
  \************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _component = __webpack_require__(/*! tools/component */ 11);

var _component2 = _interopRequireDefault(_component);

var _restdb = __webpack_require__(/*! core/restdb */ 9);

var _restdb2 = _interopRequireDefault(_restdb);

var _helper = __webpack_require__(/*! core/helper */ 0);

var _helper2 = _interopRequireDefault(_helper);

var _redux = __webpack_require__(/*! redux */ 25);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(/*! scss/app.scss */ 27);

//if (NODE_ENV == 'development') require('scss/_debug.scss');

document.querySelector('.viewport').classList.add('-state-loading');

_restdb2.default.get('words').then(data => {
	//const examples = data;
	//const words = Helper.unique(data, 'word');
	//const groups = Helper.unique(data, 'group');

	//Component.render(new Cards({ words, examples, groups }), document.querySelector('.viewport'));
	const words = data;
	words.forEach(data => _store.dispatch({ type: 'ADD_CARD', data }));
	document.querySelector('.viewport').classList.remove('-state-loading');
});

class CardAdd extends _component2.default {
	init() {
		this.element.querySelector('._textbox').addEventListener('change', e => {
			const value = e.target.value.trim();
			if (!value) return;

			var cors_api_host = 'cors-anywhere.herokuapp.com';
			var cors_api_url = 'https://' + cors_api_host + '/';
			var slice = [].slice;
			var origin = window.location.protocol + '//' + window.location.host;
			var open = XMLHttpRequest.prototype.open;
			XMLHttpRequest.prototype.open2 = function () {
				var args = slice.call(arguments);
				var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
				if (targetOrigin && targetOrigin[0].toLowerCase() !== origin && targetOrigin[1] !== cors_api_host) {
					args[1] = cors_api_url + args[1];
				}
				return open.apply(this, args);
			};

			var xhr = new XMLHttpRequest();
			xhr.open2('GET', 'http://jisho.org/api/v1/search/words?keyword=' + value);
			xhr.addEventListener('load', function () {
				if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
					const response = JSON.parse(xhr.responseText);
					if (response.data && response.data[0]) {
						this.bindings.setData({
							reading: response.data[0].japanese[0].reading,
							meaning: response.data[0].senses[0].english_definitions.join('; '),
							partOfSpeech: response.data[0].senses[0].parts_of_speech[0]
						});
					}
				}
			}.bind(this));
			xhr.send();
		});

		this.element.querySelector('._button').addEventListener('click', this.save.bind(this));
	}

	save(e) {
		e.preventDefault();
		const word = this.element.querySelector('._textbox').value.trim();
		const reading = this.element.querySelector('[data-bind="value:reading"]').value.trim();
		const meaning = this.element.querySelector('[data-bind="value:meaning"]').value.trim();
		const partOfSpeech = this.element.querySelector('[data-bind="value:partOfSpeech"]').value.trim();

		if (word && reading && meaning && partOfSpeech) {
			this.bindings.setData({ state: '-saving' });
			_restdb2.default.post('words', { word, reading, meaning, partOfSpeech }).then(data => {
				this.bindings.setData({
					state: '-saved',
					word: '',
					reading: '',
					meaning: '',
					partOfSpeech: ''
				});

				_store.dispatch({ type: 'ADD_CARD', data: { word, reading, meaning, partOfSpeech } });
			});
		}
	}

	render() {
		return `<div class="card">
                <div class="_content" data-bind="class:state">
                    <div class="_headline">
                    	Adding a new word
                    	<div class="_textfield">
                    		<input class="_textbox" placeholder="word" data-bind="value:word">
                    	</div>
                    </div>
                    <div class="_description">
                    	<div class="_textfield">
                    		<input class="_textbox" placeholder="reading" data-bind="value:reading">
                    		<input class="_textbox" placeholder="meaning" data-bind="value:meaning">
                    		<input class="_textbox" placeholder="part of speech" data-bind="value:partOfSpeech">
                    	</div>
                    </div>
                    <div class="_actions">
                    	<button class="_button">Save</button>
                    </div>
                </div>
            </div>`;
	}
}

class Cards extends _component2.default {
	init() {
		this.store = _store;
		this.store.subscribe(this.update2.bind(this));
		/*this.data.cards = [];
  this.update();*/
		//this.form = this.element.querySelector('.new-word');
		//this.cards = this.element.querySelector('.cards');
		/*this.data.words.map(word => {
  	Component.render(new Card({ 
  		word, 
  		examples: this.data.examples.filter(item => item.word === word),
  		groups: this.data.groups
  	}), this.cards);
  });*/
		//this.form.addEventListener('submit', this.save.bind(this));
	}

	/*save(e) {
 	e.preventDefault();
 const elem = this.form.querySelector('._textbox');
 const value = elem.value.trim();
 if (!value || this.data.words.filter(word => word === value).length) return;
 this.cards.insertBefore(new Card({ word: value, examples: [], groups: this.data.groups }).element, this.cards.firstChild);
 }*/

	select() {
		return this.store.getState().cards;
	}

	update2() {
		const cards = this.select();
		this.bindings.setData({
			header: `Total Cards: ${cards.length}`,
			cards
		});
	}

	render() {
		return `<div>
    			<!--<div class="card">
	                <div class="_content">
	                	<div class="_caption" data-bind="text:header"></div>
	                	<div class="_subheading">Add a new word to the list</div>
		    			<div class="_textfield" data-bind="class:state">
		                	<form class='new-word'>
		                    	<input class="_textbox" placeholder="Add a word...">
		                    </from>
		                </div>
	                </div>
                </div>-->
                <div class="cards" data-bind="each:cards" data-each-component="Card"></div>
    		</div>`;
	}
}

class Card extends _component2.default {
	init() {
		this.element.querySelector('._audio').addEventListener('click', () => {
			responsiveVoice.speak(this.data.word, "Japanese Female");
		});
	}

	render() {
		return `<div class="card">
	            <div class="_header">
                    <div class="_caption">{{ partOfSpeech }}</div>
                    <div class="_title">{{ word }}</div>
                </div>
                <div class="_content">
                    <div class="_headline _audio">{{ reading }}</div>
                    <!--<div class="_subheading">{{ meaning }}</div>-->
                    <div class="_description">
                    	{{ meaning }}
                        <!--<ruby>食堂<rt>しょくどう</rt></ruby> - dining room; dining hall; cafeteria <br>
                        <ruby>食事<rt>しょくじ</rt></ruby> - meal​-->
                    </div>
                    <!--<div class="_textfield">
                    	<form>
                        	<input class="_textbox" placeholder="Add an example...">
                        </form>
                    </div>-->
                </div>
    		</div>`;
	}
}

//Component.render(new Cards({ words: ['勉強する'], groups: ['~て form'], examples:[{ example: '勉強してください', word: '勉強する', group: '~て form' }] }), document.querySelector('.viewport'));

const addCard = (state, action) => {
	return Object.assign({}, state, {
		cards: state.cards.concat(action.data)
	});
};

const removeCard = (state, action) => {
	return Object.assign({}, state, {
		cards: [...state.cards.slice(0, action.id), ...state.cards.slice(action.id + 1)]
	});
};

const updateCard = (state, action) => {
	const card = Object.assign({}, state.cards[action.id]);
	card.word = action.word;
	return Object.assign({}, state, {
		cards: [...state.cards.slice(0, action.id), card, ...state.cards.slice(action.id + 1)]
	});
};

const _reducers = {
	'ADD_CARD': addCard,
	'REMOVE_CARD': removeCard,
	'UPDATE_CARD': updateCard
};

const _store = (0, _redux.createStore)((state, action) => {
	if (_reducers[action.type]) return _reducers[action.type](state, action);
	return state;
}, { cards: [] });

_component2.default.render(`
	<div>
		<CardAdd />
		<Cards />
	</div>
	`, {
	element: document.querySelector('.viewport'),
	components: { CardAdd, Cards, Card }
});

/*_store.dispatch({ type: 'ADD_CARD', data: 'test2' });
_store.dispatch({ type: 'ADD_CARD', data: 'test3' });
_store.dispatch({ type: 'REMOVE_CARD', id: 0 });
_store.dispatch({ type: 'ADD_CARD', data: 'test5' });
_store.dispatch({ type: 'UPDATE_CARD', id: 0, word: 'test4' })*/

/*DB.open().then(function(db) {
	//Promise.all([ DB.get('words'), DB.get('examples') ])
	DB.get('words').then(words => {
		Component.render(new Card(words[0]), viewport.element);
		Component.render(new Card(words[1]), viewport.element);
	});
  
});*/

//DB.open().then(function(db) {
/*var examples = transaction.objectStore("examples");
var words = transaction.objectStore("words");*/
//var index = examples.index('word');
//index.get('勉強する').onsuccess = (e) => console.log(e.target.result);
//DB.get('examples').then(data => console.log(data));

/*Helper.ajax({ url: 'https://cards-5d46.restdb.io/rest/examples' }).then(data => {
	DB.add('examples', data);
});*/

/*Helper.ajax({ url: 'https://cards-5d46.restdb.io/rest/cards' }).then(data => {
	console.log(data);
	DB.add('words', data);
});*/

/*DB.get('words').then(words => {
	var transaction = db.transaction(["examples"], "readonly");
	var request = transaction.objectStore("examples").index("word").openCursor();
	var index = 0;
	request.onsuccess = function(e) {
		var cursor = e.target.result;
	    if (cursor) {
	    	console.log(cursor.key);
	    	cursor.continue()
	    }
	}
});*/

//showCards();
//});

/*Helper.post('examples', { word: '運転する', example: '運転しましょか' }).then(data => {
	if (data.success) Helper.get('examples').then(data => console.log(data));
	else (console.error(data.message));
});*/

/*var showCards = () => {
	var cards = [];
	DB.get('words').then(words => {
		cards = words;
		DB.get('examples').then(examples => {
			cards[0].example = examples[0].example
			cards.forEach(data => Component.render(new Card(data), viewport.element))
			viewport.element.classList.remove('-state-loading');
		});
	});
}*/

/*function showCards(data) {
	data.forEach(data => {
		Component.render(new Card(null, data), viewport.element);
	});
}

function* getCards() {
	yield DB.open();

	let data = yield DB.get('words');
	
	if (!data.length) {
		let data = yield Helper.ajax({ url: 'data/nouns.json' });
		DB.add('words', data);
		showCards(data);
	}
	else {
		showCards(data);
	}

	return data;
}

execute(getCards());

function execute(generator, value) {
  let next = generator.next(value);
  if (!next.done) {
    next.value.then(data => {
      execute(generator, data);
    });
  }
  else {
    console.log(next.value.map(item => item.word));
  }
}*/

/*var data = JSON.stringify({
    "word": "勉強する",
    "example": "日本語を勉強しています"
});

var xhr = new XMLHttpRequest();

xhr.addEventListener('load', function() {
    console.log(this.responseText);
});

xhr.open("POST", "https://cards-5d46.restdb.io/rest/examples");
xhr.setRequestHeader("x-apikey", "5948a6725f54052560916824");

xhr.send(data);*/

/*if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/app/sw.js').then(registration => {
		setTimeout(() => {
			Helper.ajax({ url: 'https://cards-5d46.restdb.io/rest/cards' }).then(data => {
				//data.forEach(data => Component.render(new Question(null, [data]), viewport.element));
				data.forEach(data => Component.render(new Card(null, data), viewport.element));
			});
		}, 10000);
	}).catch(error => {
		console.error(error);
	});
}*/

/***/ }),
/* 9 */
/* no static exports found */
/* all exports used */
/*!********************************!*\
  !*** ./sources/core/restdb.js ***!
  \********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _helper = __webpack_require__(/*! core/helper */ 0);

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RestDB {

	static get(type) {
		return _helper2.default.ajax({ url: `https://cards-5d46.restdb.io/rest/${type}`, type: 'GET', key: '58d3ba9881f530cf439b3079' });
	}

	static post(type, data) {
		return _helper2.default.ajax({ url: `https://cards-5d46.restdb.io/rest/${type}`, type: 'POST', key: '5948a6725f54052560916824', data });
	}
}

exports.default = RestDB;

/***/ }),
/* 10 */
/* no static exports found */
/* all exports used */
/*!*********************************!*\
  !*** ./sources/tools/binder.js ***!
  \*********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
class Binder {
    constructor(element, data = {}, component) {
        this.element = element;
        this.component = component;
        this.data = data;
        this.bindings = {};

        Array.from(this.element.querySelectorAll('[data-bind]')).forEach(element => {
            const [type, data] = element.dataset.bind.split(':').map(item => item.trim());
            if (!this.bindings[data]) this.bindings[data] = [];
            this.bindings[data].push({ type, element, previous: null });
        });

        return this;

        //this.setData(this.data);
    }

    setData(data) {
        Object.keys(data).forEach(key => {
            if (this.bindings[key]) {
                this.bindings[key].forEach(item => {
                    item.previous = this.data[key];

                    if (item.type === 'each') {
                        this.component.update(item, {
                            added: this.diff('+', item.previous, data[key]),
                            removed: this.diff('-', item.previous, data[key])
                        });
                        return;
                    }
                    this.component.update(item, data[key]);
                });
            }
            this.data[key] = data[key];
        });
    }

    getData(key) {
        return this.data[key];
    }

    diff(type, previous, data) {
        if (!Array.isArray(previous)) previous = [];

        if (type === '+') return data.filter((item, index) => {
            if (previous.indexOf(item) === -1) {
                if (!item.key) item.key = String(index);
                return true;
            }
        });
        if (type === '-') return previous.filter((item, index) => {
            if (data.indexOf(item) === -1) {
                if (!item.key) item.key = String(index);
                return true;
            }
        });
    }

}

exports.default = Binder;

/***/ }),
/* 11 */
/* no static exports found */
/* all exports used */
/*!************************************!*\
  !*** ./sources/tools/component.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _binder = __webpack_require__(/*! ./binder */ 10);

var _binder2 = _interopRequireDefault(_binder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Component {
    constructor(data = {}, components = {}) {
        this.data = data;
        this.element = Component.render(this.render(), { data: this.data });
        this.bindings = new _binder2.default(this.element, this.data, this);
        this.events = {};
        this.components = {};

        if (data['key'] !== undefined) this.element.dataset.key = data['key'];

        Array.from(this.element.querySelectorAll('[data-on]')).forEach(element => {
            const [event, func] = element.dataset.on.split(':');
            if (!this.events[event]) this.events[event] = [];
            this.events[event].push({ event, element, func });
        });

        this.handler = e => {
            this.events[e.type].forEach(event => {
                console.log(event.element === e.target);
            });
        };

        Object.keys(this.events).forEach(event => {
            this.element.children[0].addEventListener(event, this.handler);
        });

        this.init();
    }

    init() {
        console.warn('invoked abstract Component.init method');
    }

    render() {
        console.warn('invoked abstract Component.render method');
        return `<div>Empty component</div>`;
    }

    update(item, data) {
        if (item.type === 'text') {
            item.element.textContent = data;
            return;
        }
        if (item.type === 'disable') {
            item.element.disabled = data;
            return;
        }
        if (item.type === 'class') {
            if (item.previous) item.element.classList.remove(item.previous);
            if (data) item.element.classList.add(data);
            return;
        }
        if (item.type === 'value') {
            item.element.value = data;
            return;
        }
        if (item.type === 'each') {
            const componentName = item.element.dataset.eachComponent;
            const toAdd = data.added.map(data => new Component.components[componentName](data));
            const toRemove = data.removed.map(data => this.components[data.key]);
            this.add(item.element, ...toAdd);
            this.remove(item.element, ...toRemove);
            return;
        }
    }

    destroy() {}

    add(element, ...components) {
        components.forEach(component => {
            element.appendChild(component.element);
            this.components[component.element.dataset.key] = component;
        });
    }

    remove(element, ...components) {
        components.forEach(component => {
            element.removeChild(component.element);
            component.destroy();
            delete this.components[component.element.dataset.key];
        });
    }

    static render(component, { element, data, components }) {
        const fragment = document.createDocumentFragment();
        const temp = document.createElement('div');
        Object.assign(Component.components, components);

        temp.innerHTML = Component.compile(component, data);

        //while (temp.children.item(0)) { 
        fragment.appendChild(temp.children.item(0));
        //};

        fragment.querySelectorAll('[data-component]').forEach(element => {
            const key = element.dataset.component;
            const data = Object.assign({}, element.dataset);
            if (!Component.components[key]) return;
            element.parentNode.replaceChild(new Component.components[key](data).element, element);
        });

        if (element) element.appendChild(fragment);

        return fragment.children[0];
    }

    static compile(component, data) {
        return component.replace(/{{(.+?)}}/g, (match, key) => {
            key = key.trim();
            return data[key] ? data[key] : match;
        }).replace(/<([A-Z].+?)\/>/g, (match, data) => {
            data = data.trim().split(' ');
            const key = data[0];
            return `<div data-component="${key}" ${data.map(item => `data-${item}`).join(' ')}></div>`;
        });
    }
}

Component.components = {};

exports.default = Component;

/***/ }),
/* 12 */
/* no static exports found */
/* all exports used */
/*!**********************************************************************************!*\
  !*** ./~/css-loader?sourceMap!./~/sass-loader?sourceMap!./sources/scss/app.scss ***!
  \**********************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../~/css-loader/lib/css-base.js */ 13)();
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n.card ._header {\n  font-size: 45px;\n  line-height: 63px;\n  color: rgba(0, 0, 0, 0.87); }\n\n.card ._headline {\n  font-size: 24px;\n  line-height: 34px;\n  color: black; }\n\n.card ._subheading {\n  font-size: 16px;\n  line-height: 24px;\n  color: black; }\n\n.card ._caption {\n  font-size: 13px;\n  line-height: 24px;\n  color: rgba(0, 0, 0, 0.54); }\n\n.card ._content, .card ._button {\n  font-size: 15px;\n  line-height: 24px;\n  color: rgba(0, 0, 0, 0.87); }\n\n.card ._textbox {\n  font-size: 14px;\n  line-height: 24px;\n  color: rgba(0, 0, 0, 0.87); }\n\n@keyframes fade {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes rotate {\n  to {\n    transform: rotate(360deg); } }\n\n@keyframes dash {\n  0% {\n    stroke-dasharray: 1, 200;\n    stroke-dashoffset: 0; }\n  50% {\n    stroke-dasharray: 89, 200;\n    stroke-dashoffset: -35px; }\n  100% {\n    stroke-dasharray: 89, 200;\n    stroke-dashoffset: -124px; } }\n\n.viewport {\n  position: relative;\n  top: 56px;\n  height: calc(100% - 56px);\n  overflow: auto; }\n  .viewport::before {\n    content: \"\";\n    display: none;\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background: #FAFAFA;\n    z-index: 1; }\n\n.viewport.-state-loading::before,\n.viewport.-state-loading ~ .viewport-icons.-preloader {\n  display: block;\n  /* animation: fade .4s; */ }\n\n.viewport-icons {\n  display: none; }\n\n.viewport-icons.-preloader {\n  position: fixed;\n  top: calc(50% - 25px);\n  left: calc(50% - 25px);\n  width: 50px;\n  height: 50px;\n  color: #00bcd4;\n  transform-origin: center center;\n  animation: rotate 1.5s linear infinite;\n  z-index: 1; }\n  .viewport-icons.-preloader circle {\n    fill: none;\n    stroke-width: 2;\n    stroke-miterlimi: 10;\n    stroke-dasharray: 1, 200;\n    stroke-dashoffset: 0;\n    stroke-linecap: round;\n    animation: dash 1.5s ease-in-out infinite; }\n\n.card {\n  max-width: 464px;\n  background: #fff;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.26);\n  border-radius: 2px;\n  margin: 8px; }\n  .card ._header {\n    padding: 12px 16px; }\n  .card ._content {\n    padding: 16px 16px 24px; }\n    .card ._content ol {\n      margin-left: 20px; }\n    .card ._content i {\n      font-size: 11px; }\n    .card ._content.-saving {\n      position: relative; }\n      .card ._content.-saving::before {\n        content: 'saving...';\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        margin-left: -41px;\n        animation: saving .6s;\n        animation-iteration-count: infinite; }\n      .card ._content.-saving ._textbox, .card ._content.-saving ._button {\n        visibility: hidden; }\n  .card ._headline {\n    margin-bottom: 2px;\n    margin-top: -4px; }\n  .card ._subheading {\n    margin-bottom: 16px; }\n  .card ._textfield {\n    margin-top: 16px; }\n    .card ._textfield.-saving::before {\n      content: 'saving...';\n      position: absolute;\n      margin-left: 5px;\n      animation: saving .6s;\n      animation-iteration-count: infinite; }\n    .card ._textfield.-saving ._textbox {\n      visibility: hidden; }\n  .card ._textbox {\n    box-sizing: border-box;\n    width: 100%;\n    padding: 0 2px 4px;\n    margin-top: 16px;\n    border: none;\n    border-bottom: 2px solid rgba(0, 0, 0, 0.26);\n    appearance: none;\n    outline: none;\n    background: none;\n    transition: border-color .2s; }\n    .card ._textbox:focus {\n      border-color: #00bcd4; }\n  .card datalist {\n    border-color: rgba(0, 0, 0, 0.26); }\n  .card ._audio::before {\n    content: '\\25B6';\n    display: inline-block;\n    font-size: 0.6em;\n    line-height: 1;\n    text-align: center;\n    width: 1.6em;\n    height: 1.6em;\n    border: 2px solid;\n    border-radius: 50%;\n    background: #FAFAFA;\n    color: #00bcd4;\n    margin-right: 0.5em;\n    box-sizing: border-box;\n    padding-top: 0.2em;\n    padding-left: 0.2em;\n    vertical-align: 0.2em; }\n  .card.-correct {\n    border-color: #388e3c; }\n  .card.-incorrect {\n    border-color: #F44336; }\n  .card ._actions {\n    padding: 32px 0 0; }\n  .card ._button {\n    border: none;\n    padding: 6px 12px;\n    color: #fff;\n    background: #00bcd4; }\n\n@media (min-width: 465px) {\n  .card {\n    display: block;\n    margin: 8px auto; } }\n\n@keyframes saving {\n  0% {\n    content: 'saving'; }\n  25% {\n    content: 'saving.'; }\n  50% {\n    content: 'saving..'; }\n  75% {\n    content: 'saving...'; } }\n\n.toolbar {\n  min-height: 56px;\n  padding: 0 16px;\n  background-color: #00bcd4;\n  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.26); }\n  .toolbar ._title {\n    color: white;\n    font-size: 20px;\n    line-height: 52px; }\n\n.toolbar.-fixed {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 1000;\n  width: 100%; }\n\nhtml {\n  height: 100%; }\n\nbody {\n  background-color: #FAFAFA;\n  -webkit-font-smoothing: antialiased;\n  font-family: \"Noto Sans\", Roboto, serif;\n  min-height: 100%;\n  margin: 0; }\n  body * {\n    margin: 0;\n    padding: 0; }\n\n/*input {\n    font-family: \"Noto Sans\", Roboto, serif;\n    font-size: 24px;\n    border: none;\n    margin-top: 5px;\n    -webkit-appearance: none;\n\n    &:focus {\n        outline: none;\n    }\n}\n\n .app {\n    max-width: 600px;\n    margin: auto;\n    -moz-user-select: none;\n    user-select: none;\n    position: relative;\n}\n\n.grid {\n    margin: 5px;\n    padding: 0;\n    list-style: none;\n    font-size: 0;\n}\n\n.grid__item {\n    display: inline-block;\n    width: 33.33333333%;\n    padding-top: 33.33333333%;\n    text-align: center;\n    position: relative;\n    transition: transform .4s;\n    background-color: #fff;\n\n    * {\n        pointer-events: none;\n    }\n\n    span {\n        border: 1px solid #03A9F4;\n        display: flex;\n        position: absolute;\n        top: 0;\n        bottom: 0;\n        left: 0;\n        right: 0;\n        margin: 5px;\n        padding: 10px;\n        font-size: 21px;\n        //font-size: 3vw;\n        justify-content: center;\n        align-items: center;\n    }\n\n    em {\n        font-style: normal;\n    }\n} */\n", "", {"version":3,"sources":["/Users/maxim/projects/cards/sources/scss/app.scss","/Users/maxim/projects/cards/sources/scss/sources/scss/material/schemes/_typography.scss","/Users/maxim/projects/cards/sources/scss/sources/scss/material/schemes/_colors.scss","/Users/maxim/projects/cards/sources/scss/sources/scss/material/animations.scss","/Users/maxim/projects/cards/sources/scss/sources/scss/material/components/viewport.scss","/Users/maxim/projects/cards/sources/scss/sources/scss/material/schemes/_metrics.scss","/Users/maxim/projects/cards/sources/scss/sources/scss/material/components/card.scss","/Users/maxim/projects/cards/sources/scss/sources/scss/material/components/toolbar.scss","/Users/maxim/projects/cards/sources/scss/sources/scss/app.scss"],"names":[],"mappings":"AAAA,iBAAiB;ACAjB;EACI,gBAAe;EACf,kBAAiB;EACjB,2BCMwB,EDL3B;;AAED;EACI,gBAAe;EACf,kBAAiB;EACjB,aCC0B,EDA7B;;AAED;EACI,gBAAe;EACf,kBAAiB;EACjB,aCL0B,EDM7B;;AAED;EACI,gBAAe;EACf,kBAAiB;EACjB,2BCR2B,EDS9B;;AAED;EACI,gBAAe;EACf,kBAAiB;EACjB,2BClBwB,EDmB3B;;AAED;EACI,gBAAe;EACf,kBAAiB;EACjB,2BCxBwB,EDyB3B;;AElCD;EACC;IAAO,WAAU,EAAA;EACjB;IAAO,WAAU,EAAA,EAAA;;AAGlB;EACC;IAAM,0BAAyB,EAAA,EAAA;;AAGhC;EACC;IACC,yBAAwB;IACxB,qBAAoB,EAAA;EAErB;IACC,0BAAyB;IACzB,yBAAwB,EAAA;EAEzB;IACC,0BAAyB;IACzB,0BAAyB,EAAA,EAAA;;ACd3B;EACI,mBAAkB;EAClB,UCR0B;EDS1B,0BAAgD;EAChD,eAAc,EAajB;EAjBD;IAOQ,YAAW;IACX,cAAa;IACb,mBAAkB;IAClB,OAAM;IACN,QAAO;IACP,YAAW;IACX,aAAY;IACZ,oBFjBmB;IEkBnB,WAAU,EACb;;AAGL;;EAGQ,eAAc;EACd,0BAA0B,EAC7B;;AAIL;EAAkB,cAAa,EAAK;;AAEpC;EACI,gBAAe;EACf,sBAAqB;EACrB,uBAAsB;EACtB,YAAW;EACX,aAAY;EACZ,eFzCoB;EE0CpB,gCAA+B;EAC/B,uCAAsC;EACtC,WAAU,EAWb;EApBD;IAYQ,WAAU;IACV,gBAAe;IACf,qBAAoB;IACpB,yBAAwB;IACxB,qBAAoB;IACpB,sBAAqB;IACrB,0CAAyC,EAC5C;;AEvDL;EACI,iBAAgB;EAChB,iBAAgB;EAChB,0CJiBqB;EIhBrB,mBAAkB;EAClB,YAAW,EA4Hd;EAjID;IAUQ,mBAAkB,EAGrB;EAbL;IAiBQ,wBAAuB,EAqB1B;IAtCL;MAmBa,kBAAiB,EAAK;IAnBnC;MAoBY,gBAAe,EAAK;IApBhC;MAuBY,mBAAkB,EAcrB;MArCT;QAyBgB,qBAAoB;QACpB,mBAAkB;QAClB,SAAQ;QACR,UAAS;QACT,mBAAkB;QAClB,sBAAqB;QACrB,oCAAmC,EACtC;MAhCb;QAmCgB,mBACJ,EAAE;EApCd;IA0CQ,mBAAkB;IAClB,iBAAgB,EACnB;EA5CL;IAgDQ,oBAAmB,EAEtB;EAlDL;IAyDQ,iBAAgB,EAMnB;IA/DL;MA4DwB,qBAAoB;MAAG,mBAAkB;MAAG,iBAAgB;MAAG,sBAAqB;MAAG,oCAAmC,EAAK;IA5DvJ;MA6DwB,mBAAkB,EAAK;EA7D/C;IAmEQ,uBAAsB;IACtB,YAAW;IACX,mBAAkB;IAClB,iBAAgB;IAChB,aAAY;IACZ,6CJpDiB;IIqDjB,iBAAgB;IAChB,cAAa;IACb,iBAAgB;IAChB,6BAA4B,EAK/B;IAjFL;MA+EY,sBJ9EY,EI+Ef;EAhFT;IAuFe,kCJnEU,EImEsB;EAvF/C;IA2FY,iBAAS;IACT,sBAAqB;IACrB,iBAAgB;IAChB,eAAc;IACd,mBAAkB;IAClB,aAAY;IACZ,cAAa;IACb,kBAAiB;IACjB,mBAAkB;IAClB,oBJjGe;IIkGf,eJpGY;IIqGZ,oBAAmB;IACnB,uBAAsB;IACtB,mBAAkB;IAClB,oBAAmB;IACnB,sBAAqB,EACxB;EA3GT;IA+GQ,sBJ1GgB,EI2GnB;EAhHL;IAmHQ,sBJ7Gc,EI8GjB;EApHL;IAuHQ,kBAAiB,EACpB;EAxHL;IA4HQ,aAAY;IACZ,kBAAiB;IACjB,YAAW;IACX,oBJ9HgB,EI+HnB;;AAGL;EACI;IACI,eAAc;IACd,iBAAgB,EACnB,EAAA;;AAGL;EACI;IAAM,kBAAkB,EAAA;EACxB;IAAM,mBAAmB,EAAA;EACzB;IAAM,oBAAoB,EAAA;EAC1B;IAAM,qBAAqB,EAAA,EAAA;;AC9I/B;EACC,iBFD6B;EEE7B,gBAAe;EACf,0BLFuB;EKGvB,0CLgBwB,EKTxB;EAXD;IAOE,aLO4B;IKN5B,gBAAe;IACf,kBAAiB,EACjB;;AAGF;EACI,gBAAe;EACf,OAAM;EACN,QAAO;EACP,cAAa;EACb,YAAW,EACd;;ACND;EAAO,aAAY,EAAK;;AACxB;EACI,0BNZuB;EMavB,oCAAmC;EACnC,wCAAuC;EACvC,iBAAgB;EAChB,UAAS,EAMZ;EAXD;IAQQ,UAAS;IACT,WAAU,EACb;;AAGL;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;IA2DI","file":"app.scss","sourcesContent":["@charset \"UTF-8\";\n.card ._header {\n  font-size: 45px;\n  line-height: 63px;\n  color: rgba(0, 0, 0, 0.87); }\n\n.card ._headline {\n  font-size: 24px;\n  line-height: 34px;\n  color: black; }\n\n.card ._subheading {\n  font-size: 16px;\n  line-height: 24px;\n  color: black; }\n\n.card ._caption {\n  font-size: 13px;\n  line-height: 24px;\n  color: rgba(0, 0, 0, 0.54); }\n\n.card ._content, .card ._button {\n  font-size: 15px;\n  line-height: 24px;\n  color: rgba(0, 0, 0, 0.87); }\n\n.card ._textbox {\n  font-size: 14px;\n  line-height: 24px;\n  color: rgba(0, 0, 0, 0.87); }\n\n@keyframes fade {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes rotate {\n  to {\n    transform: rotate(360deg); } }\n\n@keyframes dash {\n  0% {\n    stroke-dasharray: 1, 200;\n    stroke-dashoffset: 0; }\n  50% {\n    stroke-dasharray: 89, 200;\n    stroke-dashoffset: -35px; }\n  100% {\n    stroke-dasharray: 89, 200;\n    stroke-dashoffset: -124px; } }\n\n.viewport {\n  position: relative;\n  top: 56px;\n  height: calc(100% - 56px);\n  overflow: auto; }\n  .viewport::before {\n    content: \"\";\n    display: none;\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background: #FAFAFA;\n    z-index: 1; }\n\n.viewport.-state-loading::before,\n.viewport.-state-loading ~ .viewport-icons.-preloader {\n  display: block;\n  /* animation: fade .4s; */ }\n\n.viewport-icons {\n  display: none; }\n\n.viewport-icons.-preloader {\n  position: fixed;\n  top: calc(50% - 25px);\n  left: calc(50% - 25px);\n  width: 50px;\n  height: 50px;\n  color: #00bcd4;\n  transform-origin: center center;\n  animation: rotate 1.5s linear infinite;\n  z-index: 1; }\n  .viewport-icons.-preloader circle {\n    fill: none;\n    stroke-width: 2;\n    stroke-miterlimi: 10;\n    stroke-dasharray: 1, 200;\n    stroke-dashoffset: 0;\n    stroke-linecap: round;\n    animation: dash 1.5s ease-in-out infinite; }\n\n.card {\n  max-width: 464px;\n  background: #fff;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.26);\n  border-radius: 2px;\n  margin: 8px; }\n  .card ._header {\n    padding: 12px 16px; }\n  .card ._content {\n    padding: 16px 16px 24px; }\n    .card ._content ol {\n      margin-left: 20px; }\n    .card ._content i {\n      font-size: 11px; }\n    .card ._content.-saving {\n      position: relative; }\n      .card ._content.-saving::before {\n        content: 'saving...';\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        margin-left: -41px;\n        animation: saving .6s;\n        animation-iteration-count: infinite; }\n      .card ._content.-saving ._textbox, .card ._content.-saving ._button {\n        visibility: hidden; }\n  .card ._headline {\n    margin-bottom: 2px;\n    margin-top: -4px; }\n  .card ._subheading {\n    margin-bottom: 16px; }\n  .card ._textfield {\n    margin-top: 16px; }\n    .card ._textfield.-saving::before {\n      content: 'saving...';\n      position: absolute;\n      margin-left: 5px;\n      animation: saving .6s;\n      animation-iteration-count: infinite; }\n    .card ._textfield.-saving ._textbox {\n      visibility: hidden; }\n  .card ._textbox {\n    box-sizing: border-box;\n    width: 100%;\n    padding: 0 2px 4px;\n    margin-top: 16px;\n    border: none;\n    border-bottom: 2px solid rgba(0, 0, 0, 0.26);\n    appearance: none;\n    outline: none;\n    background: none;\n    transition: border-color .2s; }\n    .card ._textbox:focus {\n      border-color: #00bcd4; }\n  .card datalist {\n    border-color: rgba(0, 0, 0, 0.26); }\n  .card ._audio::before {\n    content: '▶';\n    display: inline-block;\n    font-size: 0.6em;\n    line-height: 1;\n    text-align: center;\n    width: 1.6em;\n    height: 1.6em;\n    border: 2px solid;\n    border-radius: 50%;\n    background: #FAFAFA;\n    color: #00bcd4;\n    margin-right: 0.5em;\n    box-sizing: border-box;\n    padding-top: 0.2em;\n    padding-left: 0.2em;\n    vertical-align: 0.2em; }\n  .card.-correct {\n    border-color: #388e3c; }\n  .card.-incorrect {\n    border-color: #F44336; }\n  .card ._actions {\n    padding: 32px 0 0; }\n  .card ._button {\n    border: none;\n    padding: 6px 12px;\n    color: #fff;\n    background: #00bcd4; }\n\n@media (min-width: 465px) {\n  .card {\n    display: block;\n    margin: 8px auto; } }\n\n@keyframes saving {\n  0% {\n    content: 'saving'; }\n  25% {\n    content: 'saving.'; }\n  50% {\n    content: 'saving..'; }\n  75% {\n    content: 'saving...'; } }\n\n.toolbar {\n  min-height: 56px;\n  padding: 0 16px;\n  background-color: #00bcd4;\n  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.26); }\n  .toolbar ._title {\n    color: white;\n    font-size: 20px;\n    line-height: 52px; }\n\n.toolbar.-fixed {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 1000;\n  width: 100%; }\n\nhtml {\n  height: 100%; }\n\nbody {\n  background-color: #FAFAFA;\n  -webkit-font-smoothing: antialiased;\n  font-family: \"Noto Sans\", Roboto, serif;\n  min-height: 100%;\n  margin: 0; }\n  body * {\n    margin: 0;\n    padding: 0; }\n\n/*input {\n    font-family: \"Noto Sans\", Roboto, serif;\n    font-size: 24px;\n    border: none;\n    margin-top: 5px;\n    -webkit-appearance: none;\n\n    &:focus {\n        outline: none;\n    }\n}\n\n .app {\n    max-width: 600px;\n    margin: auto;\n    -moz-user-select: none;\n    user-select: none;\n    position: relative;\n}\n\n.grid {\n    margin: 5px;\n    padding: 0;\n    list-style: none;\n    font-size: 0;\n}\n\n.grid__item {\n    display: inline-block;\n    width: 33.33333333%;\n    padding-top: 33.33333333%;\n    text-align: center;\n    position: relative;\n    transition: transform .4s;\n    background-color: #fff;\n\n    * {\n        pointer-events: none;\n    }\n\n    span {\n        border: 1px solid #03A9F4;\n        display: flex;\n        position: absolute;\n        top: 0;\n        bottom: 0;\n        left: 0;\n        right: 0;\n        margin: 5px;\n        padding: 10px;\n        font-size: 21px;\n        //font-size: 3vw;\n        justify-content: center;\n        align-items: center;\n    }\n\n    em {\n        font-style: normal;\n    }\n} */\n","%typography-header {\n    font-size: 45px;\n    line-height: 63px;\n    color: $colors-text-main;\n}\n\n%typography-headline {\n    font-size: 24px;\n    line-height: 34px;\n    color: $colors-text-accent;\n}\n\n%typography-subheading {\n    font-size: 16px;\n    line-height: 24px;\n    color: $colors-text-accent;\n}\n\n%typography-caption {\n    font-size: 13px;\n    line-height: 24px;\n    color: $colors-text-caption;\n}\n\n%typography-body {\n    font-size: 15px;\n    line-height: 24px;\n    color: $colors-text-main;\n}\n\n%typography-input {\n    font-size: 14px;\n    line-height: 24px;\n    color: $colors-text-main;\n}","// Main\n$colors-primary: #00bcd4; //#b71c1c;\n$colors-accent: #d50000;\n$colors-background: #FAFAFA;\n\n$colors-success: #388e3c;\n$colors-error: #F44336;\n\n// Text colors\n$colors-text-main: rgba(#000, .87);\n$colors-text-accent: rgba(#000, 1);\n$colors-text-inactive: rgba(#000, .38);\n\n$colors-text-caption: rgba(#000, .54);\n$colors-text-header: rgba(#fff, 1);\n\n// Divider\n$colors-divider: rgba(#000, .38);\n\n// Shadows\n$colors-shadow: rgba(#000, .26);","@keyframes fade {\n\tfrom { opacity: 0; }\n\tto   { opacity: 1; }\n}\n\n@keyframes rotate {\n\tto  { transform: rotate(360deg); }\n}\n\n@keyframes dash {\n\t0% {\n\t\tstroke-dasharray: 1, 200;\n\t\tstroke-dashoffset: 0;\n\t}\n\t50% {\n\t\tstroke-dasharray: 89, 200;\n\t\tstroke-dashoffset: -35px;\n\t}\n\t100% {\n\t\tstroke-dasharray: 89, 200;\n\t\tstroke-dashoffset: -124px;\n\t}\n}","%viewport-animation-fade-out {\n    animation: fade .4s; \n    animation-direction: reverse; \n    animation-fill-mode: forwards; \n}\n\n.viewport {\n    position: relative;\n    top: $toolbar-height-portrait;\n    height: calc(100% - #{$toolbar-height-portrait});\n    overflow: auto;\n\n    &::before {\n        content: \"\";\n        display: none;\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        background: $colors-background;\n        z-index: 1;\n    }\n}\n\n.viewport.-state-loading {\n    &::before,\n    ~ .viewport-icons.-preloader {\n        display: block;\n        /* animation: fade .4s; */\n    }\n}\n\n\n.viewport-icons { display: none; }\n\n.viewport-icons.-preloader {\n    position: fixed;\n    top: calc(50% - 25px);\n    left: calc(50% - 25px);\n    width: 50px;\n    height: 50px;\n    color: $colors-primary;\n    transform-origin: center center;\n    animation: rotate 1.5s linear infinite;\n    z-index: 1;\n\n    circle {\n        fill: none;\n        stroke-width: 2; \n        stroke-miterlimi: 10;\n        stroke-dasharray: 1, 200;\n        stroke-dashoffset: 0;\n        stroke-linecap: round;\n        animation: dash 1.5s ease-in-out infinite;\n    }\n}","$toolbar-height-portrait: 56px;\n$toolbar-height-landscape: 48px;",".card {\n    max-width: 464px;\n    background: #fff;\n    box-shadow: 0 2px 4px $colors-shadow;\n    border-radius: 2px;\n    margin: 8px;\n    //border-left: 2px solid;\n\n    ._header {\n        @extend %typography-header;\n        padding: 12px 16px;\n        //padding: 24px 16px 12px;\n        //background: $colors-primary;\n    }\n\n    ._content {\n        @extend %typography-body;\n        padding: 16px 16px 24px;\n\n        ol { margin-left: 20px; }\n        i { font-size: 11px; }\n\n        &.-saving {\n            position: relative;\n            &::before { \n                content: 'saving...'; \n                position: absolute; \n                top: 50%;\n                left: 50%;\n                margin-left: -41px; \n                animation: saving .6s; \n                animation-iteration-count: infinite; \n            }\n\n            ._textbox, ._button {\n                visibility: hidden\n            }\n        }\n    }\n\n    ._headline {\n        @extend %typography-headline;\n        margin-bottom: 2px;\n        margin-top: -4px;\n    }\n\n    ._subheading {\n        @extend %typography-subheading;\n        margin-bottom: 16px;\n        //min-height: 48px;\n    }\n\n    ._caption {\n        @extend %typography-caption;\n    }\n\n    ._textfield {\n        margin-top: 16px;\n\n        &.-saving {\n            &::before { content: 'saving...'; position: absolute; margin-left: 5px; animation: saving .6s; animation-iteration-count: infinite; }\n            ._textbox { visibility: hidden; }\n        }\n    }\n\n    ._textbox {\n        @extend %typography-input;\n        box-sizing: border-box;\n        width: 100%;\n        padding: 0 2px 4px;\n        margin-top: 16px;\n        border: none;\n        border-bottom: 2px solid $colors-shadow;\n        appearance: none;\n        outline: none;\n        background: none;\n        transition: border-color .2s;\n\n        &:focus {\n            border-color: $colors-primary;\n        }\n    }\n\n    ._textbox[list]  {\n        \n    }\n\n    datalist { border-color: $colors-shadow; }\n\n    ._audio {\n        &::before {\n            content: '▶';\n            display: inline-block;\n            font-size: 0.6em;\n            line-height: 1;\n            text-align: center;\n            width: 1.6em;\n            height: 1.6em;\n            border: 2px solid;\n            border-radius: 50%;\n            background: $colors-background;\n            color: $colors-primary;\n            margin-right: 0.5em;\n            box-sizing: border-box;\n            padding-top: 0.2em;\n            padding-left: 0.2em;\n            vertical-align: 0.2em;\n        }\n    }\n\n    &.-correct {\n        border-color: $colors-success;\n    }\n\n    &.-incorrect {\n        border-color: $colors-error;\n    }\n\n    ._actions {\n        padding: 32px 0 0;\n    }\n\n    ._button {\n        @extend %typography-body;\n        border: none;\n        padding: 6px 12px;\n        color: #fff;\n        background: $colors-primary;\n    }\n}\n\n@media (min-width: 465px) {\n    .card {\n        display: block;\n        margin: 8px auto;\n    }\n}\n\n@keyframes saving {\n    0%  { content: 'saving' }\n    25% { content: 'saving.' }\n    50% { content: 'saving..' }\n    75% { content: 'saving...' }\n}",".toolbar {\n\tmin-height: $toolbar-height-portrait;\n\tpadding: 0 16px;\n\tbackground-color: $colors-primary;\n\tbox-shadow: 0 3px 6px $colors-shadow;\n\n\t._title {\n\t\tcolor: $colors-text-header; \n\t\tfont-size: 20px;\n\t\tline-height: 52px;\n\t}\n}\n\n.toolbar.-fixed {\n    position: fixed;\n    top: 0;\n    left: 0;\n    z-index: 1000;\n    width: 100%;\n}","@import \"material/schemes/colors\";\n@import \"material/schemes/typography\";\n@import \"material/schemes/metrics\";\n\n@import \"material/animations\";\n\n@import \"material/components/viewport\";\n@import \"material/components/card\";\n@import \"material/components/toolbar\";\n\n\n//\n// Main Styles\nhtml { height: 100%; }\nbody {\n    background-color: $colors-background;\n    -webkit-font-smoothing: antialiased;\n    font-family: \"Noto Sans\", Roboto, serif;\n    min-height: 100%;\n    margin: 0;\n\n    * {\n        margin: 0;\n        padding: 0;\n    }\n}\n\n/*input {\n    font-family: \"Noto Sans\", Roboto, serif;\n    font-size: 24px;\n    border: none;\n    margin-top: 5px;\n    -webkit-appearance: none;\n\n    &:focus {\n        outline: none;\n    }\n}\n\n .app {\n    max-width: 600px;\n    margin: auto;\n    -moz-user-select: none;\n    user-select: none;\n    position: relative;\n}\n\n.grid {\n    margin: 5px;\n    padding: 0;\n    list-style: none;\n    font-size: 0;\n}\n\n.grid__item {\n    display: inline-block;\n    width: 33.33333333%;\n    padding-top: 33.33333333%;\n    text-align: center;\n    position: relative;\n    transition: transform .4s;\n    background-color: #fff;\n\n    * {\n        pointer-events: none;\n    }\n\n    span {\n        border: 1px solid #03A9F4;\n        display: flex;\n        position: absolute;\n        top: 0;\n        bottom: 0;\n        left: 0;\n        right: 0;\n        margin: 5px;\n        padding: 10px;\n        font-size: 21px;\n        //font-size: 3vw;\n        justify-content: center;\n        align-items: center;\n    }\n\n    em {\n        font-style: normal;\n    }\n} */"],"sourceRoot":""}]);

// exports


/***/ }),
/* 13 */
/* no static exports found */
/* all exports used */
/*!**************************************!*\
  !*** ./~/css-loader/lib/css-base.js ***!
  \**************************************/
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 14 */
/* exports provided: default */
/* exports used: default */
/*!************************************!*\
  !*** ./~/lodash-es/_baseGetTag.js ***!
  \************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(/*! ./_Symbol.js */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getRawTag_js__ = __webpack_require__(/*! ./_getRawTag.js */ 17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__objectToString_js__ = __webpack_require__(/*! ./_objectToString.js */ 18);




/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */] ? __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */].toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__getRawTag_js__["a" /* default */])(value)
    : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__objectToString_js__["a" /* default */])(value);
}

/* harmony default export */ __webpack_exports__["a"] = (baseGetTag);


/***/ }),
/* 15 */
/* exports provided: default */
/* exports used: default */
/*!************************************!*\
  !*** ./~/lodash-es/_freeGlobal.js ***!
  \************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/* harmony default export */ __webpack_exports__["a"] = (freeGlobal);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! ./../webpack/buildin/global.js */ 7)))

/***/ }),
/* 16 */
/* exports provided: default */
/* exports used: default */
/*!**************************************!*\
  !*** ./~/lodash-es/_getPrototype.js ***!
  \**************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__overArg_js__ = __webpack_require__(/*! ./_overArg.js */ 19);


/** Built-in value references. */
var getPrototype = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__overArg_js__["a" /* default */])(Object.getPrototypeOf, Object);

/* harmony default export */ __webpack_exports__["a"] = (getPrototype);


/***/ }),
/* 17 */
/* exports provided: default */
/* exports used: default */
/*!***********************************!*\
  !*** ./~/lodash-es/_getRawTag.js ***!
  \***********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(/*! ./_Symbol.js */ 1);


/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */] ? __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */].toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/* harmony default export */ __webpack_exports__["a"] = (getRawTag);


/***/ }),
/* 18 */
/* exports provided: default */
/* exports used: default */
/*!****************************************!*\
  !*** ./~/lodash-es/_objectToString.js ***!
  \****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/* harmony default export */ __webpack_exports__["a"] = (objectToString);


/***/ }),
/* 19 */
/* exports provided: default */
/* exports used: default */
/*!*********************************!*\
  !*** ./~/lodash-es/_overArg.js ***!
  \*********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/* harmony default export */ __webpack_exports__["a"] = (overArg);


/***/ }),
/* 20 */
/* exports provided: default */
/* exports used: default */
/*!******************************!*\
  !*** ./~/lodash-es/_root.js ***!
  \******************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__ = __webpack_require__(/*! ./_freeGlobal.js */ 15);


/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__["a" /* default */] || freeSelf || Function('return this')();

/* harmony default export */ __webpack_exports__["a"] = (root);


/***/ }),
/* 21 */
/* exports provided: default */
/* exports used: default */
/*!*************************************!*\
  !*** ./~/lodash-es/isObjectLike.js ***!
  \*************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/* harmony default export */ __webpack_exports__["a"] = (isObjectLike);


/***/ }),
/* 22 */
/* exports provided: default */
/* exports used: default */
/*!***************************************!*\
  !*** ./~/redux/es/applyMiddleware.js ***!
  \***************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = applyMiddleware;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__compose__ = __webpack_require__(/*! ./compose */ 4);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
function applyMiddleware() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function (reducer, preloadedState, enhancer) {
      var store = createStore(reducer, preloadedState, enhancer);
      var _dispatch = store.dispatch;
      var chain = [];

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      };
      chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = __WEBPACK_IMPORTED_MODULE_0__compose__["a" /* default */].apply(undefined, chain)(store.dispatch);

      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

/***/ }),
/* 23 */
/* exports provided: default */
/* exports used: default */
/*!******************************************!*\
  !*** ./~/redux/es/bindActionCreators.js ***!
  \******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = bindActionCreators;
function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(undefined, arguments));
  };
}

/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}

/***/ }),
/* 24 */
/* exports provided: default */
/* exports used: default */
/*!***************************************!*\
  !*** ./~/redux/es/combineReducers.js ***!
  \***************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (immutable) */ __webpack_exports__["a"] = combineReducers;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(/*! ./createStore */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__ = __webpack_require__(/*! lodash-es/isPlainObject */ 2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_warning__ = __webpack_require__(/*! ./utils/warning */ 6);




function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state. ' + 'If you want this reducer to hold no value, you can return null instead of undefined.';
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === __WEBPACK_IMPORTED_MODULE_0__createStore__["b" /* ActionTypes */].INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__["a" /* default */])(inputState)) {
    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });

  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });

  if (unexpectedKeys.length > 0) {
    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, { type: __WEBPACK_IMPORTED_MODULE_0__createStore__["b" /* ActionTypes */].INIT });

    if (typeof initialState === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined. If you don\'t want to set a value for this reducer, ' + 'you can use null instead of undefined.');
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
    if (typeof reducer(undefined, { type: type }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + __WEBPACK_IMPORTED_MODULE_0__createStore__["b" /* ActionTypes */].INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined, but can be null.');
    }
  });
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_warning__["a" /* default */])('No reducer provided for key "' + key + '"');
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);

  var unexpectedKeyCache = void 0;
  if (process.env.NODE_ENV !== 'production') {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError = void 0;
  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (process.env.NODE_ENV !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
      if (warningMessage) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_warning__["a" /* default */])(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};
    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }
      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! ./../../process/browser.js */ 3)))

/***/ }),
/* 25 */
/* exports provided: createStore, combineReducers, bindActionCreators, applyMiddleware, compose */
/* all exports used */
/*!*****************************!*\
  !*** ./~/redux/es/index.js ***!
  \*****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(/*! ./createStore */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__combineReducers__ = __webpack_require__(/*! ./combineReducers */ 24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bindActionCreators__ = __webpack_require__(/*! ./bindActionCreators */ 23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__applyMiddleware__ = __webpack_require__(/*! ./applyMiddleware */ 22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__compose__ = __webpack_require__(/*! ./compose */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_warning__ = __webpack_require__(/*! ./utils/warning */ 6);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createStore", function() { return __WEBPACK_IMPORTED_MODULE_0__createStore__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "combineReducers", function() { return __WEBPACK_IMPORTED_MODULE_1__combineReducers__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "bindActionCreators", function() { return __WEBPACK_IMPORTED_MODULE_2__bindActionCreators__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "applyMiddleware", function() { return __WEBPACK_IMPORTED_MODULE_3__applyMiddleware__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "compose", function() { return __WEBPACK_IMPORTED_MODULE_4__compose__["a"]; });







/*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/
function isCrushed() {}

if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__utils_warning__["a" /* default */])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! ./../../process/browser.js */ 3)))

/***/ }),
/* 26 */
/* no static exports found */
/* all exports used */
/*!*************************************!*\
  !*** ./~/style-loader/addStyles.js ***!
  \*************************************/
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 27 */
/* no static exports found */
/* all exports used */
/*!*******************************!*\
  !*** ./sources/scss/app.scss ***!
  \*******************************/
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../~/css-loader?sourceMap!../../~/sass-loader?sourceMap!./app.scss */ 12);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(/*! ../../~/style-loader/addStyles.js */ 26)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/sass-loader/index.js?sourceMap!./app.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/sass-loader/index.js?sourceMap!./app.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 28 */
/* no static exports found */
/* exports used: default */
/*!**************************************!*\
  !*** ./~/symbol-observable/index.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/index */ 29);


/***/ }),
/* 29 */
/* no static exports found */
/* all exports used */
/*!******************************************!*\
  !*** ./~/symbol-observable/lib/index.js ***!
  \******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ponyfill = __webpack_require__(/*! ./ponyfill */ 30);

var _ponyfill2 = _interopRequireDefault(_ponyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var root; /* global window */


if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (true) {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill2['default'])(root);
exports['default'] = result;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../webpack/buildin/global.js */ 7), __webpack_require__(/*! ./../../webpack/buildin/module.js */ 31)(module)))

/***/ }),
/* 30 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/symbol-observable/lib/ponyfill.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var _Symbol = root.Symbol;

	if (typeof _Symbol === 'function') {
		if (_Symbol.observable) {
			result = _Symbol.observable;
		} else {
			result = _Symbol('observable');
			_Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};

/***/ }),
/* 31 */
/* no static exports found */
/* all exports used */
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 32 */
/* no static exports found */
/* all exports used */
/*!******************************!*\
  !*** multi ./sources/app.js ***!
  \******************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./sources/app.js */8);


/***/ })
/******/ ]);