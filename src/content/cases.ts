export type Case = {
  slug: string;
  tag: string;
  situation: string; // filter chip
  situationSlug: string;
  result: string;
  line: string;
  readTime: string;
  overview: { k: string; v: string }[];
  problem: string;
  changed: string;
  outcome: string;
  advisor: string; // advisor slug
};

export const cases: Case[] = [
  {
    slug: 'non-resident-business-owner-approved',
    tag: 'Non-resident · business owner',
    situation: 'Non-resident',
    situationSlug: 'non-resident',
    result: 'Approved after three banks declined',
    line: 'Company income from abroad, villa above AED 5M. We chose a bank that assesses company accounts instead of a personal salary.',
    readTime: '2 min read',
    overview: [
      { k: 'Situation', v: 'Non-resident business owner, three declines' },
      { k: 'Country / currency', v: '[[tbc:country]] / EUR' },
      { k: 'Property', v: 'Villa above AED 5M, ready' },
      { k: 'What went wrong', v: 'Three banks assessed a personal salary that did not exist on paper' },
      { k: 'The bank that said yes', v: 'A bank that underwrites company accounts for non-residents' },
      { k: 'Result', v: 'Approved [[tbc:LTV and term]]' },
      { k: 'Time to approval', v: '[[tbc:weeks]]' },
    ],
    problem:
      'The client ran a company abroad and paid himself irregularly. Three banks looked for a fixed personal salary on a payslip, did not find one, and declined. Each decline cost weeks and the villa was above AED 5M, where financing limits are lower anyway.',
    changed:
      'We stopped presenting the file as a salaried case. Instead we chose a bank that assesses company accounts: audited statements, shareholder register and the pattern of transfers to the personal account. The file went in once, structured the way that bank reads it.',
    outcome:
      'Approved on the fourth application — the first one we handled. Details changed to protect the client\'s privacy. [[tbc:client consent or full anonymisation]]',
    advisor: 'nazar',
  },
  {
    slug: 'off-plan-handover-before-deadline',
    tag: 'Off-plan handover',
    situation: 'Off-plan',
    situationSlug: 'off-plan-handover',
    result: 'Mortgage in place before the developer deadline',
    line: 'Salary in EUR, handover payment due in six weeks. Valuation and documents were planned backwards from the due date.',
    readTime: '2 min read',
    overview: [
      { k: 'Situation', v: 'Non-resident, handover payment due in six weeks' },
      { k: 'Country / currency', v: '[[tbc:country]] / EUR' },
      { k: 'Property', v: 'Off-plan apartment at handover' },
      { k: 'What went wrong', v: 'The first bank would not count the bonus; time was running out' },
      { k: 'The bank that said yes', v: 'A bank that accepts EUR income for non-residents' },
      { k: 'Result', v: 'Mortgage ready before the developer\'s deadline' },
      { k: 'Time to approval', v: '[[tbc:weeks]]' },
    ],
    problem:
      'The handover payment was due in six weeks. The client earned a salary in EUR with a large bonus, and the first bank ignored the bonus, which pushed the payment above the debt-burden limit. The risk was not approval — it was timing: valuation, documents and pre-approval all have expiry dates.',
    changed:
      'We planned backwards from the due date: pre-approval submitted in week one, valuation ordered immediately, documents collected with their validity dates in mind. We placed the file with a bank that accepts EUR income for non-residents.',
    outcome:
      'The mortgage was ready before the developer\'s deadline. Details changed to protect the client\'s privacy. [[tbc:client consent or full anonymisation]]',
    advisor: 'nazar',
  },
  {
    slug: 'bonus-counted-through-account-history',
    tag: 'Resident · bonus income',
    situation: 'Non-standard income',
    situationSlug: 'non-standard-income',
    result: 'Bonus counted through account history',
    line: 'The first bank ignored the bonus. A second bank accepted it based on the average account balance.',
    readTime: '2 min read',
    overview: [
      { k: 'Situation', v: 'UAE resident, salary plus a large annual bonus' },
      { k: 'Country / currency', v: 'UAE / AED' },
      { k: 'Property', v: 'Ready apartment [[tbc:price range]]' },
      { k: 'What went wrong', v: 'The first bank counted only the basic salary' },
      { k: 'The bank that said yes', v: 'A bank that reads average account balance over 12 months' },
      { k: 'Result', v: 'Bonus counted, payment within the debt-burden limit' },
      { k: 'Time to approval', v: '[[tbc:days]]' },
    ],
    problem:
      'The client\'s basic salary was modest; most of the income came as a bonus. The first bank counted only the basic salary, and the loan amount it offered did not cover the property.',
    changed:
      'We moved the file to a bank that assesses income through the account history rather than the payslip alone. Twelve months of statements showed a consistent average balance that supported the payment.',
    outcome:
      'The bonus was counted and the loan amount matched the purchase. Details changed to protect the client\'s privacy. [[tbc:client consent or full anonymisation]]',
    advisor: 'nazar',
  },
  {
    slug: 'term-extended-with-co-borrower',
    tag: 'Age 60+',
    situation: '55+',
    situationSlug: 'over-55',
    result: 'Term extended with a co-borrower',
    line: 'The age limit cut the term short. Adding a family co-borrower brought the payment within the debt-burden limit.',
    readTime: '2 min read',
    overview: [
      { k: 'Situation', v: 'Salaried resident, age 60+' },
      { k: 'Country / currency', v: 'UAE / AED' },
      { k: 'Property', v: 'Ready apartment [[tbc:price range]]' },
      { k: 'What went wrong', v: 'A five-year term pushed the payment above 50% of income' },
      { k: 'The bank that said yes', v: 'A bank that allows a younger family co-borrower' },
      { k: 'Result', v: 'Longer term, payment within the limit' },
      { k: 'Time to approval', v: '[[tbc:days]]' },
    ],
    problem:
      'UAE banks want a salaried loan repaid by 65. At 60 that left a five-year term, and the monthly payment on that term was far above the 50% debt-burden limit.',
    changed:
      'We added a younger family member as a co-borrower, which let the bank calculate the term on the younger age. The payment fell back within the limit without changing the property or the price.',
    outcome:
      'Approved with the longer term. Details changed to protect the client\'s privacy. [[tbc:client consent or full anonymisation]]',
    advisor: 'nazar',
  },
];

export const caseBySlug = (slug: string) => cases.find((c) => c.slug === slug);
