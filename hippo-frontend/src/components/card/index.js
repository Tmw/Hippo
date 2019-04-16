import { h } from 'preact';
import style from './style';

import { Card as BaseCard } from '@jchn/preact-spectre';

const Card = ({ title, description }) => (
	<BaseCard class={style.hcard}>
		<BaseCard.Header>
			<BaseCard.Title class="h5">{title}</BaseCard.Title>
			<BaseCard.Subtitle class="text-gray">{description}</BaseCard.Subtitle>
		</BaseCard.Header>
	</BaseCard>
);

export default Card;
