import { create, asyncrender, extract } from '/js/tools.js';
import { Icon } from '/js/components/icons.js';

const format = (name, quantity) => name += (quantity > 1) ? ' (' + quantity + ')' : '';

function Equipment(props) {
	const element = create('section', null, create('span', {}, props.name))

	if (props.equipment_category) {
		element.appendChild(create('span', {}, ` (${props.equipment_category.name})`));
	}

	if (props.damage) {
		element.appendChild(create('span', {}, ` (Damage Dice: ${props.damage.damage_dice})`));
	}

	if (props.contents) {
		const equipments = props.contents.map(equipment => format(equipment.item.name, equipment.quantity)).join(', ')
		element.appendChild(create('p', { className: 'section_item'}, equipments));
	}

	return element;
}

function Subclasses(props) {
	return create('div', { className: 'section_list' },
		create('h3', { className: 'section_subtitle', textContent: props.name }),
		create('div', { textContent: 'Flavor: ' + props.subclass_flavor }),
		create('p', { textContent: props.desc })
	)
}

function Spellcasting(props) {
	return create('div', { className: 'section_list' },
		...props.info.map(data => {
			return create('div', null,
				create('h3', { className: 'section_subtitle',  textContent: data.name }),
				create('div', { textContent: data.desc })
			)
		})
	)
}

function Description(props) {
	props.image = Icon({ image: `/images/symbols/${props.name.toLowerCase()}.jpg` });

	const choices = props.proficiency_choices.map(choices => {
		const list = extract(choices.from);

		return create('p', {
			className: 'section_list',
			textContent: `Choose ${choices.choose} from: ` + list
		})
	});

	const element = (
		create('div', { className: 'content' },
			create('div', { className: 'content_header' },
				create('div', { className: 'content_header-icon' }, props.image),
				create('div', { className: 'content_header-caption' },
					create('h1', { className: 'content_header-title', textContent: props.name }),
					create('div', { textContent: `Hit Die: ${props.hit_die}` })
				)
			),
			create('section', { className: 'section' },
				create('h2', { className: 'section_title', textContent: 'Proficiencies' }),
				create('p', { className: 'section_list', textContent: extract(props.proficiencies) }),
				create('h2', { className: 'section_title', textContent: 'Skills' }),
				...choices,
				create('h2', { className: 'section_title', textContent: 'Saving Throws' }),
				create('p', { className: 'section_list' , textContent: extract(props.saving_throws) })
			),
			create('section', { className: 'section' },
				create('h2', { className: 'section_title', textContent: 'Subclasses' }),
				...props.subclasses.map(subclass => asyncrender(subclass.url, Subclasses))
			),
		)
	);

	if (props.spellcasting) {
		element.appendChild(
			create('section', { className: 'section' },
				create('h2', { className: 'section_title', textContent: 'Spellcasting' }),
				Spellcasting(props.spellcasting)
			)
		)
	}

	if (props.starting_equipment.length) {
		element.appendChild(
			create('section', { className: 'section' },
				create('h2', { className: 'section_title', textContent: 'Starting Equipment' }),
				...props.starting_equipment.map(starting_equipment => asyncrender(starting_equipment.equipment.url, Equipment))
			)
		)
	}

	return element;
}

export default Description
