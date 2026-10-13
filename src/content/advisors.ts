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
};

export const advisors: Advisor[] = [
  {
    slug: 'nazar',
    name: 'Nazar',
    initial: 'N',
    role: 'Founder & Senior Mortgage Advisor',
    languages: ['EN', 'AR', 'FR', 'UK', 'RU', 'PL'],
    languagesTbc: false,
    specialisation: 'Complex cases, non-residents, business owners.',
    situations: ['non-resident', 'business-owner', 'declined', 'off-plan-handover'],
    whatsappDigits: null,
    bio: null, // [TO CONFIRM: 3 sentences]
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
  },
];

export const advisorFor = (situationSlug: string): Advisor =>
  advisors.find((a) => a.situations.includes(situationSlug)) ?? advisors[0];

const LANG_NAMES: Record<string, string> = { EN: 'English', AR: 'Arabic', FR: 'French', UK: 'Ukrainian', RU: 'Russian', PL: 'Polish', HI: 'Hindi', IT: 'Italian' };
export const langName = (code: string) => LANG_NAMES[code] ?? code;

/** Languages the advisors confirm they speak — the language of the conversation, not of the website. */
export const advisorLanguages = (): string[] => [...new Set(advisors.filter((a) => !a.languagesTbc).flatMap((a) => a.languages))];
