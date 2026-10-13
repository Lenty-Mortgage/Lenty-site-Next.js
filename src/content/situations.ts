import { site } from '../config/site';
import { data } from '../lib/rich';

export type Fact = { v: string; k: string };
export type Situation = {
  slug: string;
  nav: string; // dropdown label
  card: { title: string; line: string }; // home card
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  lead: string;
  facts: Fact[];
  banks: { accept: string; reject: string; decides: string };
  cash?: { intro: string; example: string; status: 'resident' | 'nonresident' | 'national' };
  reasons?: { title: string; items: string[] };
  timelineBack?: { title: string; items: string[] };
  documents?: { title: string; items: string[] }[];
  timeline?: string;
  cases: string[]; // case slugs from cases.ts
  extraCases?: string[]; // one-line cases without a page (only with client consent)
  questions: { q: string; a: string | null }[];
  related: { label: string; href: string }[];
  calcHref: string;
};

const PENDING = '[[tbc:Answer to be written by an advisor]]';
const NR_FEE = data(site.fees.nonResident, 'fees.nonResident');

export const situations: Situation[] = [
  {
    slug: 'non-resident',
    nav: 'Living outside the UAE',
    card: { title: 'I live outside the UAE', line: 'Non-resident mortgages: 50–60% financing, remote process, income in any major currency.' },
    metaTitle: 'Non-resident mortgage in Dubai: 50–60% financing | Lenty',
    metaDescription: "You don't need UAE residency for a Dubai mortgage. You need the bank whose rules fit your country, your currency and your income. Lenty handles that part.",
    eyebrow: 'Living outside the UAE',
    h1: 'Buy in Dubai while you live abroad',
    lead: "You don't need UAE residency for a Dubai mortgage. You need the bank whose rules fit your country, your currency and your income. That's the part we handle.",
    facts: [
      { v: '50–60%', k: 'typical financing' },
      { v: '≈ AED 25k', k: 'usual minimum net income per month' },
      { v: '25 yrs', k: 'maximum term' },
      { v: '≈ 57%', k: 'of the price in cash on a 2M apartment' },
    ],
    banks: {
      accept: 'Salaried or company income in EUR, GBP, USD and other major currencies; 6 months of statements with a healthy average balance.',
      reject: 'Income without statements, cash-only businesses, a few restricted nationalities at some banks.',
      decides: 'Which bank, your currency, and whether the property is ready or off-plan (off-plan is capped at 50%).',
    },
    cash: {
      intro: "Non-residents usually borrow up to 50–60% of the price. On top of the down payment come the fees banks don't finance.",
      example: '**Example, AED 2,000,000 ready apartment, 50% financing:** down payment 1,000,000 + DLD 80,580 + agent 42,000 + registration, valuation and bank fees ≈ 20,500. **Total ≈ AED 1.14M.**',
      status: 'nonresident',
    },
    documents: [
      { title: 'Salaried', items: ['Passport (all pages)', '6 months of payslips and a salary certificate', '6 months of personal bank statements', 'Proof of address', 'Credit report from your country (some banks)'] },
      { title: 'Business owner', items: ['Passport', 'Certificate of incorporation, shareholder register, articles', '6–12 months of company and personal statements', 'Audited accounts, usually 2 years', 'Proof of address'] },
    ],
    timeline: `Plan for ${data(site.sla.preApprovalNonResident, 'sla.preApprovalNonResident')} to pre-approval and 2–3 weeks from valuation to transfer. Most of the process is remote.`,
    cases: ['non-resident-business-owner-approved'],
    questions: [
      { q: 'Do I have to travel to Dubai?', a: 'Not for the pre-approval: it runs remotely. For the transfer at the trustee office, your advisor confirms what your case needs.' },
      { q: 'Is there a fee for non-residents?', a: `Yes. Non-resident files take more work, so we charge a fee agreed in writing before we start: ${NR_FEE}.` },
      { q: 'Which nationalities are restricted?', a: "It depends on the bank. A few nationalities are excluded by some banks and accepted by others. Tell us yours and we'll check." },
      { q: 'Will the bank accept my foreign credit history?', a: "Some banks ask for a credit report from your country; a clean UAE record isn't required because you don't have one yet." },
      { q: 'Can I rent the property out?', a: 'Yes, with most banks. Tell us upfront so we choose a bank that allows it.' },
    ],
    related: [
      { label: 'Off-plan handover', href: '/situations/off-plan-handover/' },
      { label: 'Business owner', href: '/situations/business-owner/' },
      { label: 'Cash-to-close calculator', href: '/calculators/cash-to-close/?status=nonresident' },
    ],
    calcHref: '/calculators/cash-to-close/?status=nonresident',
  },
  {
    slug: 'business-owner',
    nav: 'Business owner or self-employed',
    card: { title: "I own a business or I'm self-employed", line: 'Banks read company income differently. We structure the file before it reaches them.' },
    metaTitle: 'Self-employed and business owner mortgage in the UAE | Lenty',
    metaDescription: "Banks don't take your word for company income. They want statements, audits and time in business, and each weighs them differently. We structure the file first.",
    eyebrow: 'Business owner or self-employed',
    h1: "Business owner? Here's how UAE banks read your income",
    lead: "Banks don't take your word for company income. They take statements, audits and time in business — and each bank weighs them differently.",
    facts: [
      { v: '80%', k: 'financing for residents (first home ≤ 5M)' },
      { v: '2 yrs', k: 'of company history at most banks' },
      { v: '6–12 mo', k: 'of statements' },
      { v: '≈ AED 15–30k', k: 'minimum income depending on bank' },
    ],
    banks: {
      accept: 'Trade licence, audited accounts or VAT returns, regular transfers to a personal account.',
      reject: 'Cash-heavy turnover, a business under 6–12 months, income that never reaches your personal account.',
      decides: 'Time in business (2+ / 1–2 / under 1 year — each has different banks), and whether the average balance supports the payment.',
    },
    cash: {
      intro: "Residents borrow up to 80% on a first home up to AED 5M. On top of the down payment come the fees banks don't finance: DLD, agent, trustee, valuation and the bank's processing fee.",
      example: '**Example, AED 2,000,000 ready apartment, 80% financing:** down payment 400,000 + DLD 80,580 + agent 42,000 + registration, valuation and bank fees ≈ 19,900. **Total ≈ AED 542k.**',
      status: 'resident',
    },
    documents: [
      { title: 'Business owner', items: ['Passport, Emirates ID and visa', 'Trade licence', 'Certificate of incorporation, shareholder register, articles', '6–12 months of company and personal statements', 'Audited accounts, usually 2 years, or VAT returns', 'Proof of address'] },
    ],
    timeline: `Plan for ${data(site.sla.preApprovalResident, 'sla.preApprovalResident')} to pre-approval and 2–3 weeks from valuation to transfer. Nothing is needed for the first call.`,
    cases: ['non-resident-business-owner-approved'],
    questions: [
      { q: 'Do I need audited accounts?', a: "Not always. Many banks lend without audited accounts up to a loan size of roughly AED 1–10M, depending on the bank, using VAT returns or 6–12 months of bank statements instead. Without audits, financing is usually capped lower, around 50–70%. Above those thresholds, expect two years of audited financials." },
      { q: 'My company is 8 months old — is it hopeless?', a: "Not hopeless, but early. Most banks want 2–3 years in business, and a few accept 12 months at a lower loan-to-value. Under a year the options are very limited and change often. We plan the file for your 12-month mark, or check whether a salaried co-borrower can carry it now." },
      { q: 'Can I use dividends?', a: "Banks rarely count dividends as a separate income. They look at your share of the company's profit in the audited accounts, or at the money that regularly reaches your personal account. If dividends arrive on a steady schedule, that pattern helps the file." },
      { q: 'I pay myself a small salary — what counts?', a: "For an owner, most banks set your salary aside and assess the business: your share of audited profit, an industry margin applied to VAT turnover, or the average monthly credits over 6–12 months. Owners with a small stake (under 10–25% at some banks) can sometimes be treated as salaried instead." },
      { q: 'How do banks treat a free-zone company?', a: "Much like a mainland company: the same time-in-business and income rules apply. Two differences: if you own 100%, some banks add the company's own loans to your debt burden, and a flexi-desk or business-centre licence may need an extra explanation." },
    ],
    related: [
      { label: 'Non-standard income', href: '/situations/non-standard-income/' },
      { label: 'Declined', href: '/situations/declined/' },
      { label: 'How much can I borrow', href: '/calculators/affordability/?income=self-employed' },
    ],
    calcHref: '/calculators/cash-to-close/?status=resident',
  },
  {
    slug: 'declined',
    nav: 'My bank said no',
    card: { title: 'My bank already said no', line: 'A decline at one bank says little about the others. We find out why, and where it works.' },
    metaTitle: 'Mortgage declined in the UAE? What to do next | Lenty',
    metaDescription: "A decline tells you the file didn't fit that bank's checklist. It doesn't tell you which bank it fits. Lenty finds out why — and where it works.",
    eyebrow: 'My bank said no',
    h1: "Declined by your bank? That's one bank's rule, on one day",
    lead: "A decline tells you the file didn't fit that bank's checklist. It doesn't tell you which bank it fits. We find out why — and where it works.",
    facts: [
      { v: '5', k: 'common reasons for a decline' },
      { v: '1', k: 'honest review before we approach another bank' },
    ],
    banks: {
      accept: 'A decline for debt burden, income type, employer category or property type — fixable with a different bank or a restructured file.',
      reject: 'Active defaults, bounced cheques or an unpaid court judgment — these need time and a plan, not a new application.',
      decides: 'Knowing the real reason. We ask the bank, then read your Etihad Credit Bureau report with you.',
    },
    reasons: {
      title: 'Why banks say no (5 reasons)',
      items: [
        'Debt burden above 50% once card limits are counted',
        "Income type the bank's policy doesn't accept",
        "Employer or company not on the bank's list",
        'Property type or developer',
        'Credit history, often an old card you forgot',
      ],
    },
    cases: ['non-resident-business-owner-approved'],
    questions: [
      { q: 'Will a second application hurt my credit score?', a: "Each application shows up as an enquiry on your Al Etihad Credit Bureau report, and several in a short time make the next bank cautious. That's why we find the reason first and apply once, to the bank whose rules fit. Your score also affects the offer: some banks give 80% only above roughly 650–700." },
      { q: 'How long after a decline can I reapply?', a: "There's no fixed waiting period. If the decline was about one bank's policy (income type, employer, property), another bank can look at it straight away. If it was about credit history or debt burden, fix that first, which takes from a few weeks (closing cards) to several months." },
      { q: 'Can you see why I was declined?', a: 'Knowing the real reason is what decides it. We ask the bank, then read your Etihad Credit Bureau report with you.' },
      { q: 'What if the problem is my credit cards?', a: "Banks count 5% of every card limit as a monthly payment, even if you never use the card, and all repayments together must stay under 50% of your income. Closing or reducing unused cards before you apply often frees enough room. We calculate exactly which ones." },
      { q: "What can't you fix?", a: 'Active defaults and unpaid judgments. We tell you that on the first call, with a plan.' },
    ],
    related: [
      { label: 'Non-standard income', href: '/situations/non-standard-income/' },
      { label: 'Business owner', href: '/situations/business-owner/' },
      { label: 'Check my chances', href: '/check/?s=declined' },
    ],
    calcHref: '/calculators/cash-to-close/',
  },
  {
    slug: 'off-plan-handover',
    nav: 'Off-plan handover due',
    card: { title: 'My off-plan handover payment is due', line: "Plan the handover mortgage early, so valuation and documents don't expire before the deadline." },
    metaTitle: 'Handover mortgage for off-plan property in Dubai | Lenty',
    metaDescription: "Most of our non-resident clients come to us at handover. The risk isn't approval — it's timing: valuation, documents and pre-approval all have expiry dates.",
    eyebrow: 'Off-plan handover due',
    h1: "Your handover payment is due. Let's get the mortgage there first",
    lead: "Most of our non-resident clients come to us at handover. The risk isn't approval — it's timing: valuation, documents and pre-approval all have expiry dates.",
    facts: [
      { v: '50%', k: 'maximum financing until completion' },
      { v: '60–80%', k: 'after completion depending on your status' },
      { v: '6–8 weeks', k: 'is a comfortable runway' },
      { v: '30–60 days', k: 'a pre-approval stays valid' },
    ],
    banks: {
      accept: 'Completed or near-complete units from registered developers with Oqood registration.',
      reject: "Units far from completion, developers not on the bank's panel.",
      decides: 'The completion certificate date and whether the valuation comes in at the price.',
    },
    timelineBack: {
      title: 'Timeline backwards from the deadline',
      items: ['Week 0 — discovery', 'Week 1 — pre-approval submitted', 'Week 2–3 — valuation', 'Week 4–5 — final offer', 'Week 6 — transfer at the trustee'],
    },
    cash: {
      intro: "Off-plan properties are financed up to 50% until completion. On top of the down payment come the fees banks don't finance.",
      example: '**Example, AED 2,000,000 off-plan apartment, 50% financing:** down payment 1,000,000 + DLD 80,580 + registration, valuation and bank fees ≈ 20,500. **Total ≈ AED 1.1M** without an agent.',
      status: 'resident',
    },
    cases: ['off-plan-handover-before-deadline'],
    questions: [
      { q: 'What if the developer delays?', a: "Pre-approvals and valuations expire, usually after 30–60 days, so a delay can mean renewing them, sometimes for a small fee. We keep the file ready and re-time the valuation and offer letter to the new handover date." },
      { q: 'Can I get the mortgage before the completion certificate?', a: "Yes, on completed or near-complete units from developers the bank approves, registered with Oqood, once you have paid at least half of the price yourself. Financing is capped at 50% of the price until completion; after it the usual limits for your status apply." },
      { q: 'What if valuation is below the price?', a: 'If the bank values the property below the price, the bank lends on the lower figure and you pay the difference in cash. We order a valuation check before you sign where possible.' },
      { q: 'Can the bank pay the developer directly?', a: "Yes. For handover and off-plan financing the bank pays the developer directly, following the payment plan, once your own share has been paid." },
      { q: 'Do I pay DLD again at handover?', a: "No. The 4% DLD transfer fee is paid once, when the purchase is registered (for off-plan, at Oqood registration). At handover you pay the mortgage registration fee, 0.25% of the loan plus AED 290, a small fee for the title deed, and the trustee, valuation and bank fees." },
    ],
    related: [
      { label: 'Non-resident', href: '/situations/non-resident/' },
      { label: 'Portfolio', href: '/situations/portfolio/' },
      { label: 'Cash-to-close calculator', href: '/calculators/cash-to-close/?stage=offplan' },
    ],
    calcHref: '/calculators/cash-to-close/?stage=offplan',
  },
  {
    slug: 'non-standard-income',
    nav: "Income isn't a simple salary",
    card: { title: "My income isn't a simple salary", line: 'Bonus, commission, rental income, foreign currency, a new job: each has a bank that accepts it.' },
    metaTitle: 'Mortgage with bonus, rental or foreign income in UAE | Lenty',
    metaDescription: 'Banks like a fixed salary on a UAE payslip. Real income rarely looks like that. Lenty finds the bank whose policy matches your income.',
    eyebrow: "Income isn't a simple salary",
    h1: 'Bonus, commission, rent or a new job? Each has a bank that counts it',
    lead: 'Banks like a fixed salary on a UAE payslip. Real income rarely looks like that. The job is to find the bank whose policy matches your income — and to show it the way they read it.',
    facts: [
      { v: '6 months', k: 'of statements usually needed' },
      { v: '3 months', k: 'in a new job can be enough with a confirmation letter' },
      { v: '70–80%', k: 'of rental income counted' },
    ],
    banks: {
      accept: 'Bonus and commission shown over 12–24 months, rental income with tenancy contracts, foreign-currency salary from a recognised employer.',
      reject: 'Cash income, undeclared rent, income without a paper trail.',
      decides: 'Averages and consistency, not the best month.',
    },
    cases: ['bonus-counted-through-account-history'],
    questions: [
      { q: 'My salary is in EUR — will the bank accept it?', a: 'Foreign-currency salary from a recognised employer is accepted by several banks. Which bank depends on your currency and whether you are a resident.' },
      { q: 'I just changed jobs — do I have to wait?', a: "Not always. Several banks accept 3 months in the new job, and a few one salary credit with a confirmation letter, especially if you worked in the UAE before. Others want 6 months. Keep your confirmation letter and your previous employer's experience letter ready." },
      { q: 'Does rental income count?', a: 'Yes, with tenancy contracts — banks count 70–80% of it.' },
      { q: "I'm a freelancer with several clients — what do banks want?", a: "Banks treat freelancers like the self-employed: a licence or freelance permit and usually 6–12 months of personal bank statements with regular credits. Some programmes lend on the average monthly credits, typically up to 60–65% of the price." },
      { q: 'Can two incomes be combined?', a: "Yes. Spouses often apply together, and some banks accept a parent, child or sibling as co-borrower. Each bank sets a minimum per person, often AED 10–15k for the main applicant, and some limit the application to two people." },
    ],
    related: [
      { label: 'Business owner', href: '/situations/business-owner/' },
      { label: 'Declined', href: '/situations/declined/' },
      { label: 'How much can I borrow', href: '/calculators/affordability/' },
    ],
    calcHref: '/calculators/affordability/',
  },
  {
    slug: 'over-55',
    nav: '55 or older',
    card: { title: "I'm 55 or older", line: "Age limits are 65 or 70 at the end of the loan. Term, co-borrowers and exceptions decide what's possible." },
    metaTitle: 'Mortgage over 55 in the UAE: age limits and term | Lenty',
    metaDescription: 'UAE banks want the loan repaid by 65 or 70. That shortens the term and raises the payment. Co-borrowers, exceptions and the right bank bring it back in reach.',
    eyebrow: '55 or older',
    h1: 'Over 55? The term is the question, not the approval',
    lead: 'UAE banks want the loan repaid by 65 (salaried) or 70 (self-employed and nationals). That shortens the term — and raises the payment. Co-borrowers, exceptions and the right bank bring it back within reach.',
    facts: [
      { v: '65 / 70', k: 'age at the end of the loan' },
      { v: '10–15 yrs', k: 'typical term at 55' },
      { v: '1', k: 'co-borrower changes the maths' },
      { v: 'exceptions', k: 'exist for pension letters and portfolio income' },
    ],
    banks: {
      accept: 'Pension or employer letter confirming income beyond 65, rental income, a younger co-borrower.',
      reject: 'A term that pushes the payment above 50% of income.',
      decides: 'The debt-burden ratio at the shorter term.',
    },
    cases: ['term-extended-with-co-borrower'],
    questions: [
      { q: 'Can my adult child be a co-borrower without owning the property?', a: "Often, yes. Many banks accept a son or daughter as co-borrower, which lets the term run on the younger person's age. Whether they also have to be on the title deed depends on the bank: we have closed a case where the property stayed in the parent's name only." },
      { q: 'Is life insurance mandatory and how much?', a: "Life cover on the loan is standard. Most banks arrange it and add it to the monthly payment, roughly 0.01–0.03% of the outstanding balance per month. A few accept an existing policy assigned to the bank. When the term runs past the usual age limit, it is mandatory and can cost more." },
      { q: 'Can I get a mortgage on a villa for retirement?', a: "Yes. The property type isn't the issue, the term is. With the loan due by 65 or 70, a shorter term means a higher monthly payment, so your income, or a co-borrower's, has to support it." },
      { q: "What if I'm retired already?", a: "It's possible, but the options are narrow. Some banks accept pension income for UAE nationals. For expats, retirement income is assessed case by case, usually alongside rental income, savings or a working co-borrower. Tell us what you receive and from where." },
      { q: 'Does the age limit apply to non-residents?', a: "Yes. For non-residents most banks want the loan repaid by 65; a few allow 70 for self-employed applicants." },
    ],
    related: [
      { label: 'Portfolio', href: '/situations/portfolio/' },
      { label: 'Non-standard income', href: '/situations/non-standard-income/' },
      { label: 'Monthly payment calculator', href: '/calculators/monthly-payment/' },
    ],
    calcHref: '/calculators/monthly-payment/',
  },
  {
    slug: 'portfolio',
    nav: 'Growing a portfolio',
    card: { title: "I'm growing a portfolio", line: 'Second-home rules, equity release and buy-outs. Plan the next purchase around the cash you already have.' },
    metaTitle: 'Second home mortgage or equity release in Dubai | Lenty',
    metaDescription: 'The second mortgage has different limits than the first. Equity in a paid-off property can become the down payment for the next one.',
    eyebrow: 'Growing a portfolio',
    h1: 'Second home, equity release or buy-out: plan the next purchase around the cash you have',
    lead: 'The second mortgage has different limits than the first. Equity in a paid-off property can become the down payment for the next one.',
    facts: [
      { v: '60% / 65%', k: 'financing on a second home (expat / national)' },
      { v: 'up to 60%', k: 'equity release on a paid-off property' },
      { v: '1% or AED 10,000', k: 'early-settlement cap, whichever is lower' },
      { v: '50%', k: 'debt burden across all loans' },
    ],
    banks: {
      accept: 'Rental income from existing units (with contracts), clean payment history, equity in freehold property.',
      reject: 'Debt burden already near 50%, properties outside freehold areas.',
      decides: "Total exposure across banks, and the valuation of the property you're releasing equity from.",
    },
    cash: {
      intro: 'A second home is financed up to 60% for expats and 65% for nationals. The down payment and the fees banks don\'t finance come from your savings — or from equity in a property you already own.',
      example: '**Example, AED 2,000,000 second home, 60% financing:** down payment 800,000 + DLD 80,580 + agent 42,000 + registration, valuation and bank fees ≈ 19,100. **Total ≈ AED 942k.**',
      status: 'resident',
    },
    cases: [],
    questions: [
      { q: 'Can I move my mortgage to a bank with a lower rate?', a: "Yes, it's called a buy-out. Most banks want 3–6 months of repayments first and usually charge no processing fee. Your current bank charges early settlement of 1% of the balance or AED 10,000, whichever is lower, and some waive it after a few years." },
      { q: 'How does equity release work in Dubai?', a: "A bank lends against a property you own, usually up to 50–70% of its value minus any outstanding loan. Larger amounts are normally paid to a seller or contractor rather than to your account, so it works best as the down payment for the next purchase. Non-residents can rarely release equity." },
      { q: 'Do I pay DLD on a buy-out?', a: "No 4% transfer fee, because ownership doesn't change. You pay to release the old mortgage and register the new one (0.25% of the loan plus fees), plus the valuation. Many banks refund the valuation or the buy-out fees to win the loan." },
      { q: 'Can rental income alone qualify me?', a: "Yes, but the bar is high: when rent is your only income, banks usually want several rented properties or a high annual rent, and lend up to about 60%. Rent on top of a salary or business income is much easier, with banks counting 70–80% of it. We closed a purchase using only the rent from three paid-off units." },
      { q: 'Is there a limit on how many mortgages I can have?', a: "There's no legal limit, but banks set their own, commonly 3–6 properties per customer. From the second property, financing drops to 60–65% of the price." },
    ],
    related: [
      { label: 'Non-standard income', href: '/situations/non-standard-income/' },
      { label: 'Over 55', href: '/situations/over-55/' },
      { label: 'Monthly payment calculator', href: '/calculators/monthly-payment/' },
    ],
    calcHref: '/calculators/cash-to-close/?home=second',
  },
];

export const situationBySlug = (slug: string) => situations.find((s) => s.slug === slug);

/** Dropdown + home cards (8th card goes to WhatsApp). */
export const notSure = { title: "I'm not sure where I fit", line: 'Describe your situation in one message. An advisor tells you honestly what\'s possible.', nav: 'Not sure where I fit' };
