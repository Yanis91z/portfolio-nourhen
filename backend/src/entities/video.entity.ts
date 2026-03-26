import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('videos')
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'video_url' })
  videoUrl: string;
}
