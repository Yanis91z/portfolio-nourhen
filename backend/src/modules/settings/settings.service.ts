import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Settings } from '../../entities/settings.entity';
import { UpdateSettingsDto } from '../../dto/update-settings.dto';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Settings)
    private repo: Repository<Settings>,
  ) {}

  async get(): Promise<Settings> {
    const rows = await this.repo.find();
    if (rows.length === 0) {
      const settings = this.repo.create({
        primaryColor: '#6366f1',
        secondaryColor: '#8b5cf6',
        themeMode: 'dark',
      });
      return this.repo.save(settings);
    }
    return rows[0];
  }

  async update(dto: UpdateSettingsDto): Promise<Settings> {
    const settings = await this.get();
    Object.assign(settings, dto);
    return this.repo.save(settings);
  }
}
