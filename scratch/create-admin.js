const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const email = 'admin@dentalfairies.com';
  const password = 'admin123456';
  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.user.upsert({
    where: { email },
    update: { role: 'ADMIN' },
    create: {
      email,
      name: 'Super Admin',
      password: hashedPassword,
      role: 'ADMIN'
    }
  });

  console.log('✅ Admin user ready!');
  console.log('📧 Email:', email);
  console.log('🔑 Password:', password);
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
