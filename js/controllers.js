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
		const [data, module] = await Promise.all([
			fetch(`${api}/classes/${id}`).then(response => response.json()),
			import('./components/pages/class.js'),
		]);

		data.starting_equipment.url = `${api}/${data.starting_equipment.url.match(/api\/(.*)$/)[1]}`;
		data.class_levels.url = `${api}/${data.class_levels.url.match(/api\/(.*)$/)[1]}`;
		data.subclasses.forEach((item, index, subclasses) => {
			subclasses[index].url = `${api}/${item.url.match(/api\/(.*)$/)[1]}`
		});

		if (data.spellcasting) data.spellcasting.url = `${api}/${data.spellcasting.url.match(/api\/(.*)$/)[1]}`;
		if (icon) data.image = icon;

		app.state.title = `${title}: ${data.name}`;
		return module.default(data);
	},

	async showMonsters(app) {
		const data = await fetch(`${api}/monsters`).then(response => response.json());
		const props = data.results.map(item => {
			item.id = item.url.match(/.?(\d+)$/)[1];
			item.url = `#monsters/${item.id}`;
			return item;
		});

		app.state.title = `${title}: Monsters`;
		return List({ items: props, sort: true, group: true });
	},

	async showMonster(id, app) {
		const [data, module] = await Promise.all([
			fetch(`${api}/monsters/${id}`).then(response => response.json()),
			import('./components/pages/monster.js'),
		]);

		app.state.title = `${title}: ${data.name}`;
		return module.default(data);
	},

	async showRaces(app) {
		const data = await fetch(`${api}/races`).then(response => response.json())
		const props = data.results.map(item => {
			item.id = item.url.match(/.?(\d+)$/)[1];
			item.url = `#races/${item.id}`;
			return item;
		});

		app.state.title = `${title}: Races`;
		return List({ items: props });
	},

	async showRace(id, app) {
		const [ abilities, props, module ] = await Promise.all([
			fetch(`${api}/ability-scores`).then(response => response.json()),
			fetch(`${api}/races/${id}`).then(response => response.json()),
			import('./components/pages/race.js'),
		]);
		props.abilities = abilities.results;
		props.image = `/images/races/${props.name.toLowerCase()}.png`;

		if (props.subraces) {
			props.subraces.forEach((item, index, subraces) => {
				subraces[index].url = `${api}/${item.url.match(/api\/(.*)$/)[1]}`
			});
		}

		app.state.title = `${title}: ${props.name}`;
		return module.default(props);
	},

	async showEquipment(app) {
		const data = await fetch(`${api}/equipment`).then(response => response.json())
		const items = data.results.map(item => {
			item.id = item.url.match(/.?(\d+)$/)[1];
			item.url = null; //`#equipment/${item.id}`;
			return item;
		});

		app.state.title = `${title}: Equipment`;
		return List({ items, sort: true, group: true });
	}
}

export { Controllers }
