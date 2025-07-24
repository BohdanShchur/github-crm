
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { User } from '../user/user.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createProject(data: { name: string; owner: string; url: string; stars: number; forks: number; openIssues: number; createdAt?: Date }, userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');
    const project = this.projectRepository.create({ ...data, users: [user] });
    await this.projectRepository.save(project);
    return project;
  }


  async updateProject(id: number, data: Partial<Project>) {
    const project = await this.projectRepository.findOne({ where: { id } });
    if (!project) throw new Error('Project not found');
    Object.assign(project, data);
    await this.projectRepository.save(project);
    return project;
  }

  async removeProject(id: number) {
    await this.projectRepository.delete(id);
    return { deleted: true };
  }

  async findAllByUser(userId: number) {
    return this.projectRepository
      .createQueryBuilder('project')
      .leftJoin('project.users', 'user')
      .where('user.id = :userId', { userId })
      .orderBy('project.createdAt', 'DESC')
      .getMany();
  }
}
