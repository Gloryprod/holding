'use client'

import { useLanguage } from '@/context/LanguageContext'

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-1 border rounded-full p-1 text-xs">
      <button 
        onClick={() => setLanguage('fr')} 
        className={language === 'fr' ? 'font-bold text-brand' : 'opacity-60'}
      >
        FR
      </button>
      <span>/</span>
      <button 
        onClick={() => setLanguage('en')} 
        className={language === 'en' ? 'font-bold text-brand' : 'opacity-60'}
      >
        EN
      </button>
    </div>
  )
}