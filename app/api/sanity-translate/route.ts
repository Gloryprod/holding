import { NextRequest, NextResponse } from 'next/server'
import * as deepl from 'deepl-node'

const translator = new deepl.Translator(process.env.DEEPL_API_KEY || '')

export async function POST(req: NextRequest) {
  try {
    const { items } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Aucun texte fourni' }, { status: 400 });
    }

    // Appel DeepL
    const results = await translator.translateText(items, 'fr', 'en-US');

    // S'assurer que le résultat est TOUJOURS un tableau plat de strings
    let translations: string[] = [];

    if (Array.isArray(results)) {
      translations = results.map((r: deepl.TextResult) => r.text);
    } else {
      translations = [(results as deepl.TextResult).text];
    }

    return NextResponse.json({ translations });
  } catch (error) {
    console.error('Erreur DeepL API:', error);
    return NextResponse.json({ error: 'Échec de la traduction DeepL' }, { status: 500 });
  }

}