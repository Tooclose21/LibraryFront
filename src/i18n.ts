import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import translationPl from './locales/pl.json';
import translationEng from './locales/eng.json';

const resources = {
  eng: {
    translation: translationEng,
  },
  pl: {
    translation: translationPl,
  },
};

// i18n.use(LanguageDetector).use(initReactI18next).init({
//   fallbackLng: 'eng',
//   resources,
// });

i18n.use(LanguageDetector).use(initReactI18next).init({
  fallbackLng: 'eng',
  resources,
});

//i18n.changeLanguage('pl');

export default i18n;
