import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('settings')
export class Settings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'primary_color', default: '#6366f1' })
  primaryColor: string;

  @Column({ name: 'secondary_color', default: '#8b5cf6' })
  secondaryColor: string;

  @Column({ name: 'theme_mode', default: 'dark' })
  themeMode: string;
}
