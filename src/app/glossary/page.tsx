import Base from '../../components/Base';
import WhatsAppLink from '../../components/WhatsAppLink';
import { site } from '../../config/site';
import { url, absUrl } from '../../lib/url';
import { reviewer, reviewedPageLd } from '../../lib/entity';
import { pageMetadata } from '../../lib/seo';

export const metadata = pageMetadata({
  title: 'UAE mortgage glossary: LTV, DBR, DLD fee and more | Lenty',
  description: 'Plain-English definitions of the terms in a Dubai mortgage: LTV, DBR, DLD transfer fee, valuation gap, Oqood, EIBOR, equity release, buy-out and more.',
  path: '/glossary/',
});

const c = site.calc, f = c.fees, ltv = c.ltv;
const pct = (x: number) => `${Math.round(x * 1000) / 10}%`;
const aed = (n: number) => `AED ${n.toLocaleString('en-US')}`;
const threshold = aed(ltv.priceThreshold);

/** Each definition answers the term on its own (40–60 words) so it can be quoted as is. Figures come from site.ts. */
const terms: { id: string; term: string; def: string; link?: { href: string; label: string } }[] = [
  { id: 'cash-to-close', term: 'Cash to close', def: `The cash a buyer needs on the day of transfer: the down payment plus the fees banks don't finance — the DLD transfer fee, the agent's commission, trustee, mortgage registration, valuation and the bank's processing fee. For a resident expat buying a first, ready AED 2,000,000 apartment it is about AED 542,000.`, link: { href: '/calculators/cash-to-close/', label: 'Cash-to-close calculator' } },
  { id: 'ltv', term: 'LTV (loan-to-value)', def: `The share of the property price a bank will lend. In the UAE an expat buying a first home can borrow up to ${pct(ltv.expat.first)} (${pct(ltv.expat.firstAbove5M)} above ${threshold}), a UAE national ${pct(ltv.national.first)} (${pct(ltv.national.firstAbove5M)}), and ${pct(ltv.expat.second)}–${pct(ltv.national.second)} on further homes. Non-residents usually get 50–60%; off-plan property is capped at ${pct(ltv.offPlanCap)}.` },
  { id: 'down-payment', term: 'Down payment', def: `The part of the price the buyer pays from their own money: 100% minus the LTV. For a resident expat's first home up to ${threshold} that is at least 20%; for non-residents usually 40–50%. It comes on top of the fees banks don't finance.` },
  { id: 'dbr', term: 'DBR (debt burden ratio)', def: `All monthly loan repayments as a share of monthly income. UAE banks cap it at ${pct(c.dbr)}, counting the new mortgage, car and personal loans, and ${pct(c.cardLimitPct)} of every credit-card limit even if the card is unused. A DBR above the limit is one of the most common reasons for a decline.`, link: { href: '/calculators/affordability/', label: 'How much can I borrow' } },
  { id: 'card-limit', term: 'Credit-card limit rule', def: `UAE banks count ${pct(c.cardLimitPct)} of your total credit-card limit as a monthly payment when they calculate your debt burden, whether or not you use the cards. Closing or lowering unused cards before applying can raise the amount you can borrow.` },
  { id: 'stress-rate', term: 'Stress rate', def: `A higher interest rate the bank uses to test affordability, so the payment still fits if rates rise. The illustrative stress rate in our calculators is ${c.stressRate}%. The loan is approved only if the payment at that rate keeps your debt burden within the limit.` },
  { id: 'dld-fee', term: 'DLD transfer fee', def: `The Dubai Land Department fee for registering a property purchase: ${pct(f.dldPct)} of the price plus about ${aed(f.dldFixed)}. Since 1 February 2025, under UAE Central Bank rules, banks don't finance it, so it is paid in cash. On off-plan property it is paid at Oqood registration.` },
  { id: 'trustee-fee', term: 'Trustee fee', def: `The fee of the registration trustee office that handles the transfer: about ${aed(f.trusteeAbove500k)} plus VAT for properties above ${aed(f.trusteeThreshold)}, and ${aed(f.trusteeBelow500k)} plus VAT below that.` },
  { id: 'mortgage-registration', term: 'Mortgage registration fee', def: `The Dubai Land Department fee for registering the bank's mortgage on the property: ${pct(f.mortgageRegPct)} of the loan amount plus about ${aed(f.mortgageRegFixed)}. It is paid again when a mortgage moves to another bank in a buy-out.` },
  { id: 'agent-commission', term: 'Agent commission', def: `The real-estate agent's fee on a resale purchase, usually ${pct(f.agentPct)} of the price plus 5% VAT. Since 1 February 2025, under UAE Central Bank rules, banks don't finance it. On off-plan purchases from a developer it is usually not charged to the buyer.` },
  { id: 'valuation-gap', term: 'Valuation gap', def: `The difference when the bank's valuation comes in below the agreed price. The bank lends on the lower figure, so the buyer pays the gap in cash on top of the down payment. A valuation costs about ${aed(f.valuation)} and is ordered by the bank.` },
  { id: 'pre-approval', term: 'Pre-approval', def: `The bank's written confirmation of how much it will lend you, issued before you choose a property. It is valid 30–60 days depending on the bank and lets you make an offer with confidence. The final offer letter follows after the valuation.` },
  { id: 'oqood', term: 'Oqood', def: `The Dubai Land Department register for off-plan property. A buyer's off-plan purchase is recorded in Oqood until completion, when it becomes a title deed. Banks finance off-plan units only once they are registered in Oqood.` },
  { id: 'handover', term: 'Handover payment', def: `The final payment due to the developer when an off-plan property is completed. Buyers often finance it with a mortgage, which has to be in place before the developer's deadline; valuation, documents and pre-approval all have expiry dates, so it is planned backwards from the due date.`, link: { href: '/situations/off-plan-handover/', label: 'Off-plan handover' } },
  { id: 'eibor', term: 'EIBOR', def: `The Emirates Interbank Offered Rate, the benchmark for variable UAE mortgage rates. A variable rate is usually 3-month EIBOR plus a bank margin of about 1.5–2.25%. Fixed rates, typically for 1–5 years, revert to an EIBOR-based rate when the fixed period ends.` },
  { id: 'stl', term: 'Salary transfer loan', def: `A mortgage where your salary is paid into the lending bank. Banks usually price it lower than a non-salary-transfer loan and may accept a lower minimum income. It is one reason two borrowers at the same bank can pay different rates.` },
  { id: 'low-doc', term: 'Low-doc mortgage', def: `A mortgage for self-employed borrowers assessed on bank statements or VAT returns instead of audited accounts. Banks usually look at 6–12 months of credits and average balances and lend a lower share of the price, typically 50–65%.`, link: { href: '/situations/business-owner/', label: 'Business owner or self-employed' } },
  { id: 'equity-release', term: 'Equity release', def: `A loan against a property you already own, usually up to 50–70% of its value minus any outstanding mortgage. In Dubai larger amounts are normally paid to a seller or contractor, so it is mostly used as the down payment for the next purchase.`, link: { href: '/situations/portfolio/', label: 'Growing a portfolio' } },
  { id: 'buy-out', term: 'Buy-out', def: `Moving a mortgage to another bank, usually for a lower rate. Most banks want 3–6 months of repayments first. The current bank charges early settlement of 1% of the balance or ${aed(10000)}, whichever is lower, and the new mortgage is registered again.` },
  { id: 'early-settlement', term: 'Early settlement fee', def: `The fee for repaying a mortgage early, fully or in part. In the UAE it is capped at 1% of the outstanding balance or ${aed(10000)}, whichever is lower. Many banks also allow a free partial prepayment each year.` },
  { id: 'aecb', term: 'AECB credit report', def: `The report and score from Al Etihad Credit Bureau, the UAE credit bureau. Banks check it for every application; each check shows as an enquiry. A higher score can mean a higher LTV, and an old forgotten card is a common reason for a decline.`, link: { href: '/situations/declined/', label: 'My bank said no' } },
  { id: 'non-resident-mortgage', term: 'Non-resident mortgage', def: `A UAE mortgage for buyers who live abroad. Banks usually lend 50–60% of the price, want income of about AED 25,000 a month or more in a major currency, and require the loan to be repaid by 65. Most of the process can be done remotely.`, link: { href: '/situations/non-resident/', label: 'Living outside the UAE' } },
  { id: 'co-borrower', term: 'Co-borrower', def: `A second applicant whose income is added to yours, most often a spouse; some banks accept a parent, child or sibling. A younger co-borrower can also extend the term when the main applicant is close to the age limit of ${c.maxAge.salaried} or ${c.maxAge.selfEmployed}.`, link: { href: '/situations/over-55/', label: '55 or older' } },
];

export default function Page() {
  const page = 'Glossary', slug = 'glossary';
  const ld = {
    '@context': 'https://schema.org', '@type': 'DefinedTermSet', '@id': absUrl('/glossary/') + '#terms',
    name: 'UAE mortgage glossary',
    hasDefinedTerm: terms.map((t) => ({ '@type': 'DefinedTerm', '@id': absUrl('/glossary/') + '#' + t.id, name: t.term, description: t.def, inDefinedTermSet: absUrl('/glossary/') + '#terms' })),
  };
  return (
    <Base path="/glossary/" pageName={page} breadcrumbs={[{ label: 'Glossary', href: '/glossary/' }]}
      jsonLd={[ld, reviewedPageLd('/glossary/', 'UAE mortgage glossary')]}>
      <section className="page-hero" style={{ paddingTop: 12 }}>
        <div className="wrap">
          <p className="eyebrow">Glossary</p>
          <h1>UAE mortgage terms, in plain English</h1>
          <p className="lead">{terms.length} terms you meet between the first call and the keys, with the figures UAE banks use.</p>
          <p className="updated">Reviewed {site.contentReviewed.label} by <a href={url(`/advisors/#${reviewer.slug}`)}>{reviewer.name}</a>, {reviewer.role}, Lenty ({site.company.license})</p>
          <nav className="faq-toc" aria-label="Terms" style={{ marginTop: 20 }}>{terms.map((t) => <a key={t.id} className="chip" href={`#${t.id}`}>{t.term}</a>)}</nav>
        </div>
      </section>
      <section className="block">
        <div className="wrap">
          <div className="glossary">
            {terms.map((t) => (
              <section key={t.id} className="prose" id={t.id} aria-labelledby={`${t.id}-h`}>
                <h2 id={`${t.id}-h`}>{t.term}</h2>
                <p>{t.def}</p>
                {t.link && <p><a className="arrow" href={url(t.link.href)}>{t.link.label} →</a></p>}
              </section>
            ))}
          </div>
          <p style={{ marginTop: 28 }}>A term we missed? <WhatsAppLink cta="glossary" page={page} slug={slug} className="arrow" icon={false} label="Ask an advisor →" /></p>
        </div>
      </section>
    </Base>
  );
}
