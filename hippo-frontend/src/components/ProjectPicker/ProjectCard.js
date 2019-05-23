import React from "react";
import { Card, Heading, Paragraph } from "evergreen-ui";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => (
  <Link to={`/projects/` + project.id}>
    <Card
      key={"pp-" + project.id}
      backgroundColor="white"
      elevation={0}
      height={120}
      display="flex"
      justifyContent="center"
      flexDirection="column"
      hoverElevation={1}
      padding={20}
      marginBottom={10}
      cursor="pointer"
    >
      <Heading size={500}>{project.title}</Heading>
      <Paragraph>{project.description}</Paragraph>
    </Card>
  </Link>
);

export default ProjectCard;
