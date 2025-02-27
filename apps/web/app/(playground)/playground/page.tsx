import type { Metadata } from 'next';
import NextLink from 'next/link';
import { Balancer } from 'react-wrap-balancer';
import { LogIn } from 'lucide-react';
import { redirect } from 'next/navigation';
import { SendTestEmail } from '@/components/send-test-email';
import { PreviewEmail } from '@/components/preview-email';
import { CopyEmailHtml } from '@/components/copy-email-html';
import { EditorPreview } from '@/components/editor-preview';
import { ApiConfiguration } from '@/components/api-config';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { EditorTopbar } from '@/components/editor-topbar';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Email templaat editor',
  description: '',
  twitter: {
    creator: '@imarikchakma',
    title: 'Email templaat editor',
    description: 'Try out Maily, the Open-source editor for crafting emails.',
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    siteName: 'Maily',
    title: 'Playground | Maily',
    description: 'Try out Maily, the Open-source editor for crafting emails.',
    type: 'website',
    url: 'https://maily.to',
    locale: 'en-US',
    images: {
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Maily Preview',
    },
  },
};

export default async function Playground() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect('/template');
  }

  return (
    <main className="mx-auto w-full max-w-[calc(600px+40px)] px-5">
      <header className="mt-14 border-b pb-6">
        <h1 className="text-3xl">Email templaat maker</h1>
      </header>
      <EditorTopbar className="mt-6" />
      <EditorPreview />
      <Footer />
    </main>
  );
}
