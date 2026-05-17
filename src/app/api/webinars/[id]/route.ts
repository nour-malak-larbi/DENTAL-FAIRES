import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const webinar = await prisma.webinar.findUnique({
      where: { id: params.id }
    });
    if (!webinar) {
      return NextResponse.json({ error: 'Webinar not found' }, { status: 404 });
    }
    return NextResponse.json(webinar);
  } catch (error: any) {
    console.error(`API /api/webinars/${params.id} error:`, error);
    return NextResponse.json({ 
      error: 'Failed to fetch webinar', 
      details: error.message || String(error)
    }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const webinar = await prisma.webinar.update({
      where: { id: params.id },
      data: {
        title: data.title,
        subtitle: data.subtitle,
        category: data.category,
        categoryLabel: data.categoryLabel,
        date: data.date,
        duration: data.duration,
        speaker: data.speaker,
        speakerTitle: data.speakerTitle,
        description: data.description,
        posterFile: data.posterFile,
        registrationUrl: data.registrationUrl,
        meetLink: data.meetLink
      }
    });
    return NextResponse.json(webinar);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update webinar' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.webinar.delete({
      where: { id: params.id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete webinar' }, { status: 500 });
  }
}
