const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixPaths() {
  console.log('Fixing image paths...');

  // Fix Mindshares
  const mindshares = await prisma.mindshare.findMany();
  for (const m of mindshares) {
    if (m.image && !m.image.startsWith('/') && !m.image.startsWith('http')) {
      await prisma.mindshare.update({
        where: { id: m.id },
        data: { image: `/mindshares/${m.image}` }
      });
    }
  }

  // Fix Workshops
  const workshops = await prisma.workshop.findMany();
  for (const w of workshops) {
    if (w.posterFile && !w.posterFile.startsWith('/') && !w.posterFile.startsWith('http')) {
      await prisma.workshop.update({
        where: { id: w.id },
        data: { posterFile: `/workshops/${w.posterFile}` }
      });
    }
  }

  // Fix Webinars
  const webinars = await prisma.webinar.findMany();
  for (const web of webinars) {
    if (web.posterFile && !web.posterFile.startsWith('/') && !web.posterFile.startsWith('http')) {
      await prisma.webinar.update({
        where: { id: web.id },
        data: { posterFile: `/webinares/${web.posterFile}` }
      });
    }
  }

  console.log('Paths fixed successfully.');
}

fixPaths()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
