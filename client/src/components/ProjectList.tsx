import React from 'react';
import { List, ListItem, CircularProgress, Typography } from '@mui/material';
import ProjectCard from './ProjectCard';

interface ProjectListProps {
  projects: any[];
  isLoading: boolean;
  onRemove: (id: number) => void;
  onRefresh: (id: number) => void;
  refreshingId?: number | null;
}

export default function ProjectList({ projects, isLoading, onRemove, onRefresh, refreshingId }: ProjectListProps) {
  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
        <CircularProgress />
      </div>
    );
  }
  if (!projects || projects.length === 0) {
    return <Typography color="textSecondary">No projects found.</Typography>;
  }
  return (
    <List sx={{ maxHeight: '100%'}}>
      {projects.map((project: any) => (
        <ListItem key={project.id} alignItems="flex-start">
          <ProjectCard
            project={project}
            onRemove={() => onRemove(project.id)}
            onRefresh={() => onRefresh(project.id)}
            refreshing={refreshingId === project.id}
          />
        </ListItem>
      ))}
    </List>
  );
}
