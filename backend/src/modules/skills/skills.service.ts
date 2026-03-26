import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from '../../entities/skill.entity';
import { CreateSkillDto } from '../../dto/create-skill.dto';
import { UpdateSkillDto } from '../../dto/update-skill.dto';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private repo: Repository<Skill>,
  ) {}

  findAll(): Promise<Skill[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Skill> {
    const skill = await this.repo.findOneBy({ id });
    if (!skill) throw new NotFoundException('Skill not found');
    return skill;
  }

  create(dto: CreateSkillDto): Promise<Skill> {
    const skill = this.repo.create(dto);
    return this.repo.save(skill);
  }

  async update(id: number, dto: UpdateSkillDto): Promise<Skill> {
    await this.findOne(id);
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.repo.delete(id);
  }
}
