import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// NOTE: You'll need to set RESEND_API_KEY in your .env file
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const productTitle = formData.get('productTitle') as string;
    const productId = formData.get('productId') as string;
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'Fichier manquant' }, { status: 400 });
    }

    // Convert file to arrayBuffer for Resend attachment
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    console.log('Sending email for:', { name, email, productTitle });

    // Send email to admin
    const { data, error } = await resend.emails.send({
      from: 'Academie <onboarding@resend.dev>',
      to: ['dentalfairies9@gmail.com'],
      subject: `Nouveau Reçu de Paiement - ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; border: 1px solid #eee; padding: 20px;">
          <h2 style="color: #C4993A;">Nouveau Reçu de Paiement</h2>
          <p>Un utilisateur a envoyé un reçu pour confirmer son paiement.</p>
          <hr style="border: none; border-top: 1px solid #eee;" />
          <p><strong>Utilisateur:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Téléphone:</strong> ${phone}</p>
          <p><strong>Produit:</strong> ${productTitle} (ID: ${productId})</p>
          <hr style="border: none; border-top: 1px solid #eee;" />
          <p style="font-size: 12px; color: #666;">Veuillez vérifier la pièce jointe pour valider l'accès de l'utilisateur dans le panel admin.</p>
        </div>
      `,
      attachments: [
        {
          filename: file.name,
          content: buffer,
        },
      ],
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Erreur lors de l\'envoi de l\'email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Payment confirmation error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
