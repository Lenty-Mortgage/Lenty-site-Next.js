import LegalPage, { legalMetadata } from '../../components/LegalPage';
import { site } from '../../config/site';

export const metadata = legalMetadata('Disclaimer | Lenty', 'Lenty is a licensed mortgage advisory, not a bank. Calculator figures are estimates.', '/disclaimer/');

export default function Page() {
  return (
    <LegalPage path="/disclaimer/" h1="Disclaimer">
      <p>Lenty is a licensed mortgage advisory, not a bank. Calculator figures are estimates based on typical Dubai fees and illustrative rates{site.calc.ratesDate && ` as of ${site.calc.ratesDate}`}. Your bank&apos;s valuation, rate and approval decide the final numbers.</p>
    </LegalPage>
  );
}
