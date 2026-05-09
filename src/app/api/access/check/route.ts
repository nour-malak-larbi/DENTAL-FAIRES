import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    // Check authentication
    const authUser = verifyToken(request);
    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { productType, productId } = await request.json();

    if (!productType || !productId) {
      return NextResponse.json({ error: 'Missing productType or productId' }, { status: 400 });
    }

    // Only workshops and vip coaching require payment
    const paidProductTypes = ['workshop', 'vip'];
    const requiresPayment = paidProductTypes.includes(productType);

    let hasAccess = false;
    let purchaseStatus = null;

    if (requiresPayment) {
      // Check if user has a paid purchase for this product
      const purchase = await prisma.purchase.findFirst({
        where: {
          userId: authUser.userId,
          productType,
          productId,
          status: 'paid'
        }
      });
      hasAccess = !!purchase;
      purchaseStatus = purchase?.status || null;
    } else {
      // Free content - user has access if authenticated
      hasAccess = true;
    }

    // Get meet link if access granted
    let meetLink = null;
    if (hasAccess) {
      if (productType === 'workshop') {
        const workshop = await prisma.workshop.findUnique({
          where: { id: productId },
          select: { meetLink: true }
        });
        meetLink = workshop?.meetLink;
      } else if (productType === 'webinar') {
        const webinar = await prisma.webinar.findUnique({
          where: { id: productId },
          select: { meetLink: true }
        });
        meetLink = webinar?.meetLink;
      } else if (productType === 'mindshare') {
        const mindshare = await prisma.mindshare.findUnique({
          where: { id: productId },
          select: { meetLink: true }
        });
        meetLink = mindshare?.meetLink;
      } else if (productType === 'vip') {
        // Handle VIP coaching meet link if needed
        meetLink = null; // VIP might not need meet link, or get from different model
      }
    }

    return NextResponse.json({
      hasAccess,
      meetLink,
      purchaseStatus,
      requiresPayment
    });
  } catch (error) {
    console.error('Access check error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}