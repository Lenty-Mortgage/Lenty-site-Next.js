import Base from '../../components/Base';
import CheckForm from '../../components/CheckForm';
import { pageMetadata } from '../../lib/seo';

export const metadata = pageMetadata({
  title: 'Check my chances · 2 minutes, then a real person | Lenty',
  description: 'Five quick questions about your situation, then where to reach you. Nothing is sent to any bank or credit bureau until you say so. A named advisor reads your answers before the call.',
  path: '/check/', noindex: true,
});

export default function Page() {
  return (
    <Base path="/check/" pageName="Check my chances" breadcrumbs={[{ label: 'Check my chances', href: '/check/' }]}>
      <div className="wrap"><CheckForm page="Check my chances" slug="check" /></div>
    </Base>
  );
}
