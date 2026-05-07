import '@/styles/global.css';

import type { Metadata } from 'next';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import localFont from 'next/font/local'; 

import { AllLocales } from '@/utils/AppConfig';

const ttInterphase = localFont({
  src: [
    {
      path: '../../../public/fonts/TT-Interphases-Bold.ttf', 
      weight: '700',
      style: 'normal',
    }
  ],
  variable: '--font-tt-interphase',
});

const creatoDisplay = localFont({
  src: [
    {
      path: '../../../public/fonts/CreatoDisplay-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/CreatoDisplay-Bold.otf',
      weight: '700',
      style: 'normal',
    }
  ],
  variable: '--font-creato',
});

export const metadata: Metadata = {
  title: 'Symbiocle | Industrial Symbiosis',
  description: 'B2B platform for factory waste management and sourcing.',
  icons: [
    { rel: 'apple-touch-icon', url: '/apple-touch-icon.png?v=2' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon-32x32.png?v=2' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/favicon-16x16.png?v=2' },
    { rel: 'icon', url: '/favicon.ico?v=2' },
  ],
};

export function generateStaticParams() {
  return AllLocales.map(locale => ({ locale }));
}

export default function RootLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(props.params.locale);

  // Using internationalization in Client Components
  const messages = useMessages();

  // The `suppressHydrationWarning` in <html> is used to prevent hydration errors caused by `next-themes`.
  // Solution provided by the package itself: https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app

  // The `suppressHydrationWarning` attribute in <body> is used to prevent hydration errors caused by Sentry Overlay,
  // which dynamically adds a `style` attribute to the body tag.
  return (
    <html lang={props.params.locale} suppressHydrationWarning>
      {/* 3. Masukin variabel font-nya di className body ini */}
      <body 
        className={`bg-background text-foreground antialiased ${creatoDisplay.className} ${ttInterphase.variable} ${creatoDisplay.variable}`} 
        suppressHydrationWarning
      >
        {/* PRO: Dark mode support for Shadcn UI */}
        <NextIntlClientProvider
          locale={props.params.locale}
          messages={messages}
        >
          {props.children}

        </NextIntlClientProvider>
      </body>
    </html>
  );
}