require('scss/app.scss');

//if (NODE_ENV == 'development') require('scss/_debug.scss');

import Store from "tools/store";
import Component from "tools/component";

import DB from "core/db";
import Card from "components/card";

DB.open().then(function() {
	DB.get('cards').then((data) => data.forEach((data, index) => {
		var card = new Card(null, data);
		Component.render(card, document.body.querySelector('.list'));

		card.style.opacity = 0;
		card.animate([
			  { transform: 'translateY(100px)', opacity: 0 },
			  { transform: 'translateY(0)', opacity: 1 }   
			], { 
				delay: index * 100, 
				duration: 200,
				fill: 'forwards' 
			});
	}));
})
