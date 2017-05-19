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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/* unknown exports provided */
/* all exports used */
/*!************************************!*\
  !*** ./sources/tools/component.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _binder = __webpack_require__(/*! ./binder */ 6);

var _binder2 = _interopRequireDefault(_binder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Component {
    constructor(data = {}, extend = {}) {
        Object.assign(this, extend);
        this.data = data;
        this.element = Component.render(this.render());
        this.bindings = new _binder2.default(this.element);
        this.init();
    }

    init() {
        console.warn('invoked abstract Component.init method');
    }

    render() {
        console.warn('invoked abstract Component.render method');
        return `<div>Empty component</div>`;
    }

    static render(component, element = null) {
        if (typeof component !== 'string') {
            if (element) element.appendChild(component.element);
            return component;
        } else {
            let fragment = document.createDocumentFragment();
            let temp = document.createElement('div');

            temp.innerHTML = component;

            while (temp.children.item(0)) {
                fragment.appendChild(temp.children.item(0));
            };

            if (element) element.appendChild(fragment);

            return fragment;
        }
    }
}

exports.default = Component;

/***/ }),
/* 1 */
/* unknown exports provided */
/* all exports used */
/*!************************!*\
  !*** ./sources/app.js ***!
  \************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _component = __webpack_require__(/*! tools/component */ 0);

var _component2 = _interopRequireDefault(_component);

var _db = __webpack_require__(/*! core/db */ 4);

var _db2 = _interopRequireDefault(_db);

var _helper = __webpack_require__(/*! core/helper */ 5);

var _helper2 = _interopRequireDefault(_helper);

var _card = __webpack_require__(/*! components/card */ 2);

var _card2 = _interopRequireDefault(_card);

var _question = __webpack_require__(/*! components/question */ 3);

var _question2 = _interopRequireDefault(_question);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(/*! scss/app.scss */ 7);

//if (NODE_ENV == 'development') require('scss/_debug.scss');

var viewport = {
	element: document.body.querySelector('.viewport')
};

viewport.element.classList.add('-state-loading');

//DB.open().then(function() {
/*Helper.ajax({ url: 'data/nouns.json' }).then(data => {
	DB.add('words', data);
	data.forEach(word => {
		Component.render(new Card(null, word), viewport.element);
	});
});*/
//});

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

_helper2.default.ajax({ url: 'https://cards-5d46.restdb.io/rest/cards' }).then(data => {
	//data.forEach(data => Component.render(new Question(null, [data]), viewport.element));
	data = Array.from(data);
	_component2.default.render(new _question2.default(data), viewport.element);
	viewport.element.classList.remove('-state-loading');
	//let data = [{word: 'test', meaning: "sdfsfd", reading: "sfsdfds", status: '-default'}];
	//let card = new Card(...data);
	//card.setData({word: 'word1', reading: 'reading1', meaning: 'meaning1', status: '-default'});
	//card.setData({status: '-default1'});
	//data.forEach(data => Component.render(card, viewport.element));
});

//Helper.ajax({ url: '/data/questions.json' }).then(data => {
//data.forEach(data => 
//	Component.render(new Question(data), viewport.element)//);
//data = Array.from(data); 
//let data = [{word: 'test', meaning: "sdfsfd", reading: "sfsdfds", status: '-default'}];
//let card = new Card(...data);
//card.setData({word: 'word1', reading: 'reading1', meaning: 'meaning1', status: '-default'});
//card.setData({status: '-default1'});
//data.forEach(data => Component.render(card, viewport.element));
//});


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

/*class Robot {
	constructor() {
		this.isHold = false;
		this.position = 0;
		this.blocks = Array(10).fill(0);
		this.commands = {
			'P': this.pickup.bind(this),
			'M': this.move.bind(this),
			'L': this.lower.bind(this),
		}
	}

	pickup() {
		this.position = 0;
		this.isHold = true;
	}

	move() {
		if (this.position < 9) this.position++;
	}

	lower() {
		if (!this.isHold) return;
		if (this.blocks[this.position] < 15) {
			this.blocks[this.position]++;
			this.isHold = false;
		}
	}	

	execute(commands) {
		if (typeof commands !== 'string') throw new Error('commands are not a String');
		commands.split('').forEach(command => {
			command = command.toUpperCase();
			this.commands[command] && this.commands[command]()
		});
		return this.blocks.map(column => column.toString(16)).join('');
	}
}

console.log((new Robot()).execute('PLPLPL'))*/

/***/ }),
/* 2 */
/* unknown exports provided */
/* all exports used */
/*!************************************!*\
  !*** ./sources/components/card.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = __webpack_require__(/*! tools/component */ 0);

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Card extends _component2.default {
    constructor(...data) {
        return super(...data);
    }

    init() {}

    render() {
        return `<div class="card" data-bind="class:status">
                <div class="_header">
                    <div class="_title" data-bind="text:word"></div>
                </div>
                <div class="_content">
                    <div class="_headline" data-bind="text:reading"></div>
                    <div class="_subheading" data-bind="text:meaning"></div>
                    <div class="_description" data-bind="text:meaning"></div>
                    ${this.data.title}
                </div>
            </div>`;
    }
}

exports.default = Card;

/***/ }),
/* 3 */
/* unknown exports provided */
/* all exports used */
/*!****************************************!*\
  !*** ./sources/components/question.js ***!
  \****************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = __webpack_require__(/*! tools/component */ 0);

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Question extends _component2.default {
    init() {
        var input = this.element.querySelector('[ref="input"]');
        var current = 0;
        var total = this.data.length;
        var status = '';

        input.addEventListener('change', e => {
            status = input.value.trim() === this.data[current].word ? '-correct' : '-incorrect';

            this.bindings.setData({
                status,
                isDisable: true,
                answer: `${this.data[current].word} [${this.data[current].reading}]`
            });

            window.responsiveVoice.speak(this.data[current].word, 'Japanese Female');

            setTimeout(() => {
                current++;
                if (current === total) current = 0;
                show(current);
            }, 1500);
        });

        const show = index => {
            this.bindings.setData({
                question: this.data[index].meaning,
                hint: this.data[index].hint,
                status: '-default',
                isDisable: false,
                answer: ''
            });
            input.focus();
        };

        show(current);
    }

    render() {
        return `<div class="card" data-bind="class:status">
                <div class="_content">
                    <div class="_headline" data-bind="text:question"></div>
                    <div class="_subheading" data-bind="text:hint"></div>
                    <div class="_description" data-bind="text:words"></div>
                    <div class="_textfield">
                        <input data-bind="disabled:isDisable" data-bind-value="answer" ref='input' class="_textbox" placeholder="Your answer...">
                    </div>
                </div>
            </div>`;
    }
}

exports.default = Question;

/***/ }),
/* 4 */
/* unknown exports provided */
/* all exports used */
/*!****************************!*\
  !*** ./sources/core/db.js ***!
  \****************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var db;

class DB {
    static open() {
        var request = indexedDB.open('cards', 1);

        var promise = new Promise((resolve, reject) => {
            request.onsuccess = event => {
                db = event.target.result;
                resolve(event.target.result);
            };
            request.onerror = event => {
                reject(new Error(request.error));
            };
        });

        request.onupgradeneeded = event => {
            db = event.target.result;
            /*** 
                Structure:
                words -> { word, reading, meaning }
            */
            var store = db.createObjectStore('words', { autoIncrement: true });
            store.createIndex('word', 'word', { autoIncrement: true });
        };

        return promise;
    }

    static get(storeName) {
        //store, key = null) {
        var transaction = db.transaction([storeName], 'readwrite');
        var store = transaction.objectStore(storeName);
        var promise = new Promise(function (resolve, reject) {
            var request = store.getAll();
            request.onsuccess = event => resolve(event.target.result);
            request.onerror = event => reject(new Error(transaction.error));
        });

        return promise;
    }

    static add(storeName, data) {
        //store, key = null) {
        var transaction = db.transaction([storeName], 'readwrite');
        var store = transaction.objectStore(storeName);
        var promise = new Promise(function (resolve, reject) {
            data.forEach(item => {
                var request = store.add(item);
            });
            transaction.onsuccess = event => resolve(event.target.result);
            transaction.onerror = event => reject(new Error(transaction.error));
        });

        return promise;
    }
}

exports.default = DB;

/***/ }),
/* 5 */
/* unknown exports provided */
/* all exports used */
/*!********************************!*\
  !*** ./sources/core/helper.js ***!
  \********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var url =  false ? '/app/data/' : '/data/';

class Helper {
	static get(type) {
		return API.ajax({ url: url + type + '.json' });
	}

	static ajax({ url, params }) {
		var promise = new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', url);

			xhr.setRequestHeader('x-apikey', '58d3ba9881f530cf439b3079');
			xhr.send();

			xhr.addEventListener('load', function () {
				if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
					resolve(JSON.parse(xhr.responseText));
				} else {
					reject(new Error(`Helper.ajax returned: ${xhr.status}`));
				}
			});
		});

		return promise;
	}

	static shuffle(array) {
		var i = 0,
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
}

exports.default = Helper;

/***/ }),
/* 6 */
/* unknown exports provided */
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
    constructor(element, data = {}) {
        this.element = element;
        this.data = data;
        this.bindings = {};

        Array.from(this.element.querySelectorAll('[data-bind]')).forEach(element => {
            const [type, data] = element.dataset.bind.split(':');
            if (!this.bindings[data]) this.bindings[data] = [];
            this.bindings[data].push({ type, element, previous: null });
        });

        Array.from(this.element.querySelectorAll('[data-bind-value]')).forEach(element => {
            const data = element.dataset.bindValue;
            if (!this.bindings[data]) this.bindings[data] = [];
            this.bindings[data].push({ type: 'value', element, previous: null });
        });

        this.setData(this.data);
    }

    setData(data) {
        Object.keys(data).forEach(key => {
            if (this.bindings[key]) {
                this.bindings[key].forEach(item => {
                    item.previous = this.data[key];
                    this.render(item, data[key]);
                });
            }
            this.data[key] = data[key];
        });
    }

    getData(key) {
        return this.data[key];
    }

    render(item, data) {
        if (item.type === 'text') {
            item.element.textContent = data;
            return;
        }
        if (item.type === 'disabled') {
            //item.element.disabled = data;
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
    }

}

exports.default = Binder;

/***/ }),
/* 7 */
/* unknown exports provided */
/* all exports used */
/*!*******************************!*\
  !*** ./sources/scss/app.scss ***!
  \*******************************/
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 8 */
/* unknown exports provided */
/* all exports used */
/*!******************************!*\
  !*** multi ./sources/app.js ***!
  \******************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./sources/app.js */1);


/***/ })
/******/ ]);