import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../../entities/message.entity';
import { CreateMessageDto } from '../../dto/create-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private repo: Repository<Message>,
  ) {}

  findAll(): Promise<Message[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: number): Promise<Message> {
    const message = await this.repo.findOneBy({ id });
    if (!message) throw new NotFoundException('Message not found');
    return message;
  }

  create(dto: CreateMessageDto): Promise<Message> {
    const message = this.repo.create(dto);
    return this.repo.save(message);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.repo.delete(id);
  }
}
