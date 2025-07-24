import React from 'react';
import { Box, Typography, Button, Paper, CircularProgress } from '@mui/material';

export default function ProjectCard({ project, onRemove, onRefresh, refreshing }: { project: any; onRemove: () => void; onRefresh: () => void; refreshing?: boolean }) {
  return (
    <Paper sx={{ width: '100%', p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box>
        <Typography variant="h6">{project.name}</Typography>
        <Typography variant="body2" color="textSecondary">{project.owner}</Typography>
        <Typography variant="body1">Stars: {project.stars} | Forks: {project.forks} | Open Issues: {project.openIssues}</Typography>
        <Typography variant="body2" color="textSecondary">Created At: {new Date(project.createdAt).toLocaleDateString()}</Typography>
      </Box>
      <Box gap={2} display="flex" flexDirection="column" alignItems="flex-end">
        <Button
          variant="outlined"
          color="error"
          onClick={onRemove}
          sx={{ mt: 2 }}
        >
          Remove Project
        </Button>
        <Button
          variant="outlined"
          color="success"
          onClick={onRefresh}
          sx={{ mt: 2 }}
          disabled={refreshing}
          endIcon={refreshing ? <CircularProgress size={18} /> : null}
        >
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </Button>
      </Box>
    </Paper>
  );
}
