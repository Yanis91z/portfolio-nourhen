import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('about')
export class About {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'Nourhen Ghlissi' })
  name: string;

  @Column({ default: 'Étudiante Marketing Digital à la recherche d\'une alternance' })
  title: string;

  @Column({ type: 'text', default: '' })
  description: string;

  @Column({ name: 'photo_url', nullable: true })
  photoUrl: string;
}
