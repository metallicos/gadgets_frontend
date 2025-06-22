'use client';

import {useLocale} from 'next-intl';
import {useRouter} from '@/i18n/routing';
import {useState, useTransition} from 'react';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === locale);

  function onSelectChange(nextLocale: string) {
    startTransition(() => {
      // Use the current URL to change locale while preserving the path
      const currentUrl = window.location.pathname;
      const pathWithoutLocale = currentUrl.replace(/^\/[a-z]{2}/, '');
      const newPath = pathWithoutLocale || '/';
      
      // Navigate to the new locale with the same path
      router.push(newPath as '/', {locale: nextLocale});
    });
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <span className="text-lg">{currentLanguage?.flag}</span>
        <span className="text-sm font-medium text-gray-700 hidden sm:block">
          {currentLanguage?.name}
        </span>
        <svg 
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 rounded-2xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 z-20 glass">
            <div className="py-2">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => onSelectChange(language.code)}
                  disabled={isPending}
                  className={`flex items-center w-full px-4 py-3 text-sm transition-colors duration-200 ${
                    locale === language.code
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                  }`}
                >
                  <span className="mr-3 text-lg">{language.flag}</span>
                  <span className={locale === language.code ? 'font-semibold' : ''}>{language.name}</span>
                  {locale === language.code && (
                    <svg className="ml-auto w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
      
      {isPending && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-lg">
          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
