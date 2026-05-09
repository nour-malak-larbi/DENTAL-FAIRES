import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const webinars = [
    {
      title: "Canal disinfection in advanced endodontics",
      speaker: "Dr. Nadjib Mohamedi",
      speakerTitle: "Dental Surgeon",
      date: "Tuesday 08, July | 20:00",
      category: "Endodontics",
      categoryLabel: "Endodontics",
      description: "A deep dive into advanced canal disinfection techniques in modern endodontics. Graduate in Endodontics - Italy, Aesthetic Dentistry - France.",
      posterFile: "WhatsApp Image 2026-04-20 at 21.14.55.jpeg"
    },
    {
      title: "From traditional to digital: the new face of DENTISTRY",
      speaker: "Dr. SAIDI Ibrahim",
      speakerTitle: "Dental Surgeon",
      date: "Saturday 12, July | 20:00",
      category: "Digital Dentistry",
      categoryLabel: "Digital Dentistry",
      description: "Exploring the transition from traditional methods to digital workflows in modern dentistry. Graduate from University of Genoa, Italy.",
      posterFile: "WhatsApp Image 2026-04-20 at 21.14.56.jpeg"
    },
    {
      title: "Teeth Whitening Myths and Modern Techniques",
      speaker: "Dr. Mariam Mohsen Mostafa",
      speakerTitle: "Egyptian Dentist",
      date: "Friday 20, February | 22:00",
      category: "Aesthetic Dentistry",
      categoryLabel: "Aesthetic Dentistry",
      description: "Professional vs over-the-counter protocols, sensitivity management, and safe whitening procedures. Founder of Luceat.",
      posterFile: "WhatsApp Image 2026-04-20 at 21.14.59 (2).jpeg"
    }
  ];

  for (const w of webinars) {
    await prisma.webinar.upsert({
      where: { id: `seed-${w.title.toLowerCase().replace(/\s+/g, '-')}` },
      update: w,
      create: {
        id: `seed-${w.title.toLowerCase().replace(/\s+/g, '-')}`,
        ...w
      }
    });
  }

  console.log('Sample webinars seeded successfully.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
