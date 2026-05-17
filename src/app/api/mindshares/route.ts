import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { isAdmin } from '@/lib/auth';

export async function GET() {
  try {
    const mindshares = await prisma.mindshare.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(mindshares);
  } catch (error: any) {
    console.error('API /api/mindshares error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch mindshares', 
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
    const mindshare = await prisma.mindshare.create({
      data: {
        title: data.title,
        category: data.category,
        date: data.date,
        author: data.author,
        content: data.content,
        image: data.image,
        excerpt: data.excerpt
      }
    });
    return NextResponse.json(mindshare);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create mindshare' }, { status: 500 });
  }
}
