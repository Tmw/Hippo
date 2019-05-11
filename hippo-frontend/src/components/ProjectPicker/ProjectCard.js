import React from "react";
import { Card, Heading, Paragraph } from "evergreen-ui";

const ProjectCard = ({ project, onClick }) => (
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
    onClick={onClick}
  >
    <Heading size={500}>{project.title}</Heading>
    <Paragraph>{project.description}</Paragraph>
  </Card>
);

export default ProjectCard;
