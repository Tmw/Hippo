import { h } from 'preact';
import style from './style';

import Card from '../card';

const CardList = ({ cards }) => (
	<section>
		{cards.map(c => (
			<Card title={c.title} description={c.description} />
		))}
	</section>
);

export default CardList;
