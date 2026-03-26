import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { About } from './entities/about.entity';
import { Settings } from './entities/settings.entity';

async function seed() {
  const ds = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432'),
    username: process.env.DATABASE_USER || 'yanis',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME || 'portfolio_nourhen',
    entities: [User, About, Settings],
    synchronize: true,
  });

  await ds.initialize();

  const userRepo = ds.getRepository(User);
  const existing = await userRepo.findOneBy({ email: 'admin@portfolio.com' });
  if (!existing) {
    const hashed = await bcrypt.hash('admin123', 10);
    await userRepo.save({ email: 'admin@portfolio.com', password: hashed });
    console.log('Admin user created: admin@portfolio.com / admin123');
  }

  const aboutRepo = ds.getRepository(About);
  const aboutRows = await aboutRepo.find();
  if (aboutRows.length === 0) {
    await aboutRepo.save({
      name: 'Nourhen',
      title: 'Étudiante Marketing Digital - Recherche alternance',
      description: 'Étudiante en Marketing Digital, passionnée par la stratégie digitale, la création de contenu et le branding.',
    });
    console.log('Default about created');
  }

  const settingsRepo = ds.getRepository(Settings);
  const settingsRows = await settingsRepo.find();
  if (settingsRows.length === 0) {
    await settingsRepo.save({
      primaryColor: '#6366f1',
      secondaryColor: '#8b5cf6',
      themeMode: 'dark',
    });
    console.log('Default settings created');
  }

  await ds.destroy();
  console.log('Seed complete!');
}

seed().catch(console.error);
