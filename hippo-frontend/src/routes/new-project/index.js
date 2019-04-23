import { h, Component } from 'preact';
import style from './style';

import { Mutation } from 'react-apollo';
import { route } from 'preact-router';
import gql from 'graphql-tag';
import { Button, Form, Grid } from '@jchn/preact-spectre';

const CREATE_PROJECT = gql`
	mutation CreateProject($project: ProjectCreateParams) {
		createProject(project: $project) {
			successful
			project {
				id
			}
			errors {
				message
			}
		}
	}
`;

class NewProject extends Component {
	handleCancel = e => {
		route('/');
	};

	render() {
		return (
			<Mutation mutation={CREATE_PROJECT}>
				{(createProject, { data }) => (
					<div class={style.form}>
						<Grid>
							<Grid.Columns>
								<Grid.Col col={12}>
									<h1>Create a new project</h1>
								</Grid.Col>

								<Grid.Col col={12}>
									<Form.Input
										placeholder="Name"
										ref={elm => (this.projectNameInput = elm)}
									/>
								</Grid.Col>

								<Grid.Col col={6} align="right">
									<Button onclick={this.handleCancel}>Cancel</Button>
									<Button
										active
										onclick={e => {
											const projectTitle = this.projectNameInput.base.value;
											createProject({
												variables: {
													project: {
														title: projectTitle,
														description: 'to be implemented..'
													}
												}
											});
										}}
									>
										Create
									</Button>
								</Grid.Col>
							</Grid.Columns>
						</Grid>
						<br />
					</div>
				)}
			</Mutation>
		);
	}
}

export default NewProject;
