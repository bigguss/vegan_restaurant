import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className='flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors text-primary font-medium text-sm'
      title={language === 'lv' ? 'Switch to English' : 'Pārslēgties uz Latvian'}
    >
      <Globe size={16} />
      <span>{language === 'lv' ? 'LV' : 'EN'}</span>
    </button>
  );
}
