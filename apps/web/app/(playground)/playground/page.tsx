import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import PlaygroundContent from './PlaygroundContent';

export const metadata: Metadata = {
  title: 'Email template editor',
  description: '',
};

export default async function Playground() {
  return <PlaygroundContent />;
}
