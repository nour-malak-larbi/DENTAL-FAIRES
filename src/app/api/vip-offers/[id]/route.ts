import { isAdmin } from '@/lib/auth';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    if (!isAdmin(req)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const data = await req.json();
    const offer = await prisma.vipOffer.update({
      where: { id: params.id },
      data: {
        label: data.label,
        price: data.price,
        period: data.period,
        highlight: data.highlight,
        features: data.features,
        order: data.order,
        sessions: {
          deleteMany: {},
          create: (data.sessions || []).map((s: any) => ({
            title: s.title,
            date: s.date,
            meetLink: s.meetLink,
            order: s.order
          }))
        }
      }
    });
    return NextResponse.json(offer);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update VIP offer' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    if (!isAdmin(req)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    await prisma.vipOffer.delete({
      where: { id: params.id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete VIP offer' }, { status: 500 });
  }
}
