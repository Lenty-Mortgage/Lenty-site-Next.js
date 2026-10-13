import { site } from '../config/site';
import { data } from '../lib/rich';

export const ADVISOR_ANSWER = 'Answer to be written by an advisor';

export type FaqItem = { q: string; a: string; tbc?: boolean; home?: boolean };
export type FaqGroup = { id: string; title: string; items: FaqItem[] };


export const faq: FaqGroup[] = [
  {
    id: 'approved',
    title: 'Will I get approved?',
    items: [
      {
        q: 'Can foreigners get a Dubai mortgage without residency?',
        a: 'Yes. Several UAE banks lend to non-residents, usually up to 50–60% of the property value, with higher income and balance requirements than for residents.',
        home: true,
      },
      {
        q: "Can I get a mortgage if I'm self-employed?",
        a: 'Yes. Most banks want around two years of company history and audited accounts or bank statements. Some accept a younger business at a lower loan-to-value.',
      },
      {
        q: 'My bank declined me — is that the end?',
        a: "Rarely. Each bank has its own rules on income, nationality, employer and credit history. We find out why you were declined and which bank's rules fit your case.",
        home: true,
      },
      { q: "What's the minimum salary?", a: "Most banks want AED 15,000 a month for expats; a few go down to AED 10–12k, especially if you transfer your salary to them. For the self-employed the floor is about AED 15–30k, and for non-residents about AED 25k." },
      { q: 'Which nationalities have it easiest, and why?', a: "Most nationalities are accepted. A few face restrictions at some banks for compliance or sanctions reasons, and the lists for non-residents are narrower. It is bank-specific: one bank's no is another's yes, and banks sometimes make exceptions, for example based on where you live." },
      {
        q: 'Can a bad credit history from my home country block me?',
        a: "Some banks ask for a credit report from your country; a clean UAE record isn't required because you don't have one yet.",
      },
      {
        q: "I'm over 55 — is it still possible?",
        a: 'UAE banks want the loan repaid by 65 (salaried) or 70 (self-employed and nationals). That shortens the term — and raises the payment. Co-borrowers, exceptions and the right bank bring it back within reach.',
      },
    ],
  },
  {
    id: 'cash',
    title: 'How much do I need?',
    items: [
      {
        q: 'How much cash do I need before I can buy?',
        a: 'On a AED 2,000,000 apartment a resident expat buying a first, ready home needs ≈ AED 542k on day one: the 20% down payment plus the DLD transfer fee, the agent\'s commission and the registration, valuation and bank fees. Since 1 February 2025, under UAE Central Bank rules, banks don\'t finance the DLD fee or the agent\'s commission.',
      },
      {
        q: 'What do I need besides the down payment?',
        a: "The 4% DLD transfer fee, trustee and mortgage registration fees, the agent's commission, the valuation and the bank's processing fee. Banks don't finance these, so they come from your savings.",
        home: true,
      },
      {
        q: 'What hidden costs do people miss?',
        a: 'Most often the valuation gap: when the bank values the property below the price, you pay the difference. Also life and property insurance, and early settlement fees if you sell or refinance early.',
        home: true,
      },
      {
        q: "What's the valuation gap?",
        a: 'If the bank values the property below the price, the bank lends on the lower figure and you pay the difference in cash. We order a valuation check before you sign where possible.',
      },
      { q: 'Do I need to be rich to get a mortgage in Dubai?', a: "No. The usual floor is a salary of about AED 15,000 a month and a loan of at least AED 200–350k. What matters more is cash: a resident buying a first home needs about 27% of the price on day one for the down payment and fees." },
    ],
  },
  {
    id: 'borrow',
    title: 'How much can I borrow?',
    items: [
      { q: 'Is there a cap?', a: "Two. Loan-to-value: 80% for an expat's first home up to AED 5M (70% above), 85% / 75% for UAE nationals, 60–65% for further properties and 50–60% for non-residents. And debt burden: all repayments under 50% of income. Each bank also has a maximum loan, typically AED 6–35M." },
      {
        q: 'How do banks count credit-card limits?',
        a: 'Banks count ≈5% of your total card limit as a monthly payment, even if you pay the card in full. Debt burden above 50% once card limits are counted is one of the five most common reasons for a decline.',
      },
      {
        q: 'Do bonus, commission and rent count?',
        a: 'Bonus and commission shown over 12–24 months, rental income with tenancy contracts, foreign-currency salary from a recognised employer — each has a bank that counts it. What decides it: averages and consistency, not the best month.',
      },
      {
        q: 'I earn in euros or dollars — will the bank accept that?',
        a: 'Salaried or company income in EUR, GBP, USD and other major currencies is accepted by several banks, with 6 months of statements and a healthy average balance. Which bank depends on your currency and whether you are a resident.',
      },
    ],
  },
  {
    id: 'process',
    title: 'Process and documents',
    items: [
      {
        q: "What's the first step if I want to buy now?",
        a: "A 15-minute discovery call. We review income, debts and the property and tell you honestly what's possible. From you: nothing yet, just the conversation.",
      },
      {
        q: 'Do I need to be in Dubai to apply?',
        a: 'For pre-approval, no. Most of the process runs remotely. Signing at the transfer can usually be done through a power of attorney. [[tbc:confirm]]',
      },
      {
        q: 'What documents do I need, and can I start before finding a property?',
        a: 'Nothing is needed for the first call. For pre-approval, salaried clients send a passport, 6 months of payslips and a salary certificate, 6 months of bank statements and proof of address; business owners add the trade licence, company documents and audited accounts. A pre-approval lets you start before you find the property.',
      },
      {
        q: "What's a pre-approval and why get one before viewing?",
        a: 'A pre-approval is the bank\'s written confirmation of how much it will lend you. Valid 30–60 days depending on the bank, so you can make an offer with confidence.',
      },
      {
        q: 'How long does the whole process take?',
        a: `Plan for ${data(site.sla.preApprovalResident, 'sla.preApprovalResident')} to pre-approval (${data(site.sla.preApprovalNonResident, 'sla.preApprovalNonResident')} for non-residents) and 2–3 weeks from valuation to transfer.`,
      },
      { q: 'Can I get approved in under a week?', a: `Usually yes for the pre-approval: with complete documents it takes ${data(site.sla.preApprovalResident, 'sla.preApprovalResident')}. The full mortgage takes longer, because the valuation, the final offer letter and the transfer appointment add 2–3 weeks.` },
      {
        q: 'Can I get a mortgage on an off-plan property?',
        a: 'Yes, up to 50% of the price until completion, on completed or near-complete units from registered developers with Oqood registration. After completion the limit rises to 60–80% depending on your status.',
      },
      { q: 'What if the developer delays the handover?', a: "Pre-approvals and valuations expire, usually after 30–60 days, so a delay can mean renewing them, sometimes for a small fee. We keep the file ready and re-time the valuation and offer letter to the new handover date." },
    ],
  },
  {
    id: 'rates',
    title: 'Rates and life changes',
    items: [
      { q: 'Fixed or variable — which saves more?', a: "It depends on where rates go. A fixed rate, usually for 1–5 years, protects you while rates are high or uncertain; afterwards it moves to a variable rate, typically 3-month EIBOR plus 1.5–2.25%. Variable can be cheaper when EIBOR falls. Compare the follow-on margin and the exit fees, not just the starting rate." },
      { q: 'Why do two people pay different rates at the same bank?', a: "Because pricing depends on the borrower: whether your salary is transferred to that bank, salaried or self-employed, loan size and loan-to-value, your employer, and the bank's client tier. The gap is often 0.25–0.5% or more." },
      { q: 'Can I move my mortgage to another bank?', a: "Yes, it's called a buy-out. Most banks want 3–6 months of repayments first and usually charge no processing fee. Your current bank charges early settlement of 1% of the balance or AED 10,000, whichever is lower, and some waive it after a few years." },
      { q: 'What happens if I lose my job or leave the UAE?', a: "The mortgage stays in place and the payments are still due. Tell the bank early: options include restructuring the loan, renting the property out or selling it. Leaving the UAE doesn't cancel the loan, and many owners keep paying from abroad." },
      {
        q: 'Can I rent out a mortgaged property?',
        a: 'Yes, with most banks. Tell us upfront so we choose a bank that allows it.',
      },
      {
        q: 'How does early repayment work?',
        a: 'The early-settlement fee is capped at 1% of the outstanding balance or AED 10,000, whichever is lower.',
      },
    ],
  },
  {
    id: 'why',
    title: 'Why Lenty?',
    items: [
      {
        q: 'Broker or bank — which is better?',
        a: 'Your bank offers one product. We compare banks for your profile and handle the parts that usually stall a complex file: income structure, documents and valuation timing.',
        home: true,
      },
      {
        q: 'Do mortgage brokers in Dubai charge clients?',
        a: `For UAE residents and nationals our service is free: banks pay us after your mortgage completes. For non-residents the fee is ${data(site.fees.nonResident, 'fees.nonResident')}, agreed in writing before we start.`,
      },
      { q: 'What does a broker actually do behind the scenes?', a: "We read your file the way an underwriter would, check it against each bank's current policy, choose the bank, prepare and submit the documents, chase the bank, order the valuation, and coordinate with the developer, agent and trustee until the transfer." },
      { q: 'Will banks start calling me?', a: 'No. One advisor, one number.' },
      { q: 'Do you also sell property?', a: "No. We only do mortgages. That's why agents trust us with their clients.", home: true },
    ],
  },
];

export const faqCount = faq.reduce((n, g) => n + g.items.length, 0);

/** Home page subset: 6 questions, 2 per group (copy-deck 2.9). */
export const homeFaq: FaqGroup[] = [
  { id: 'approved', title: 'Will I get approved?', items: faq[0].items.filter((i) => i.home) },
  { id: 'cash', title: 'How much cash do I need?', items: faq[1].items.filter((i) => i.home) },
  { id: 'why', title: 'Why Lenty?', items: faq[5].items.filter((i) => i.home) },
];
