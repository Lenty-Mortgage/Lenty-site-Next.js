import CalcPage, { calcMetadata } from '../../../components/CalcPage';

const props = {
  tab: 'affordability', path: '/calculators/affordability/', pageName: 'How much can I borrow calculator',
  title: 'How much can I borrow for a mortgage in the UAE? | Lenty',
  description: 'How much can you borrow in the UAE? Maximum loan from your income at the 50% debt-burden limit and the bank\'s stress rate, with the term capped by your age.',
  h1: 'How much can I borrow?',
} as const;

export const metadata = calcMetadata(props);
export default function Page() { return <CalcPage {...props} />; }
