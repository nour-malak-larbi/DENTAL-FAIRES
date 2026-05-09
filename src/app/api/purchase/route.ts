import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // Check authentication
    const authUser = verifyToken(request);
    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { productType, productId, productName, amount, paymentMethod, receiptFile } = await request.json();

    if (!productType || !productId || !productName || !amount || !paymentMethod) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create purchase record
    const purchase = await prisma.purchase.create({
      data: {
        userId: authUser.userId,
        productType,
        productId,
        amount: amount,
        receiptFile,
        status: 'pending'
      }
    });

    // Send email to admin
    try {
      await resend.emails.send({
        from: 'noreply@dental-fairies.com',
        to: process.env.ADMIN_EMAIL || 'admin@dental-fairies.com',
        subject: `Nouvelle demande de paiement - ${productName}`,
        html: `
          <h2>Nouvelle demande de paiement</h2>
          <p><strong>Utilisateur:</strong> ${authUser.email}</p>
          <p><strong>Produit:</strong> ${productName}</p>
          <p><strong>Montant:</strong> ${amount}€</p>
          <p><strong>Moyen de paiement:</strong> ${paymentMethod}</p>
          <p><strong>Statut:</strong> En attente de validation</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString('fr-FR')}</p>
          ${receiptFile ? `<p><strong>Reçu:</strong> <a href="${receiptFile}">Télécharger</a></p>` : ''}
          <br>
          <p>Connectez-vous au panneau d'administration pour valider ce paiement.</p>
        `
      });
    } catch (emailError) {
      console.error('Failed to send admin email:', emailError);
      // Don't fail the purchase if email fails
    }

    return NextResponse.json({
      success: true,
      purchaseId: purchase.id,
      message: 'Purchase submitted successfully'
    });
  } catch (error) {
    console.error('Purchase error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}