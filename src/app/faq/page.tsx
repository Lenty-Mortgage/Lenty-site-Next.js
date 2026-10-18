import Base from '../../components/Base';
import FAQ from '../../components/FAQ';
import WhatsAppLink from '../../components/WhatsAppLink';
import Tbc from '../../components/Tbc';
import { faq, faqCount } from '../../content/faq';
import { faqPageLd } from '../../lib/rich';
import { reviewer, reviewedPageLd } from '../../lib/entity';
import { site } from '../../config/site';
import { url } from '../../lib/url';
import { pageMetadata } from '../../lib/seo';

export const metadata = pageMetadata({
  title: 'UAE mortgage questions, answered by advisors | Lenty FAQ',
  description: 'Will I get approved? How much cash do I need? How much can I borrow? Process, documents, rates and life changes — answers from Lenty advisors.',
  path: '/faq/',
});

export default function Page() {
  const page = 'FAQ', slug = 'faq';
  const faqLd = faqPageLd(faq.flatMap((g) => g.items));
  const pendingCount = faq.reduce((n, g) => n + g.items.filter((i) => i.tbc).length, 0);
  return (
    <Base path="/faq/" pageName={page} breadcrumbs={[{ label: 'FAQ', href: '/faq/' }]} jsonLd={[faqLd, reviewedPageLd('/faq/', 'UAE mortgage questions, answered by advisors')]}>
      <section className="page-hero" style={{ paddingTop: 12 }}>
        <div className="wrap">
          <p className="eyebrow">FAQ</p>
          <h1>What clients ask before the first call</h1>
          <p className="lead">{faqCount} questions in six groups. {pendingCount > 0 && <>{pendingCount} answers are drafts waiting for an advisor&apos;s check <Tbc label="to confirm" /></>}</p>
          <p className="updated">Reviewed {site.contentReviewed.label} by <a href={url(`/advisors/#${reviewer.slug}`)}>{reviewer.name}</a>, {reviewer.role}, Lenty ({site.company.license}) · Terms explained in the <a href={url('/glossary/')}>mortgage glossary</a></p>
          <nav className="faq-toc" aria-label="FAQ groups" style={{ marginTop: 20 }}>{faq.map((g) => <a key={g.id} className="chip" href={`#faq-${g.id}`}>{g.title}</a>)}</nav>
        </div>
      </section>
      <FAQ groups={faq} title="" link={false} id="faq-all" groupTag="h2" />
      <section className="block"><div className="wrap"><p>Still have a question? <WhatsAppLink cta="faq" page={page} slug={slug} className="arrow" icon={false} label="WhatsApp an advisor →" /></p></div></section>
    </Base>
  );
}
