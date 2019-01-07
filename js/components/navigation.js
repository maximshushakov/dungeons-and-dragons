import { create, createIcon } from '/js/tools.js';

const link = (url, title) => {
	return create('a', { className: 'navigation_link', href: url, textContent: title, id: url.replace('#', '') }, 
		create('div', { className: 'navigation_link-wave' })
	)
}

export function Navigation(props) {
	const element = (
		create('div', { className: 'navigation', class: props.isOpened, values: ['-opened', ['-closed']] },
			create('div', { className: 'navigation_drawer' },
				link('#classes/', 	'Classes'),
				link('#races/', 	'Races'),
				link('#monsters/', 	'Monsters'),
				link('#equipment/', 'Equipment'),
			)
		)
	);

	const events = (e) => {
		if (e.target.classList.contains('navigation')) {
			props.onClose();		
		}
	};

	element.addEventListener('click', events);

	return element;
}
