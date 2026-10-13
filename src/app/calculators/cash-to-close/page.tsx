import CalcPage, { calcMetadata } from '../../../components/CalcPage';

const props = {
  tab: 'cash-to-close', path: '/calculators/cash-to-close/', pageName: 'Cash to close calculator',
  title: 'Cash-to-close calculator for a Dubai mortgage | Lenty',
  description: "Banks finance part of the price. They don't finance the DLD fee, the agent, the trustee or the valuation. Calculate the cash you need for a Dubai mortgage.",
  h1: 'How much cash do you need on day one?',
  lead: "Banks finance part of the price. They don't finance the DLD fee, the agent, the trustee or the valuation. This is the number most buyers hear too late.",
} as const;

export const metadata = calcMetadata(props);
export default function Page() { return <CalcPage {...props} />; }
