import CalcPage, { calcMetadata } from '../../../components/CalcPage';

const props = {
  tab: 'monthly-payment', path: '/calculators/monthly-payment/', pageName: 'Monthly payment calculator',
  title: 'Mortgage monthly payment calculator, Dubai | Lenty',
  description: 'What will a Dubai mortgage cost each month? Loan, LTV, total interest over the term and the payment the bank tests at its stress rate.',
  h1: 'What will the mortgage cost each month?',
} as const;

export const metadata = calcMetadata(props);
export default function Page() { return <CalcPage {...props} />; }
