import { Toolbar } from '/js/components/toolbar.js';
import { Navigation } from '/js/components/navigation.js';

import { Observable } from '/js/tools.js';
import { Controllers } from '/js/controllers.js';


const state = Observable({
	title: 'Dungeons & Dragons',
	isModal: false, // view mode
	isLoading: true, // for showing preloader
	isNavigationOpened: false, // for showing navigation drawer
})

const routes = {
	'#classes/{0,1}$': Controllers.showClasses,
	'#classes/(\\w+)': Controllers.showClass,
	'#races/{0,1}$': Controllers.showRaces,
	'#races/([\\w-]+)': Controllers.showRace,
	'#monsters/{0,1}$': Controllers.showMonsters,
	'#monsters/([\\w-]+)': Controllers.showMonster,
	'#equipment/{0,1}$': Controllers.showEquipment,
	default: Controllers.showClasses
}

const router = (route) => {
	const hash = route || document.location.hash;
	if (!hash) return routes['default'];

	for (const route in routes) {
		const params = hash.match(new RegExp(route));
		if (!params) continue;
		params.shift(); //first item of the `match` is the whole url string
		return routes[route].bind(null, ...params);
	}

	return routes['404'];
}

const App = {
	init() {
		this.component = null; // current component on the screen
		this.modal = null; 	// current modal on the screen
		this.state = state; // link to a global state;
		this.container = document.querySelector('.app');
		this.preloader = document.querySelector('.landing');

		this.container.appendChild(Toolbar({
			title: state.title,
			isModal: state.isModal,
			onMenuClick: () => state.isNavigationOpened = true,
			onBackClick: () => history.back(),
		}));

		this.container.appendChild(Navigation({
			isOpened: state.isNavigationOpened,
			onClose: () => state.isNavigationOpened = false,
		}));

		// bind `state.isLoading` to the preloader element to toggle `show/hide` classes
		state.isLoading.subscribe(this.preloader, 'class', ['-show', '-hide']);

		// show modals for links with [data-url]
		this.container.addEventListener('click', (e) => {
			if (!e.target.dataset.url) return;
			const url = e.target.dataset.url;
			const rect = e.target.getClientRects()[0];
			e.target.dataset.offsetTop = rect.top;
			e.target.dataset.offsetLeft = rect.left;
			this.changeState(router(url), 'modal', url, e.target);
		});

		// add class for animating loaded images
		document.addEventListener('load', (e) => e.target.classList.add('-loaded'), true);

		this.changeState(router());
		window.addEventListener('popstate', (e) => this.changeState(router()));
		window.addEventListener('beforeunload', (e) => history.replaceState({ scrollTop: window.pageYOffset }, state.title));
		// prevent page jumps when hash is changed
		history.scrollRestoration = 'manual';
	},

	async changeState(controller, type = 'page', route = null, ...params) {
		state.isLoading = true;
		state.isNavigationOpened = false;

		try {
			const component = await controller(this, ...params);
			if (type === 'modal') history.replaceState({ scrollTop: window.pageYOffset }, state.title);
			if (this.component) this.component.remove();
			if (this.component && this.component.onunmount) this.component.onunmount();
			if (route) history.pushState({ prev: location.hash, type }, state.title, route);

			this.component = component;
			this.container.appendChild(component);

			if (type === 'page' && history.state && history.state.scrollTop) {
				window.scroll(0, history.state.scrollTop);
			} else {
				window.scroll(0, 0);
			}

			state.isModal = (type === 'modal') ? true : false;
			state.isLoading = false;
		} catch(err) {
			console.log(err);
		}
	},
}


if ('serviceWorker' in navigator && location.protocol === 'https:') {
	navigator.serviceWorker.register('/sw.js').then(registration => {
		navigator.serviceWorker.ready.then(() => App.init());
	}, err => {
		console.log('ServiceWorker registration failed: ', err);
	});
}
else {
	App.init();
}



