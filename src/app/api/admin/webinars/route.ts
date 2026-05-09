import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function PUT(request: Request) {
  try {
    // Check admin authentication
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

    const { id, meetLink } = await request.json();

    const webinar = await prisma.webinar.update({
      where: { id },
      data: { meetLink }
    });

    return NextResponse.json(webinar);
  } catch (error) {
    console.error('Admin webinar update error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}