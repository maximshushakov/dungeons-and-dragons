import { create } from '/js/tools.js';

function Item(caption, content) {
	if (!content) return null;
	return create('div', { className: 'section_item' }, 
		caption + ' ',
		create('span', {}, content),
	)
}

function SavingThrows(props) {
	const items = [];
	if (props.dexterity_save) items.push('DEX +' + props.dexterity_save);
	if (props.constitution_save) items.push('CON +' + props.constitution_save);
	if (props.wisdom_save) items.push('WIS +' + props.wisdom_save);
	if (props.charisma_save) items.push('CHA +' + props.charisma_save);
	if (props.intelligence_save) items.push('INT +' + props.intelligence_save);

	return items.join(', ') || 'none';
}

function AbilityScores(props) {
	const items = [];
	items.push('STR ' + props.strength);
	if (props.dexterity) items.push('DEX ' + props.dexterity);
	if (props.constitution) items.push('CON ' + props.constitution);
	if (props.wisdom) items.push('WIS ' + props.wisdom);
	if (props.charisma) items.push('CHA ' + props.charisma);
	if (props.intelligence) items.push('INT ' + props.intelligence);

	return items.join(', ');
}

function Description(props) {

	const element = (
		create('div', { className: 'content' },
			create('div', { className: 'content_header' },
				create('div', { className: 'content_header-caption' }, 
					create('h1', { className: 'content_header-title', textContent: props.name }),
					create('div', { textContent: `${props.type}, ${props.alignment}` }),
					create('div', { className: 'content_header-section' },
						Item('Armor Class', props.armor_class),
						Item('Hit Points', `${props.hit_points} (${props.hit_dice})`),
						Item('Speed', props.speed),
					),
				),
			),
			create('section', { className: 'section' },
				create('h2', { className: 'section_title' }, 'Ability Scores'),
				create('p', {}, AbilityScores(props)),
				create('h2', { className: 'section_title' }, 'Saving Throws'),
				create('p', {}, SavingThrows(props)),
			),
			create('section', { className: 'section' },	
				Item('Damage Resistances', props.damage_resistances),
				Item('Damage Immunities', props.damage_immunities),
				Item('Condition Immunities', props.condition_immunities),
				Item('Senses', props.senses),
				Item('Languages', props.languages),
				Item('Challenge', props.challenge_rating),
			),
		)
	);

	if (props.actions) {
		element.appendChild(
			create('section', { className: 'section' },	
				create('h2', { className: 'section_title' }, 'Actions'),
				...props.actions.map(action => Item(action.name, action.desc))
			)
		)
	}

	if (props.legendary_actions) {
		element.appendChild(
			create('section', { className: 'section' },	
				create('h2', { className: 'section_title' }, 'Legendary Actions'),
				...props.legendary_actions.map(action => Item(action.name, action.desc))
			)
		)
	}

	return element;
}

export { Description as MonsterDescription }