import type { ReactNode } from 'react';
import Base from './Base';
import { pageMetadata } from '../lib/seo';

interface Props { path: string; h1: string; eyebrow?: string; children?: ReactNode }

export const legalMetadata = (title: string, description: string, path: string) => pageMetadata({ title, description, path });

export default function LegalPage({ path, h1, eyebrow = 'Legal', children }: Props) {
  return (
    <Base path={path} pageName={h1} breadcrumbs={[{ label: h1, href: path }]}>
      <section className="page-hero" style={{ paddingTop: 12 }}><div className="wrap"><p className="eyebrow">{eyebrow}</p><h1>{h1}</h1></div></section>
      <section className="block"><div className="wrap"><div className="prose">{children}</div></div></section>
    </Base>
  );
}
