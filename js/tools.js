const create = (tag, props, ...children) => {
	const element = document.createElement(tag);

	if (children) children.forEach(child => {
		if (!child) return;
		if (typeof child !== 'object') return element.textContent = child;
		if (child.nodeType) return element.appendChild(child);
		if (child.subscribe) return props.textContent = child;
	});

	if (props) Object.keys(props).forEach(prop => {
		if (typeof props[prop] === 'object' && props[prop].subscribe) {
			props[prop].subscribe(element, prop, props.values);
			return;
		}
		element[prop] = props[prop]
	})

	return element;
}

const createIcon = (shape, props, ...children) => {
	const element = document.createElementNS("http://www.w3.org/2000/svg", shape);
	if (props) Object.keys(props).forEach(prop => element.setAttribute(prop, props[prop]));
	if (children) children.forEach(child => element.appendChild(child));

	return element;
}

const asyncrender = (url, render, fail) => {
	const element = create('div', { className: 'fragment' });

	fetch(url)
		.then(response => {
			if (!response.ok) { fail(response); };
			return response.json();
		})
		.then(data => {
			element.classList.add('-loaded');
			element.appendChild(render(data));
		})
		.catch(e => {
			throw new Error(e);
			//fail(e);
		});

	return element;
}

const Observable = (data) => {
	const subscribers = new Map();

	return new Proxy({
		subscribe(key, element, prop, values = null) {
			if (!subscribers.has(element)) {
				subscribers.set(element, new Map());
			}
			subscribers.get(element).set(key, { prop, values });

			this.update(element, key, data[key]);
		},
		update(element, key, value) {
			const subscriber = subscribers.get(element);
			// if (element.getRootNode() === element) subscribers.delete(element);
			if (!subscriber.has(key)) return;

			const { prop, values } = subscriber.get(key);
			if (prop === 'class') {
				if (!values) {
					element.classList.remove(data[key]);
					element.classList.add(value)
				}
				if (values) {
					element.classList.remove(value ? values[1] : values[0]);
					element.classList.add(value ? values[0] : values[1])
				}
			} else {
				element[prop] = value;
			}
		},
		updateAll(key, value) {
			const elements = subscribers.keys();
			for (let element of elements) {
				this.update(element, key, value);
			}
		}
	}, {
		get(target, key) {
		    return { subscribe: target.subscribe.bind(target, key), toString: () => String(data[key]) }
		},

		set(target, key, value) {
		    target.updateAll(key, value);
		    if (!Object.is(data[key], value)) data[key] = value;
		    return true;
		}
	})
}

const extract = (items) => {
	return items.map(item => {
		return (item.from) ? extract(item.from) : item.name.replace('Skill: ', '')
	}).join(', ')
}

const score = (scores) => {
	return scores.map(score => `${score.ability_score.name} +${score.bonus}`).join(', ');
}

export { create, createIcon, asyncrender, Observable, extract, score }
