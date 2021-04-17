import { create } from '/js/tools.js';

function Item(caption, content) {
	if (!content) return null;
	return create('div', { className: 'section_item' },
		caption + ' ',
		create('span', {}, content),
	)
}

function Description(props) {

	const element = (
		create('div', { className: 'content' },
			create('div', { className: 'content_header' },
				create('div', { className: 'content_header-caption' },
					create('h1', { className: 'content_header-title', textContent: props.name }),
					create('div', { textContent: `${props.equipment_category.name}${props.gear_category ? ', ' + props.gear_category.name : ''}` }),
				),
			),
		)
	);

	if (props.desc) {
		element.appendChild(
			create('section', { className: 'section' },
				create('h2', { className: 'section_title' }, 'Description'),
				...props.desc.map(item => create('p', { textContent: item }))
			),
		)
	} else {
		element.appendChild(
			create('section', { className: 'section' },
				create('p', { textContent: 'No description' })
			),
		)
	}

	return element;
}

export default Description
