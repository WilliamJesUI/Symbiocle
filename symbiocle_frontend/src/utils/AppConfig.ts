import type { LocalePrefix } from 'node_modules/next-intl/dist/types/src/routing/types';

const localePrefix: LocalePrefix = 'as-needed';

export const AppConfig = {
  name: 'Symbiocle', // <-- Udah diganti jadi nama MVP lu biar legit!
  locales: [
    {
      id: 'en',
      name: 'English',
    },
    // Bahasa Prancis (fr) gw hapus aja ya biar ga menuhin menu dropdown lu
  ],
  defaultLocale: 'en',
  localePrefix,
};

export const AllLocales = AppConfig.locales.map(locale => locale.id);