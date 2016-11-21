require('scss/app.scss');

//if (NODE_ENV == 'development') require('scss/_debug.scss');

import Store from "tools/store";
import Component from "tools/component";

import DB from "core/db";
import API from "core/api";
import Card from "components/card";

var viewport = document.body.querySelector('.viewport');
viewport.classList.add('-state-loading');

DB.open().then(function() {
	DB.get('cards').then(data => {
		if (data.length) show(data);
		else API.get('nouns').then(data => {
			show(data)
			DB.add(data);
		});
	})
});

var show = (data) => data.forEach((data, index) => {
	var card = new Card(null, data);
	Component.render(card, viewport);
	viewport.classList.remove('-state-loading');

	card.style.opacity = 0;
	card.animate([
		  { transform: 'translateY(100px)', opacity: 0 },
		  { transform: 'translateY(0)', opacity: 1 }   
		], { 
			delay: index * 100, 
			duration: 200,
			fill: 'forwards' 
		});
});