import { create, asyncrender, extract, score } from '/js/tools.js';

function Subrace(props) {
	console.log(props);
	// if (!props) return create('div', { textContent: props.name });

	return create('div', { className: 'section_list' },
		create('h3', { className: 'section_subtitle', textContent: props.name }),
		// create('div', { textContent: extract(props['starting_proficiencies']) }),
		// create('div', { textContent: extract(props['racial_traits']) }),
		// create('div', { textContent: score(abilities, props.ability_bonuses) }),
		// create('p', { className: 'section_list', textContent: props.desc })
	)
}

function Description(props) {
	const element = (
		create('div', { className: 'content' },
			create('div', { className: 'content_header' },
				create('div', { className: 'content_header-caption' },
					create('h1', { className: 'content_header-title', textContent: props.name }),
					create('div', { textContent: `Speed: ${props.speed}` }),
					create('p', { className: 'section_title', textContent: 'Racial Traits' }),
					create('div', { textContent: extract(props.traits) || 'none' }),
				),
				create('div', { className: 'content_header-image' },
					create('img', { src: props.image })
				),
			),
			create('section', { className: 'section' },
				create('h2', { className: 'section_title', textContent: 'Ability Score Increase' }),
				create('p', { className: 'section_list' , textContent: score(props.ability_bonuses) }),
			),
			create('section', { className: 'section' },
				create('h2', { className: 'section_title', textContent: 'Alignment' }),
				create('p', { className: 'section_list' , textContent: props.alignment }),
				create('h2', { className: 'section_title', textContent: 'Age' }),
				create('p', { className: 'section_list' , textContent: props.age }),
				create('h2', { className: 'section_title', textContent: `Size: ${props.size}` }),
				create('p', { className: 'section_list' , textContent: props.size_description }),
			),
			create('section', { className: 'section' },
				create('h2', { className: 'section_title', textContent: 'Languages' }),
				create('div', { textContent: extract(props.languages) }),
				create('p', { className: 'section_list' , textContent: props.language_desc }),
			),
		)
	);

	if (props.starting_proficiencies && props.starting_proficiencies.length) {
		element.appendChild(
			create('section', { className: 'section' },
				create('h2', { className: 'section_title'}, 'Starting Proficiencies'),
				create('p', {}, extract(props.starting_proficiencies)),
			),
		)
	}

	if (props.subraces && props.subraces.length) {
		element.appendChild(
			create('section', { className: 'section' },
				create('h2', { className: 'section_title', textContent: 'Subraces' }),
				props.subraces.map(subrace => asyncrender(subrace.url, Subrace)) //.bind(null, props.abilities, subrace.name)))
			),
		)
	}

	return element;
}

export default Description
