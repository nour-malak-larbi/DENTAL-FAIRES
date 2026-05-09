import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const workshop = await prisma.workshop.findUnique({
      where: { id: params.id }
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
        posterFile: data.posterFile
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
    await prisma.workshop.delete({
      where: { id: params.id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete workshop' }, { status: 500 });
  }
}
