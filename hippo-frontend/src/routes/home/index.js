import { h } from 'preact';
import style from './style';

import { Query } from 'react-apollo';
import { route } from 'preact-router';
import gql from 'graphql-tag';
import { nth } from 'ramda';
import { Button, Empty } from '@jchn/preact-spectre';

const GET_ALL_PROJECTS_QUERY = gql`
	query {
		projects {
			id
			title
			description
		}
	}
`;

const routeToNewProject = e => route('new-project');
const ProjectsEmptyView = () => (
	<div class={style.home}>
		<Empty class={style.empty}>
			<Empty.Icon>
				<i class="icon icon-3x icon-plus" />
			</Empty.Icon>
			<Empty.Title>You have no projects</Empty.Title>
			<Empty.Subtitle>Click the button to create one</Empty.Subtitle>
			<Empty.Action>
				<Button kind="primary" onclick={routeToNewProject}>
					Start a Project
				</Button>
			</Empty.Action>
		</Empty>
	</div>
);

const redirectToProject = ({ id }) => route(`projects/${id}`);

const redirectOrRenderEmptyState = ({ projects }) => {
	const project = nth(0, projects);
	if (!project) return <ProjectsEmptyView />;
	redirectToProject(project);
};

const ProjectsLoading = () => (
	<div class={style.home}>
		<div class="loading" />
		<span>Getting Projects</span>
	</div>
);

const ProjectsLoadingError = () => (
	<div class={style.home}>
		<span>Error fetching projects..</span>
	</div>
);

const Project = () => (
	<Query query={GET_ALL_PROJECTS_QUERY}>
		{({ loading, error, data }) => {
			if (loading) return <ProjectsLoading />;
			if (error) return <ProjectsLoadingError />;
			if (data) return redirectOrRenderEmptyState({ projects: [] });
		}}
	</Query>
);

export default Project;
