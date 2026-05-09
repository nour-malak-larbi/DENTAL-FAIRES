import bcrypt from 'bcryptjs';
import prisma from './prisma';

async function seedUser() {
  const email = 'test@dentalfairies.com';
  const password = 'dental2026';
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: { password: hashedPassword },
    create: {
      name: 'Test User',
      email,
      password: hashedPassword,
      role: 'USER',
    },
  });

  console.log('✅ Test user created/updated:');
  console.log('   Email   :', email);
  console.log('   Password:', password);
  console.log('   Role    :', user.role);
  await prisma.$disconnect();
}

seedUser().catch((e) => {
  console.error(e);
  process.exit(1);
});
