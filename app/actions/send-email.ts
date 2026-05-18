"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface FormData {
    name: string;
    email: string;
    profileType: string;
    subject: string;
    message: string;
}

export async function sendContactEmail(formData: FormData, entrepriseNom: string, emailDestinataire: string) {
  try {
    const { name, email, profileType, subject, message } = formData;
    const emailExpediteur = `${entrepriseNom} <onboarding@resend.dev>`;

    const { data, error } = await resend.emails.send({
      from: emailExpediteur,
      to: [emailDestinataire], // Reçoit le mail sur son adresse spécifique (ex: eden@gmail.com)
      subject: `[Formulaire de Contact] ${subject}`,
      replyTo: email, // TRÈS IMPORTANT : Permet à la filiale de répondre directement au visiteur
      html: `
        <h3>Nouveau message pour ${entrepriseNom}</h3>
        <p><strong>De :</strong> ${name} (${profileType})</p>
        <p><strong>Email du visiteur :</strong> ${email}</p>
        <p><strong>Sujet :</strong> ${subject}</p>
        <hr />
        <p style="white-space: pre-wrap;">${message}</p>
      `,
    });

    if (error) return { success: false, error: error.message };
    return { success: true, data };

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, error: message || "Erreur serveur" };
  }
}