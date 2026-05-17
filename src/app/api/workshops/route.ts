import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { isAdmin } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const workshops = await prisma.workshop.findMany({
      include: {
        curriculum: {
          orderBy: { order: 'asc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(workshops);
  } catch (error: any) {
    console.error('API /api/workshops error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch workshops', 
      details: error.message || String(error)
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

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
        posterFile: data.posterFile,
        curriculum: {
          create: data.curriculum?.map((module: any, index: number) => ({
            title: module.title,
            description: module.description || '',
            duration: module.duration,
            meetLink: module.meetLink,
            order: index
          })) || []
        }
      },
      include: {
        curriculum: {
          orderBy: { order: 'asc' }
        }
      }
    });
    return NextResponse.json(workshop);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create workshop' }, { status: 500 });
  }
}
