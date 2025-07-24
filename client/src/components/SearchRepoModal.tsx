import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  TextField,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Typography,
  Box,
} from '@mui/material';



import { useQuery } from '@tanstack/react-query';
import { fetchRepos } from '../api/githubApi';
import { useDebounce } from '../hooks/useDebounce';


interface SearchRepoModalProps {
  open: boolean;
  onClose: () => void;
  onSelectRepo: (repo: any) => void;
}

export default function SearchRepoModal({
  open,
  onClose,
  onSelectRepo,
}: SearchRepoModalProps) {
  

  const [search, setSearch] = React.useState('');
  const debouncedSearch = useDebounce(search, 1000);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['repos', debouncedSearch],
    queryFn: () => fetchRepos(debouncedSearch),
    enabled: open && !!debouncedSearch,
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Search GitHub Repositories
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
            <span aria-hidden="true">&times;</span>
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <TextField
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search..."
          fullWidth
          autoFocus
          margin="normal"
        />
        {isLoading && <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}><CircularProgress /></Box>}
        {isError && <Typography color="error">{(error as Error).message}</Typography>}
        {data && data.items && (
          <List sx={{ maxHeight: 300, overflow: 'auto' }}>
            {data.items.map((repo: any) => (
              <ListItem key={repo.id} alignItems="flex-start" divider>
                <ListItemText
                  sx={{ cursor: 'pointer' }}
                  onClick={() => onSelectRepo(repo)}
                  primary={<a href={repo.html_url} target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', textDecoration: 'none' }}>{repo.full_name}</a>}
                  secondary={repo.description}
                />
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
}
