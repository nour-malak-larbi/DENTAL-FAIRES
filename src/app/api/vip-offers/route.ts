import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const offers = await prisma.vipOffer.findMany({
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(offers);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch VIP offers' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    if (!isAdmin(req)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const data = await req.json();
    const offer = await prisma.vipOffer.create({
      data: {
        label: data.label,
        price: data.price,
        period: data.period || '/ mois',
        highlight: data.highlight || false,
        features: data.features || [],
        order: data.order || 0,
        sessions: {
          create: (data.sessions || []).map((s: any, idx: number) => ({
            title: s.title,
            date: s.date,
            meetLink: s.meetLink,
            order: idx
          }))
        }
      },
      include: {
        sessions: true
      }
    });
    return NextResponse.json(offer);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create VIP offer' }, { status: 500 });
  }
}
