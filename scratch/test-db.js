const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Fetching webinars...');
    const webinars = await prisma.webinar.findMany();
    console.log('Success! Found webinars:', webinars.length);
    console.log(webinars);
  } catch (error) {
    console.error('Error fetching webinars:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
