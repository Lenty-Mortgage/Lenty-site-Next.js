/**
 * site.config — the single place for every variable from copy-deck section 0.
 * `null` = not confirmed yet. Use `tbc(label)` / <Tbc> to render a placeholder.
 */

export const site = {
  name: 'Lenty',
  tagline: 'UAE mortgage advisors for complex cases',
  company: {
    legalName: 'LENTY MORTGAGE CONSULTANT L.L.C',
    license: 'DED Trade License 1565247',
    licenseIssued: '29 October 2025',
    licenseRenewal: '28 October 2027' as string | null, // licence valid until
    trn: '105222729300001',
    address: 'Tameem House, Office 2803, Barsha Heights, Dubai, UAE' as string | null,
    phone: '+971 54 244 9656' as string | null,
    phoneTel: '+971542449656' as string | null, // E.164 for tel: links
    whatsapp: '+971 54 244 9656',
    whatsappDigits: '971542449656',
    email: 'support@lenty.com' as string | null,
    hours: 'Mon–Fri 9:00–18:00 Dubai time' as string | null,
    founded: 2025,
    instagram: 'https://www.instagram.com/lenty.mortgage',
    facebook: 'https://www.facebook.com/share/18F9KNPi8N/',
    linkedin: 'https://www.linkedin.com/company/109534117/',
  },
  // Date the advisor last reviewed the situation pages, FAQ and glossary (shown as "Reviewed … by", WebPage.lastReviewed)
  contentReviewed: { iso: '2026-10-13', label: '13 October 2026' },
  banks: {
    count: 20 as number | null,
    phrase: 'access to', // «Access to 20+ banks»
    logos: [] as { name: string; src: string }[], // [TO CONFIRM: 6–8 logos with permission]
  },
  sla: {
    firstReplyMinutes: 15 as number | null,
    preApprovalResident: '24–48 hours' as string | null,
    preApprovalNonResident: '24–48 hours' as string | null, // [TO CONFIRM: same for non-residents?]
    bankMatching: '24–48 h' as string | null,
    complexCases: null as string | null, // null = not shown (not confirmed)
  },
  fees: {
    resident: 'Free',
    nonResident: 'AED 10,000' as string | null,
  },
  google: {
    rating: null as number | null,
    reviews: 1,
    url: 'https://www.google.com/maps/place/Lenty/@25.099493,55.1745961,17z/data=!3m1!4b1!4m6!3m5!1s0x2c62a7d9c85112f:0xb4a367de554948f9!8m2!3d25.099493!4d55.177171!16s%2Fg%2F11yxb36xyd' as string | null,
  },
  partners: {
    commission: '0.3% of the loan', // [TO CONFIRM: publish?]
    commissionPublish: true as boolean | null,
    payoutDays: 45,
    appUrl: 'https://lenty-mortgage.github.io/lenty-partners/' as string | null, // Lenty Partners App (registration + login)
  },
  languages: {
    live: ['EN'],
    next: ['Arabic', 'Russian'] as string[],
  },
  analytics: {
    // The only tag in the code. GA4 (G-7B7J28M27F), Google Ads (AW-17884519518), Meta Pixel and Clarity
    // are configured inside this container and fire only after consent. null = no tag inserted.
    gtmId: 'GTM-TQGMKG53' as string | null,
    // Google Search Console, URL-prefix property: the content of <meta name="google-site-verification">. Not needed with a DNS (Domain) property.
    gscVerification: null as string | null,
    bingVerification: null as string | null, // Bing Webmaster Tools <meta name="msvalidate.01">; not needed when importing from Search Console
  },
  calc: {
    ratesDate: null as string | null, // null = no "as of" date shown; set e.g. '13 October 2026' after the advisors re-check rates
    rateIllustrative: 4.25,
    vat: 0.05,
    stressRate: 7.5,
    dbr: 0.5,
    cardLimitPct: 0.05, // banks count ≈5% of the card limit as a payment [TO CONFIRM]
    maxTerm: 25,
    minTerm: 5,
    maxAge: { salaried: 65, selfEmployed: 70, national: 70 },
    ltv: {
      expat: { first: 0.8, firstAbove5M: 0.7, second: 0.6 },
      national: { first: 0.85, firstAbove5M: 0.75, second: 0.65 },
      nonResident: 0.5,
      offPlanCap: 0.5,
      priceThreshold: 5_000_000,
    },
    fees: {
      dldPct: 0.04,
      dldFixed: 580,
      trusteeAbove500k: 4000,
      trusteeBelow500k: 2000,
      trusteeThreshold: 500_000,
      mortgageRegPct: 0.0025,
      mortgageRegFixed: 290,
      valuation: 3000,
      bankFeeResident: 0.005,
      bankFeeNonResident: 0.01,
      agentPct: 0.02,
    },
  },
};

export type SiteConfig = typeof site;

/** Placeholder for a value Lenty still has to confirm. */
export function tbc(label = 'to confirm'): string {
  return label;
}

/** Returns the value or a placeholder label; use `isTbc` to pick the rendering. */
export function dataOr<T>(value: T | null | undefined, label: string): { value: T | null; tbc: string | null } {
  return value === null || value === undefined ? { value: null, tbc: label } : { value, tbc: null };
}

export const showGoogleReviews = () => (site.google.reviews ?? 0) >= 10 && site.google.rating !== null;

export const languagesLabel = () => site.languages.live.join(', ');

/** Shared "calc params" passed to the client-side calculator. */
export const calcParams = () => ({
  rate: site.calc.rateIllustrative,
  vat: site.calc.vat,
  stressRate: site.calc.stressRate,
  dbr: site.calc.dbr,
  cardLimitPct: site.calc.cardLimitPct,
  maxTerm: site.calc.maxTerm,
  minTerm: site.calc.minTerm,
  maxAge: site.calc.maxAge,
  ltv: site.calc.ltv,
  fees: site.calc.fees,
  nonResidentFee: site.fees.nonResident,
});
