import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import cloudinary from '@/lib/cloudinary';

export const runtime = 'nodejs';

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'dentalfairies9@gmail.com';

export async function POST(request: Request) {
  try {
    const authUser = verifyToken(request);
    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const phone = (formData.get('phone') as string) || 'N/A';
    const productTitle = (formData.get('productTitle') as string) || 'Formation';
    const productId = (formData.get('productId') as string) || 'unknown';
    const productType = (formData.get('productType') as string) || 'unknown';
    const amount = (formData.get('amount') as string) || 'N/A';
    const file = (formData.get('file') || formData.get('receipt')) as File | null;

    if (!file) {
      return NextResponse.json({ error: 'Fichier manquant (envoyez via "file" ou "receipt")' }, { status: 400 });
    }

    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'Fichier trop volumineux. Maximum 10MB.' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id: authUser.userId } });
    const name = (formData.get('name') as string) || user?.name || 'Utilisateur';
    const email = (formData.get('email') as string) || user?.email || '';

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploaded: any = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'dental-fairies/receipts',
          resource_type: 'auto',
          public_id: `${Date.now()}-${authUser.userId.slice(-6)}`,
        },
        (err, result) => (err ? reject(err) : resolve(result))
      );
      stream.end(buffer);
    });

    const receiptUrl: string = uploaded.secure_url;

    const purchase = await prisma.purchase.create({
      data: {
        userId: authUser.userId,
        productType,
        productId,
        amount,
        receiptFile: receiptUrl,
        status: 'pending',
      },
    });

    const adminLink = `${process.env.NEXTAUTH_URL || ''}/admin/dashboard`;
    const { error: sendError } = await resend.emails.send({
      from: 'Academie <onboarding@resend.dev>',
      to: [ADMIN_EMAIL],
      subject: `Nouveau Reçu — ${name} (${productType})`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #eee; padding: 20px;">
          <h2 style="color: #C4993A; margin-top: 0;">Nouveau Reçu de Paiement</h2>
          <p>Un utilisateur a envoyé un reçu pour confirmer son paiement.</p>
          <table style="border-collapse: collapse; width: 100%; margin: 16px 0;">
            <tr><td style="padding: 6px 12px; color: #666;">Utilisateur</td><td style="padding: 6px 12px;"><strong>${name}</strong></td></tr>
            <tr><td style="padding: 6px 12px; color: #666;">Email</td><td style="padding: 6px 12px;">${email}</td></tr>
            <tr><td style="padding: 6px 12px; color: #666;">Téléphone</td><td style="padding: 6px 12px;">${phone}</td></tr>
            <tr><td style="padding: 6px 12px; color: #666;">Produit</td><td style="padding: 6px 12px;">${productTitle} <small>(${productType} / ${productId})</small></td></tr>
            <tr><td style="padding: 6px 12px; color: #666;">Montant</td><td style="padding: 6px 12px;">${amount}</td></tr>
            <tr><td style="padding: 6px 12px; color: #666;">ID Achat</td><td style="padding: 6px 12px;"><code>${purchase.id}</code></td></tr>
          </table>
          <p style="margin: 20px 0;">
            <a href="${receiptUrl}" style="display: inline-block; background: #C4993A; color: #091209; padding: 12px 24px; text-decoration: none; font-weight: 600; margin-right: 12px;">📄 Voir le reçu</a>
            <a href="${adminLink}" style="display: inline-block; background: #1a1a1a; color: #C4993A; padding: 12px 24px; text-decoration: none; font-weight: 600; border: 1px solid #C4993A;">⚙ Espace admin</a>
          </p>
          <p style="font-size: 12px; color: #666; margin-top: 20px;">Approuvez ou refusez ce paiement depuis l'onglet "Reçus" du panel admin.</p>
        </div>
      `,
    });

    if (sendError) {
      console.error('Resend error:', sendError);
      return NextResponse.json(
        {
          success: true,
          purchaseId: purchase.id,
          receiptUrl,
          warning: 'Reçu enregistré, mais l\'email à l\'admin a échoué. L\'admin verra le reçu dans le panel.',
          emailError: (sendError as any)?.message || String(sendError),
        },
        { status: 200 }
      );
    }

    return NextResponse.json({ success: true, purchaseId: purchase.id, receiptUrl });
  } catch (error: any) {
    console.error('Payment confirmation error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur', details: error?.message || String(error) },
      { status: 500 }
    );
  }
}
