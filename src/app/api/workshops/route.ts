import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

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
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch workshops' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Check authentication
    const authUser = verifyToken(request);
    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { id: authUser.userId }
    });

    if (!user || user.role !== 'ADMIN') {
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
            description: module.description,
            duration: module.duration,
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
