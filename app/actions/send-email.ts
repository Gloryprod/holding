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

// Fonction utilitaire pour valider le token auprès des serveurs Google
async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    console.error("⚠️ RECAPTCHA_SECRET_KEY n'est pas configurée dans .env");
    return false;
  }

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `secret=${secretKey}&response=${token}`,
  });

  const data = await response.json();
  return data.success;
}

export async function sendContactEmail(formData: FormData, entrepriseNom: string, emailDestinataire: string, captchaToken: string | null) {
  try {
    // 1. Validation du jeton reCAPTCHA
    if (!captchaToken) {
      return {
        success: false,
        error: "Veuillez valider le reCAPTCHA avant d'envoyer votre message.",
      };
    }

    const isCaptchaValid = await verifyRecaptcha(captchaToken);
    if (!isCaptchaValid) {
      return {
        success: false,
        error: "Échec de la vérification reCAPTCHA. Veuillez réessayer.",
      };
    }

    // 2. Envoi du mail
    const { name, email, profileType, subject, message } = formData;
    const emailExpediteur = `"${entrepriseNom}" <contact@horyzion.com>`;

    const { data, error } = await resend.emails.send({
      from: emailExpediteur,
      to: ['contact@horyzion.com'], 
      subject: `[Formulaire de Contact] ${subject}`,
      replyTo: email,
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
      return { 
        success: false, 
        error: typeof error === "string" ? error : error.message || "Échec de l'envoi du mail, veuillez réessayer plus tard." 
      };
    }

    return { success: true, data };

  } catch (err: unknown) {
    console.error("💥 Exception Server Action:", err);
    const errorMessage = err instanceof Error ? err.message : String(err);
    
    return { 
      success: false, 
      error: errorMessage || "Erreur interne du serveur lors de l'envoi" 
    };
  }
}