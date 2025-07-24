// GitHub API utility

export const fetchRepos = async (search: string) => {
  if (!search) return null;
  const res = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(search)}`);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
};

// Fetch a single repository by full_name (e.g., 'facebook/react')
export const fetchRepoById = async (fullName: string) => {
  if (!fullName) return null;
  const res = await fetch(`https://api.github.com/repos/${fullName}`);
  if (!res.ok) throw new Error('Failed to fetch repo');
  return res.json();
};
