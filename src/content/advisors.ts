export type Advisor = {
  slug: string;
  name: string | null; // null → placeholder
  initial: string;
  role: string;
  languages: string[];
  languagesTbc?: boolean;
  specialisation: string | null;
  situations: string[]; // situation slugs
  whatsappDigits: string | null; // null → use company number
  bio?: string | null;
  tbcLabel?: string;
  hidden?: boolean; // kept for later, not shown anywhere (site or schema)
};

const allAdvisors: Advisor[] = [
  {
    slug: 'nazar',
    name: 'Nazar Verbytskyy',
    initial: 'N',
    role: 'Founder & CEO',
    languages: ['EN', 'UK', 'RU', 'PL'],
    languagesTbc: false,
    specialisation: 'Complex cases, non-residents, business owners.',
    situations: ['non-resident', 'business-owner', 'declined', 'off-plan-handover', 'non-standard-income', 'portfolio'], // + Razie's situations while she is hidden
    whatsappDigits: null,
    bio: 'Nazar Verbytskyy is the founder and CEO of Lenty, a licensed mortgage consultancy in Dubai (DED Trade License 1565247). He set up Lenty for the files a bank\'s checklist doesn\'t fit: non-residents, business owners and applicants who have already been declined. He advises in English, Ukrainian, Russian and Polish.',
  },
  {
    slug: 'razie',
    name: 'Razie',
    initial: 'R',
    role: 'Mortgage Advisor',
    languages: ['EN'],
    languagesTbc: true,
    specialisation: null,
    situations: ['non-standard-income', 'portfolio'],
    whatsappDigits: null,
    tbcLabel: 'name spelling, photo, languages · to confirm',
    hidden: true, // until name spelling, photo and languages are confirmed
  },
];

export const advisors: Advisor[] = allAdvisors.filter((a) => !a.hidden);

export const advisorFor = (situationSlug: string): Advisor =>
  advisors.find((a) => a.situations.includes(situationSlug)) ?? advisors[0];

const LANG_NAMES: Record<string, string> = { EN: 'English', AR: 'Arabic', FR: 'French', UK: 'Ukrainian', RU: 'Russian', PL: 'Polish', HI: 'Hindi', IT: 'Italian' };
export const langName = (code: string) => LANG_NAMES[code] ?? code;

/** Languages the advisors confirm they speak — the language of the conversation, not of the website. */
export const advisorLanguages = (): string[] => [...new Set(advisors.filter((a) => !a.languagesTbc).flatMap((a) => a.languages))];
