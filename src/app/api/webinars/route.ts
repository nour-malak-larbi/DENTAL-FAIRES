import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const webinars = await prisma.webinar.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(webinars);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch webinars' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const webinar = await prisma.webinar.create({
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
        registrationUrl: data.registrationUrl
      }
    });
    return NextResponse.json(webinar);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create webinar' }, { status: 500 });
  }
}
