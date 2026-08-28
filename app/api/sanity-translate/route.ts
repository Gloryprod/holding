import { NextRequest, NextResponse } from 'next/server'
import * as deepl from 'deepl-node'

const translator = new deepl.Translator(process.env.DEEPL_API_KEY || '')

export async function POST(req: NextRequest) {
  try {
    const { items } = await req.json()

    if (!items || !Array.isArray(items)) {
      return NextResponse.json({ error: 'Données invalides' }, { status: 400 })
    }

    // Appel groupé à DeepL
    const results = await translator.translateText(items, 'fr', 'en-US')
    
    const translations = results.map((r) => r.text)

    return NextResponse.json({ translations })
  } catch (error) {
    console.error('Erreur DeepL API:', error)
    return NextResponse.json({ error: 'Échec de la traduction' }, { status: 500 })
  }
}