const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const prisma = new PrismaClient();

async function fixPathsSmart() {
  console.log('Smart-fixing image paths...');
  const publicDir = path.join(process.cwd(), 'public');
  const folders = ['webinares', 'mindshares', 'workshops'];

  const findFile = (filename) => {
    for (const folder of folders) {
      if (fs.existsSync(path.join(publicDir, folder, filename))) {
        return `/${folder}/${filename}`;
      }
    }
    return null;
  };

  // Fix Mindshares
  const mindshares = await prisma.mindshare.findMany();
  for (const m of mindshares) {
    const rawName = m.image?.split('/').pop();
    if (rawName && !m.image.startsWith('http')) {
      const correctPath = findFile(rawName);
      if (correctPath) {
        await prisma.mindshare.update({ where: { id: m.id }, data: { image: correctPath } });
      }
    }
  }

  // Fix Workshops
  const workshops = await prisma.workshop.findMany();
  for (const w of workshops) {
    const rawName = w.posterFile?.split('/').pop();
    if (rawName && !w.posterFile.startsWith('http')) {
      const correctPath = findFile(rawName);
      if (correctPath) {
        await prisma.workshop.update({ where: { id: w.id }, data: { posterFile: correctPath } });
      }
    }
  }

  // Fix Webinars
  const webinars = await prisma.webinar.findMany();
  for (const web of webinars) {
    const rawName = web.posterFile?.split('/').pop();
    if (rawName && !web.posterFile.startsWith('http')) {
      const correctPath = findFile(rawName);
      if (correctPath) {
        await prisma.webinar.update({ where: { id: web.id }, data: { posterFile: correctPath } });
      }
    }
  }

  console.log('Smart paths fixed successfully.');
}

fixPathsSmart()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
