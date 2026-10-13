import { site } from '../config/site';
import { data } from '../lib/rich';

export const partnersFaq = [
  { q: 'Will you contact my client about other properties?', a: "No. We don't sell property and never will." },
  { q: 'Is the partnership exclusive?', a: 'No. Send us the cases where you want a specialist.' },
  {
    q: 'How is the commission calculated and when is it paid?',
    a: `${data(site.partners.commissionPublish ? site.partners.commission : null, 'partners.commission')}, ${site.partners.payoutDays} days after disbursal, with a date you can see.`,
  },
  {
    q: 'Which cases do you take?',
    a: 'All mortgages in the UAE, and especially the complex ones: non-residents, self-employed and business owners, declined elsewhere, off-plan handover, non-standard income.',
  },
  { q: 'How do I see the status of a case?', a: 'In the Lenty Partners App, or by WhatsApp from your advisor.' },
];
