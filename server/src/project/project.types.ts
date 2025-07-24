export interface ProjectCreateDto {
  name: string;
  owner: string;
  url: string;
  stars: number;
  forks: number;
  openIssues: number;
  createdAt?: Date;
}
