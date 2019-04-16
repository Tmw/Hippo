import { h } from 'preact';
import style from './style';
import { Panel } from '@jchn/preact-spectre';
import CardList from '../card-list';

const cards = [
	{
		title: 'This is something to-do',
		description: "It'll be here until its done"
	},
	{
		title: 'Another card',
		description: 'Cause one is not enough, eh!'
	},
	{
		title: 'Ha look! Even more!',
		description: "Yeah.. It's more."
	},
	{
		title: 'Im running out..',
		description: 'out of ideas!'
	},
	{
		title: 'last one then?',
		description: 'yeah..'
	}
];

const Lane = props => (
	<Panel class={style.lane}>
		<Panel.Header>
			<Panel.Title class="h6">{props.title}</Panel.Title>
		</Panel.Header>
		<Panel.Body>
			<CardList cards={cards} />
		</Panel.Body>
	</Panel>
);

export default Lane;
