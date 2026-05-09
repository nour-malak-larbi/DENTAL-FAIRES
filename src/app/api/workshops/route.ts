import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const workshops = await prisma.workshop.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(workshops);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch workshops' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const workshop = await prisma.workshop.create({
      data: {
        title: data.title,
        subtitle: data.subtitle,
        category: data.category,
        categoryLabel: data.categoryLabel,
        duration: data.duration,
        instructor: data.instructor,
        instructorTitle: data.instructorTitle,
        price: data.price,
        level: data.level,
        description: data.description,
        posterFile: data.posterFile
      }
    });
    return NextResponse.json(workshop);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create workshop' }, { status: 500 });
  }
}
