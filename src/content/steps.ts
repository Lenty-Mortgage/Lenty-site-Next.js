import { site } from '../config/site';
import { data } from '../lib/rich';

export type Step = {
  n: number;
  title: string;
  when: string;
  text: string;
  fromYou: string;
  // /how-it-works expansion
  weDo: string;
  delays: string;
};

export const steps: Step[] = [
  {
    n: 1,
    title: 'Discovery call',
    when: 'Day 0 · 15 min',
    text: "We review income, debts and the property and tell you honestly what's possible.",
    fromYou: 'nothing yet, just the conversation',
    weDo: 'We review income, debts and the property and tell you honestly what\'s possible — which banks are realistic, roughly how much cash you need, and what could stall the file.',
    delays: 'None on our side. If you are abroad, we pick a slot in your time zone.',
  },
  {
    n: 2,
    title: 'Bank matching',
    when: data(site.sla.bankMatching, '24–48 h'),
    text: "A shortlist of banks that fit your profile, with the cash you'll need for each.",
    fromYou: 'a few numbers by WhatsApp',
    weDo: 'We compare the banks whose policy fits your income, nationality, property and timing, and send a written shortlist with the cash you\'ll need for each.',
    delays: 'Bank holidays and missing numbers. One WhatsApp message with income, debts and price range is enough to start.',
  },
  {
    n: 3,
    title: 'Pre-approval',
    when: data(site.sla.preApprovalResident, 'sla.preApprovalResident'),
    text: 'Valid 30–60 days depending on the bank, so you can make an offer with confidence.',
    fromYou: 'documents, from a checklist we send',
    weDo: 'We structure the file the way the chosen bank reads it, submit it and chase the bank until the pre-approval letter is in your hands.',
    delays: 'An expired salary certificate, statements older than the bank accepts, or a bank holiday. We send the checklist with validity dates.',
  },
  {
    n: 4,
    title: 'Valuation to keys',
    when: '2–3 weeks',
    text: 'Valuation, final offer, transfer at the trustee office. We coordinate bank, agent and trustee.',
    fromYou: 'signatures, in Dubai or by power of attorney [[tbc:to confirm]]',
    weDo: 'We order the valuation, get the final offer letter, book the trustee appointment and coordinate the bank, the agent and the seller so nothing expires on the way.',
    delays: 'The valuation gap, a developer NOC that arrives late, and bank holidays. We plan backwards from the transfer date.',
  },
];
