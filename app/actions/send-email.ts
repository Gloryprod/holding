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
    const emailExpediteur = `"${entrepriseNom}" <contact@horyzion.com>`;

    const { data, error } = await resend.emails.send({
      from: emailExpediteur,
      to: ['contact@horyzion.com'], 
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

    if (error) {
      console.error("❌ Erreur retournée par Resend:", error);
      // S'assurer de renvoyer une chaîne de caractères pure
      return { 
        success: false, 
        error: typeof error === "string" ? error : error.message || "Échec de l'envoi du mail, veuillez réessayer plus tard." 
      };
    }
    return { success: true, data };

  } catch (err: unknown) {
    console.error("💥 Exception Server Action:", err);
    const errorMessage = err instanceof Error ? err.message : String(err);
    
    // Renvoyer toujours un type primitif (string) pour que Next.js ne masque pas l'erreur
    return { 
      success: false, 
      error: errorMessage || "Erreur interne du serveur lors de l'envoi" 
    };
  }
}