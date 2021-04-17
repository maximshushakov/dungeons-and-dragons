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
			item.id = item.index;
			item.url = `#classes/${item.id}`;
			return item;
		});
		app.state.title = `Classes / ${title}`;
		return Icons(props);
	},

	async showClass(id, app, icon) {
		const [data, module] = await Promise.all([
			fetch(`${api}/classes/${id}`).then(response => response.json()),
			import('./components/pages/class.js'),
		]);

		data.starting_equipment.forEach((item, index, starting_equipment) => {
			starting_equipment[index].equipment.url = `${api}/${item.equipment.url.match(/api\/(.*)$/)[1]}`
		});

		data.subclasses.forEach((item, index, subclasses) => {
			subclasses[index].url = `${api}/${item.url.match(/api\/(.*)$/)[1]}`
		});

		if (icon) data.image = icon;

		app.state.title = `${data.name} / Classes / ${title}`;
		return module.default(data);
	},

	async showMonsters(app) {
		const data = await fetch(`${api}/monsters`).then(response => response.json());
		const props = data.results.map(item => {
			item.id = item.url.match(/.?([\w-]+)$/)[1];
			item.url = `#monsters/${item.id}`;
			return item;
		});

		app.state.title = `Monsters / ${title}`;
		return List({ items: props, sort: true, group: true });
	},

	async showMonster(id, app) {
		const [data, module] = await Promise.all([
			fetch(`${api}/monsters/${id}`).then(response => response.json()),
			import('./components/pages/monster.js'),
		]);

		app.state.title = `${data.name} / Monsters / ${title}`;
		return module.default(data);
	},

	async showRaces(app) {
		const data = await fetch(`${api}/races`).then(response => response.json())
		const props = data.results.map(item => {
			item.id = item.index;
			item.url = `#races/${item.id}`;
			return item;
		});

		app.state.title = `Races / ${title}`;
		return List({ items: props });
	},

	async showRace(id, app) {
		const [ props, module ] = await Promise.all([
			// fetch(`${api}/ability-scores`).then(response => response.json()),
			fetch(`${api}/races/${id}`).then(response => response.json()),
			import('./components/pages/race.js'),
		]);
		// props.abilities = abilities.results;
		props.image = `/images/races/${props.name.toLowerCase()}.png`;

		if (props.subraces) {
			props.subraces.forEach((item, index, subraces) => {
				subraces[index].url = `${api}/${item.url.match(/api\/(.*)$/)[1]}`
			});
		}

		app.state.title = `${props.name} / ${title}`;
		return module.default(props);
	},

	async showEquipments(app) {
		const data = await fetch(`${api}/equipment`).then(response => response.json())
		const items = data.results.map(item => {
			item.id = item.index;
			item.url = `#equipment/${item.id}`;
			return item;
		});

		app.state.title = `Equipment / ${title}`;
		return List({ items, sort: true, group: true });
	},

	async showEquipment(id, app) {
		const [data, module] = await Promise.all([
			fetch(`${api}/equipment/${id}`).then(response => response.json()),
			import('./components/pages/equipment.js'),
		]);

		app.state.title = `${data.name} / Equipment / ${title}`;
		return module.default(data);
	},
}

export { Controllers }
