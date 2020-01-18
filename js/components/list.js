import { create } from '/js/tools.js';

const Item = (url, title) => {
	const item = create('div', { className: 'list_item' },
		title,
		create('div', { className: 'list_item-wave' }),
	);

	if (url) {
		item.dataset.url = url;
		item.tabIndex = 0;
	}
	return item;
}

const Group = (caption, items) => {
	return create('div', { className: 'list-group' },
		create('h3', { className: 'list_caption' }, caption),
		...items.map(data => Item(data.url, data.name))
	)
}

export function List(props) {
	if (props.sort) props.items.sort((a,b) => a.name.localeCompare(b.name));
	if (props.group) {
		props.groups = props.items.reduce((groups, item) => {
			const letter = item.name[0];
			if (!groups[letter]) groups[letter] = [];
			groups[letter].push(item);
			return groups;
		}, {});
	}

	const items = props.groups ?
		Object.keys(props.groups).map(key => Group(key, props.groups[key])) :
		props.items.map(data => Item(data.url, data.name));

	const events = () => {
		return window.requestAnimationFrame(updateCaptions);
	}

	const updateCaptions = () => {
		const offset = element.offsetTop;
		items.forEach(group => {
			const rect = group.getBoundingClientRect();
			if (rect.top < offset && rect.bottom > offset * 2) {
				group.classList.add('-fixed');
			} else {
				group.classList.remove('-fixed');
			}
			if (rect.bottom <= offset * 2 && rect.bottom > 0) {
				group.classList.add('-bottom');
			} else {
				group.classList.remove('-bottom');
			}
		})
	}

	const element = (
		create('div', { className: 'content list' },
			...items
		)
	);

	window.addEventListener('scroll', events);
	element.onunmount = () => window.removeEventListener('scroll', events);

	return element;
}
