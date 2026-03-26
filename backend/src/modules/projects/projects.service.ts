import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../../entities/project.entity';
import { CreateProjectDto } from '../../dto/create-project.dto';
import { UpdateProjectDto } from '../../dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private repo: Repository<Project>,
  ) {}

  findAll(): Promise<Project[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Project> {
    const project = await this.repo.findOneBy({ id });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  create(dto: CreateProjectDto): Promise<Project> {
    const project = this.repo.create(dto);
    return this.repo.save(project);
  }

  async update(id: number, dto: UpdateProjectDto): Promise<Project> {
    await this.findOne(id);
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.repo.delete(id);
  }
}
