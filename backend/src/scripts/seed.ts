import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma';

async function main() {
  console.log('🌱 Seeding database...');

  // Ambil credentials dari .env
  const adminUsername = process.env.ADMIN_USERNAME || 'Admin';
  const adminPassword = process.env.ADMIN_PASSWORD || '12345678';

  // Hash password admin
  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  // Buat atau update admin user
  const admin = await prisma.user.upsert({
    where: { username: adminUsername },
    update: { password: hashedPassword, role: 'ADMIN' },
    create: {
      username: adminUsername,
      password: hashedPassword,
      nama: 'Administrator',
      email: 'admin@fabiebsky.com',
      role: 'ADMIN',
    },
  });

  console.log(`✅ Admin user siap: ${admin.username} (role: ${admin.role})`);
  console.log(`   Password: ${adminPassword} (dari .env ADMIN_PASSWORD)`);
  console.log('\n🎉 Seeding selesai!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
