import { h } from 'preact';
import style from './style';
import Lane from '../../components/lane';

const Project = () => (
	<div class={'project ' + style.project}>
		<Lane title="To Do" />
		<Lane title="Doing" />
		<Lane title="QA" />
		<Lane title="Done" />
	</div>
);

export default Project;
