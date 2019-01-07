import { create, createIcon } from '/js/tools.js';

const icons = {
	'menu': create('div', { className: 'toolbar_icon -icon-menu' }, 
		createIcon('svg', { viewBox: '0 0 24 24' },
			createIcon('path', { d: 'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z', fill: 'currentColor'})
		)
	),
	'back': create('div', { className: 'toolbar_icon -icon-back' }, 
		createIcon('svg', { viewBox: '0 0 24 24' },
			createIcon('path', { d: 'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z', fill: 'currentColor'})
		)
	)
}

export function Toolbar(props) {
	const element = (
		create('div', { className: 'toolbar', class: props.isModal, values: ['-type-modal', '-type-page'] },
			create('div', { className: 'toolbar_container' },
				create('div', { className: 'toolbar_icons', tabIndex: 0 }, 
					icons.menu,
					icons.back,
					create('div', { className: 'toolbar_icons-wave' })
				),
				create('div', { className: 'toolbar_title', textContent: props.title })
			)
		)
	);

	const events = (e) => {
		if (e.target === icons.menu) {
			props.onMenuClick();
		}
		if (e.target === icons.back) {
			props.onBackClick();		
		}
	};

	element.addEventListener('click', events);

	return element;
}
