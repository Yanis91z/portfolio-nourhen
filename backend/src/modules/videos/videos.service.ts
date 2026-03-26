import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from '../../entities/video.entity';
import { CreateVideoDto } from '../../dto/create-video.dto';
import { UpdateVideoDto } from '../../dto/update-video.dto';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private repo: Repository<Video>,
  ) {}

  findAll(): Promise<Video[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Video> {
    const video = await this.repo.findOneBy({ id });
    if (!video) throw new NotFoundException('Video not found');
    return video;
  }

  create(dto: CreateVideoDto): Promise<Video> {
    const video = this.repo.create(dto);
    return this.repo.save(video);
  }

  async update(id: number, dto: UpdateVideoDto): Promise<Video> {
    await this.findOne(id);
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.repo.delete(id);
  }
}
