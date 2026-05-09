import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const mindshare = await prisma.mindshare.findUnique({
      where: { id: params.id }
    });
    if (!mindshare) {
      return NextResponse.json({ error: 'Mindshare not found' }, { status: 404 });
    }
    return NextResponse.json(mindshare);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch mindshare' }, { status: 500 });
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

    const data = await request.json();
    const mindshare = await prisma.mindshare.update({
      where: { id: params.id },
      data: {
        title: data.title,
        category: data.category,
        date: data.date,
        author: data.author,
        content: data.content,
        image: data.image,
        excerpt: data.excerpt,
        meetLink: data.meetLink
      }
    });
    return NextResponse.json(mindshare);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update mindshare' }, { status: 500 });
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

    await prisma.mindshare.delete({
      where: { id: params.id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete mindshare' }, { status: 500 });
  }
}
