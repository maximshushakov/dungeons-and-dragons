import { ClassDescription } from './components/pages/class.js';
import { RaceDescription } from './components/pages/race.js';
import { MonsterDescription } from './components/pages/monster.js';
import { Icons } from './components/icons.js';
import { List } from './components/list.js';

const api = (location.protocol === 'https:') ? 
	'https://cors-anywhere.herokuapp.com/http://www.dnd5eapi.co/api' :
	'http://www.dnd5eapi.co/api';

const title = 'Dungeons & Dragons';

const Controllers = {
	async showClasses(app) {
		const data = await fetch(`${api}/classes`).then(response => response.json());
		const props = data.results.map(item => {
			item.id = item.url.match(/.?(\d+)$/)[1];
			item.url = `#classes/${item.id}`;
			return item;
		});

		app.state.title = title;
		return Icons(props);
	},

	async showClass(id, app, icon) {
		const data = await fetch(`${api}/classes/${id}`).then(response => response.json());
		
		data.starting_equipment.url = `${api}/${data.starting_equipment.url.match(/api\/(.*)$/)[1]}`;
		data.class_levels.url = `${api}/${data.class_levels.url.match(/api\/(.*)$/)[1]}`;
		data.subclasses.forEach((item, index, subclasses) => {
			subclasses[index].url = `${api}/${item.url.match(/api\/(.*)$/)[1]}`
		});

		if (data.spellcasting) data.spellcasting.url = `${api}/${data.spellcasting.url.match(/api\/(.*)$/)[1]}`;
		if (icon) data.image = icon;
		
		app.state.title = `${title}: ${data.name}`;
		return ClassDescription(data)
	},

	showMonsters(app) { 
		return new Promise((resolve, reject) => { 
			fetch(`${api}/monsters`).then(response => response.json()).then(data => {
				const props = data.results.map(item => {
					item.id = item.url.match(/.?(\d+)$/)[1];
					item.url = `#monsters/${item.id}`;
					return item;
				});

				app.state.title = `${title}: Monsters`;
				resolve(List({ items: props, sort: true, group: true }));
			})	
		});
	},

	showMonster(id, app) { 
		return new Promise((resolve, reject) => { 
			fetch(`${api}/monsters/${id}`).then(response => response.json()).then(data => {
				app.state.title = `${title}: ${data.name}`;
				resolve(MonsterDescription(data));
			})	
		});
	},

	showRaces(app) { 
		return new Promise((resolve, reject) => { 
			fetch(`${api}/races`).then(response => response.json()).then(data => {
				const props = data.results.map(item => {
					item.id = item.url.match(/.?(\d+)$/)[1];
					item.url = `#races/${item.id}`;
					return item;
				});

				app.state.title = `${title}: Races`;
				resolve(List({ items: props }));
			})	
		});
	},

	showRace(id, app) { 
		return new Promise((resolve, reject) => { 
			Promise.all([
				fetch(`${api}/ability-scores`),
				fetch(`${api}/races/${id}`),
			])
			.then(responses => {
				const data = responses.map(response => response.json());
				return Promise.all(data);
			})
			.then(data => {
				const [ abilities, props ] = data;
				props.abilities = abilities.results;
				props.image = `/images/races/${props.name.toLowerCase()}.png`;

				if (props.subraces) {
					props.subraces.forEach((item, index, subraces) => {
						subraces[index].url = `${api}/${item.url.match(/api\/(.*)$/)[1]}`
					});
				}

				app.state.title = `${title}: ${props.name}`;
				resolve(RaceDescription(props));
			})
		});
	},

	showEquipment(app) {
		return new Promise((resolve, reject) => { 
			fetch(`${api}/equipment`).then(response => response.json()).then(data => {
				const props = data.results.map(item => {
					item.id = item.url.match(/.?(\d+)$/)[1];
					item.url = null; //`#equipment/${item.id}`;
					return item;
				});

				app.state.title = `${title}: Equipment`;
				resolve(List({ items: data.results, sort: true, group: true }));
			})	
		});
	}
}

export { Controllers }
