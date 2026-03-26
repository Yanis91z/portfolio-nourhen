import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ name: 'short_description' })
  shortDescription: string;

  @Column({ name: 'long_description', type: 'text' })
  longDescription: string;

  @Column({ name: 'image_url', nullable: true })
  imageUrl: string;

  @Column('simple-array', { name: 'tech_stack', nullable: true })
  techStack: string[];

  @Column({ name: 'github_url', nullable: true })
  githubUrl: string;

  @Column({ name: 'demo_url', nullable: true })
  demoUrl: string;
}
