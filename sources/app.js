require('scss/app.scss');

//if (NODE_ENV == 'development') require('scss/_debug.scss');

import Component from "tools/component";

import DB from "core/db";
import Helper from "core/helper";

import Card from "components/card";
import Question from "components/question";

var viewport = {
	element: document.body.querySelector('.viewport')
}

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

Helper.ajax({ url: 'https://cards-5d46.restdb.io/rest/cards' }).then(data => {
	//data.forEach(data => Component.render(new Question(null, [data]), viewport.element));
	data = Array.from(data); 
	Component.render(new Question(data), viewport.element);
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