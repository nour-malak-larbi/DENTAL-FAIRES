import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const workshop = await prisma.workshop.findUnique({
      where: { id: params.id },
      include: {
        curriculum: {
          orderBy: { order: 'asc' }
        }
      }
    });
    if (!workshop) {
      return NextResponse.json({ error: 'Workshop not found' }, { status: 404 });
    }
    return NextResponse.json(workshop);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch workshop' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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
    const workshop = await prisma.workshop.update({
      where: { id: params.id },
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
        meetLink: data.meetLink,
        curriculum: {
          deleteMany: {},
          create: (data.curriculum || []).map((mod: any) => ({
            title: mod.title,
            description: mod.description || '',
            duration: mod.duration,
            meetLink: mod.meetLink,
            order: mod.order
          }))
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
    return NextResponse.json({ error: 'Failed to update workshop' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    await prisma.workshop.delete({
      where: { id: params.id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete workshop' }, { status: 500 });
  }
}
