import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'admin@dentalfairies.com';
  const password = 'adminpassword123';
  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { password: hashedPassword, role: 'ADMIN' },
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: 'Admin Dental Fairies',
      role: 'ADMIN'
    }
  });

  console.log('Admin user created/updated:', admin.email);
  console.log('Password:', password);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
