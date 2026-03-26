import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { About } from '../../entities/about.entity';
import { UpdateAboutDto } from '../../dto/update-about.dto';

@Injectable()
export class AboutService {
  constructor(
    @InjectRepository(About)
    private repo: Repository<About>,
  ) { }

  async get(): Promise<About> {
    const rows = await this.repo.find();
    if (rows.length === 0) {
      const about = this.repo.create({
        name: 'Nourhen Ghlissi',
        title: 'Étudiante Marketing Digital à la recherche d\'une alternance',
        description: '',
      });
      return this.repo.save(about);
    }
    return rows[0];
  }

  async update(dto: UpdateAboutDto): Promise<About> {
    const about = await this.get();
    Object.assign(about, dto);
    return this.repo.save(about);
  }
}
