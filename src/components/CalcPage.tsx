import Base from './Base';
import Calculator, { type Tab } from './Calculator';
import { pageMetadata } from '../lib/seo';
import { calculatorLd } from '../lib/entity';

interface Props { tab: Tab; title: string; description: string; h1: string; lead?: string; path: string; canonicalPath?: string; pageName: string }

export const calcMetadata = ({ title, description, path, canonicalPath }: Props) => pageMetadata({ title, description, path, canonicalPath });

export default function CalcPage({ tab, h1, lead, path, canonicalPath, pageName, description }: Props) {
  const slug = path.replace(/^\/|\/$/g, '');
  return (
    <Base path={path} pageName={pageName} breadcrumbs={[{ label: 'Calculators', href: '/calculators/cash-to-close/' }, { label: pageName, href: path }]} bodyClass="has-calc"
      jsonLd={[calculatorLd(canonicalPath ?? path, pageName, description)]}>
      <section className="page-hero" style={{ paddingTop: 12, borderBottom: 0 }}>
        <div className="wrap">
          <p className="eyebrow">Calculators</p>
          <h1>{h1}</h1>
          {lead && <p className="lead">{lead}</p>}
        </div>
      </section>
      <section className="block" style={{ paddingTop: 8 }}>
        <div className="wrap">
          <Calculator tab={tab} page={pageName} slug={slug} />
        </div>
      </section>
    </Base>
  );
}
