import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';


import ProjectList from '../components/ProjectList';
import SearchRepoModal from '../components/SearchRepoModal';
import { fetchProjects, addProject, removeProject, updateProject } from '../api/projectApi';
import { fetchRepoById } from '../api/githubApi';



export default function Home({ onLogout }: { onLogout: () => void }) {
    const [modalOpen, setModalOpen] = React.useState(false);
    const [refreshingId, setRefreshingId] = React.useState<number | null>(null);
    const [deleting, setDeleting] = React.useState(false);
    const queryClient = useQueryClient();


    const {data: projects, isLoading: isProjectsLoading} = useQuery({
      queryKey: ['projects'],
      queryFn: fetchProjects
    });

    const addMutation = useMutation({ 
        mutationFn: addProject,
        onSuccess: () => {
           setModalOpen(false);
           queryClient.invalidateQueries({ queryKey: ['projects'] });
        },
        onError: (error: Error) => {
          console.error('Error adding project:', error);    
        },
    });

    const deleteMutation = useMutation({
        mutationFn: removeProject,
        onMutate: () => setDeleting(true),
        onSettled: () => setDeleting(false),
        onSuccess: () => {
            console.log('Project removed successfully');
            queryClient.invalidateQueries({ queryKey: ['projects'] });
        },
        onError: (error: Error) => {
            console.error('Error removing project:', error);
        },
    });

    const onSelectRepo = (repo: any) => {
        console.log('Selected repo:', repo);
        addMutation.mutate({
        name: repo.full_name,
        owner: repo.owner.login,
        url: repo.html_url,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        openIssues: repo.open_issues_count,
        createdAt: repo.created_at,
        });
    }

    // Handler to refresh a project from GitHub and update it on the server
    const onRefresh = async (projectId: number) => {
        setRefreshingId(projectId);
        try {
            // Find the project by id
            const project = (projects || []).find((p: any) => p.id === projectId);
            if (!project) throw new Error('Project not found');
            // Fetch latest repo data from GitHub
            const repo = await fetchRepoById(project.name); // project.name should be 'owner/repo'
            // Prepare updated data
            const updatedData = {
                name: repo.full_name,
                owner: repo.owner.login,
                url: repo.html_url,
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                openIssues: repo.open_issues_count,
                createdAt: repo.created_at,
            };
            // Use utility to update project on server
            await updateProject(projectId, updatedData);
            queryClient.invalidateQueries({ queryKey: ['projects'] });
        } catch (err) {
            console.error('Error refreshing project:', err);
        } finally {
            setRefreshingId(null);
        }
    };

    return (
        <Box sx={{ height: '100vh', bgcolor: 'grey.50' }}>
            <AppBar position="fixed" color="default" elevation={1}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" fontWeight={700}>Projects</Typography>
                    <Box>
                        <Button onClick={() => setModalOpen(true)} sx={{ mr: 2 }} color="primary" variant="contained">Open Search Modal</Button>
                        <Button onClick={onLogout} color="error" variant="contained">Logout</Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box sx={{ pt: { xs: 7, sm: 8 }, px: 4, pb: 4, height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
                <SearchRepoModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onSelectRepo={onSelectRepo}
                />
                <Box sx={{ flex: 1, minHeight: 0 }}>
                <ProjectList
                    projects={projects || []}
                    isLoading={isProjectsLoading || deleting}
                    onRemove={id => deleteMutation.mutate(id)}
                    onRefresh={onRefresh}
                    refreshingId={refreshingId}
                />
                </Box>
            </Box>
        </Box>
    );
}
