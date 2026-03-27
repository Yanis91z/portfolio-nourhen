import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('about')
export class About {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  title: string;

  @Column({ type: 'text', default: '' })
  description: string;

  @Column({ name: 'photo_url', nullable: true })
  photoUrl: string;

  @Column({ type: 'jsonb', nullable: true, default: null })
  stats: { value: string; label: string }[] | null;
}
