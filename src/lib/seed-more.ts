import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // SEED MINDSHARES
  const mindshares = [
    {
      title: "Mastering the Cantilever Bridge",
      category: "Prosthodontics",
      date: "Thursday 17, July",
      author: "Dr. Guerfi Karima",
      content: "Detailed insights into cantilever bridge design and implementation. graduate of the Faculty of Tizi Ouzou. Owner of Guerfi Dental Care.",
      excerpt: "Mastering the complexities of cantilever bridges in modern prosthodontics.",
      image: "/webinares/WhatsApp Image 2026-04-20 at 21.14.56 (2).jpeg",
      tags: ["Bridge", "Prosthodontics", "DentalCare"]
    },
    {
      title: "La chirurgie d'assainissement parodontale",
      category: "Parodontologie",
      date: "28.10.2025",
      author: "Dr. EL OUCHDI FETHALLAH",
      content: "Exploring surgical techniques for periodontal sanitation. Les lambeaux d'accès.",
      excerpt: "Expert techniques for periodontal surgery and access flaps.",
      image: "/webinares/WhatsApp Image 2026-04-20 at 21.14.58.jpeg",
      tags: ["Surgery", "Periodontology", "Flaps"]
    }
  ];

  for (const m of mindshares) {
    await prisma.mindshare.upsert({
      where: { id: `seed-${m.title.toLowerCase().replace(/\s+/g, '-')}` },
      update: m,
      create: {
        id: `seed-${m.title.toLowerCase().replace(/\s+/g, '-')}`,
        ...m
      }
    });
  }

  // SEED WORKSHOPS
  const workshops = [
    {
      title: "Injection Moulding Technique",
      subtitle: "Aesthetic Injectable Composites",
      category: "Aesthetic Dentistry",
      instructor: "Dr. Mohamed Amine Redouane",
      description: "Hands-on workshop on injection moulding for aesthetic composites. Owner of Smart dental center.",
      posterFile: "/webinares/WhatsApp Image 2026-04-20 at 21.14.57.jpeg",
      price: "15000 DZD",
      level: "Intermediate",
      tags: ["Aesthetics", "Composites", "HandsOn"],
      curriculum: {
        create: [
          { title: "Introduction to Injection Moulding", description: "Theory and materials.", duration: "1h", order: 0 },
          { title: "Clinical Protocols", description: "Step by step procedure.", duration: "2h", order: 1 }
        ]
      }
    }
  ];

  for (const w of workshops) {
    // For workshops, we handle curriculum separately in upsert or just use create if not exist
    const exists = await prisma.workshop.findFirst({ where: { title: w.title } });
    if (!exists) {
      await prisma.workshop.create({ data: w });
    }
  }

  // SEED BOUTIQUE (Products)
  const products = [
    {
      name: "Kit de Blanchiment Professionnel",
      price: "8500 DZD",
      description: "Kit complet pour un blanchiment à domicile sécurisé et efficace.",
      image: "https://images.unsplash.com/photo-1559599141-7c40f01cc11d?auto=format&fit=crop&q=80&w=800",
      category: "Aesthetics",
      tags: ["Whitening", "Pro", "AtHome"]
    },
    {
      name: "Brosse à Dents Sonic Premium",
      price: "12000 DZD",
      description: "Technologie sonique avancée pour une hygiène bucco-dentaire irréprochable.",
      image: "https://images.unsplash.com/photo-1559599141-7c40f01cc11d?auto=format&fit=crop&q=80&w=800",
      category: "Hygiene",
      tags: ["Sonic", "Electric", "Premium"]
    }
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { id: `seed-${p.name.toLowerCase().replace(/\s+/g, '-')}` },
      update: p,
      create: {
        id: `seed-${p.name.toLowerCase().replace(/\s+/g, '-')}`,
        ...p
      }
    });
  }

  console.log('Mindshares, Workshops, and Products seeded successfully.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
