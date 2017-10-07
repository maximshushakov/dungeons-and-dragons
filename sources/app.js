 require('scss/app.scss');

//if (NODE_ENV == 'development') require('scss/_debug.scss');

import Component from "tools/component";
import RestDB from "core/restdb";
import Helper from "core/helper";
import { createStore } from 'redux';


document.querySelector('.viewport').classList.add('-state-loading');

RestDB.get('words').then(data => {
	//const examples = data;
	//const words = Helper.unique(data, 'word');
	//const groups = Helper.unique(data, 'group');

	//Component.render(new Cards({ words, examples, groups }), document.querySelector('.viewport'));
	const words = data;
	words.forEach(data => _store.dispatch({ type: 'ADD_CARD', data }));
	document.querySelector('.viewport').classList.remove('-state-loading');
});

class CardAdd extends Component {
	init() {
    	this.element.querySelector('._textbox').addEventListener('change', (e) => {
    		const value = e.target.value.trim();
    		if (!value) return;

		    var cors_api_host = 'cors-anywhere.herokuapp.com';
		    var cors_api_url = 'https://' + cors_api_host + '/';
		    var slice = [].slice;
		    var origin = window.location.protocol + '//' + window.location.host;
		    var open = XMLHttpRequest.prototype.open;
		    XMLHttpRequest.prototype.open2 = function() {
		        var args = slice.call(arguments);
		        var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
		        if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
		            targetOrigin[1] !== cors_api_host) {
		            args[1] = cors_api_url + args[1];
		        }
		        return open.apply(this, args);
		    };

		    var xhr = new XMLHttpRequest();
			xhr.open2('GET', 'http://jisho.org/api/v1/search/words?keyword='+value);
			xhr.addEventListener('load', function() {
				if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
					const response = JSON.parse(xhr.responseText);
					if (response.data && response.data[0]) {
						this.bindings.setData({
							reading: response.data[0].japanese[0].reading,
							meaning: response.data[0].senses[0].english_definitions.join('; '),
							partOfSpeech: response.data[0].senses[0].parts_of_speech[0].toLowerCase(),
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
			RestDB.post('words', { word, reading, meaning, partOfSpeech }).then(data => {
				this.bindings.setData({ 
					state: '-saved',
					word: '',
					reading: '',
					meaning: '',
					partOfSpeech: '',
				});

				_store.dispatch({ type: 'ADD_CARD', data: { word, reading, meaning, partOfSpeech } })
			})
		}
	}
	
	render() {
		return (
    		`<div class="card">
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
            </div>`
		)
	}
}

class Cards extends Component {
    init() {
    	this.store = _store;
    	this.store.subscribe(this.update2.bind(this))
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
    		cards,
    	});
    }

    render() {
    	return (
    		`<div>
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
    		</div>`
    	)
    }
}

class Card extends Component {
	init() {}

    render() {
    	return (
    		`<div class="card">
	            <div class="_header">
                    <div class="_caption">{{ partOfSpeech }}</div>
                    <div class="_title">{{ word }}</div>
                </div>
                <div class="_content">
                    <div class="_headline">[{{ reading }}]</div>
                    <div class="_subheading">{{ meaning }}</div>
                    <!--<div class="_description">
                        <ruby>食堂<rt>しょくどう</rt></ruby> - dining room; dining hall; cafeteria <br>
                        <ruby>食事<rt>しょくじ</rt></ruby> - meal​
                    </div>-->
                    <!--<div class="_textfield">
                    	<form>
                        	<input class="_textbox" placeholder="Add an example...">
                        </form>
                    </div>-->
                </div>
    		</div>`
    	)
    }
}

//Component.render(new Cards({ words: ['勉強する'], groups: ['~て form'], examples:[{ example: '勉強してください', word: '勉強する', group: '~て form' }] }), document.querySelector('.viewport'));

const addCard =(state, action) => {
  	return Object.assign({}, state, { 
  		cards: state.cards.concat(action.data), 
	});
}

const removeCard =(state, action) => {
  	return Object.assign({}, state, { 
  		cards: [
  			...state.cards.slice(0, action.id),
    		...state.cards.slice(action.id + 1), 
    	]
	});
}

const updateCard =(state, action) => {
	const card = Object.assign({}, state.cards[action.id]);
	card.word = action.word;
  	return Object.assign({}, state, { 
  		cards: [
  			...state.cards.slice(0, action.id),
  			card,
    		...state.cards.slice(action.id + 1), 
    	]
	});
}

const _reducers = {
	'ADD_CARD': addCard,
	'REMOVE_CARD': removeCard,
	'UPDATE_CARD': updateCard
}

const _store = createStore((state, action) => {
	if (_reducers[action.type]) return _reducers[action.type](state, action);
	return state;
}, { cards: [] })


Component.render(`
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
