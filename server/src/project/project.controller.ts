import { Controller, Get, Post, Put, Body, UseGuards, Request, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { ProjectService } from './project.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProjectCreateDto } from './project.types';

@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: ProjectCreateDto, @Request() req) {
    return this.projectService.createProject(body, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    return this.projectService.findAllByUser(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
    @Request() req
  ) {
    return this.projectService.updateProject(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.removeProject(id);
  }
}
