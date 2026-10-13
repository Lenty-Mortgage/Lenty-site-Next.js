import LegalPage, { legalMetadata } from '../../components/LegalPage';
import Tbc from '../../components/Tbc';
import { site } from '../../config/site';

export const metadata = legalMetadata('Terms of Service | Lenty', 'Lenty provides mortgage advisory only. Approval, rates and terms are decided by the lending bank.', '/terms/');

export default function Page() {
  return (
    <LegalPage path="/terms/" h1="Terms of Service">
      <p className="muted"><Tbc label="to be reviewed by a lawyer" /></p>
      <h2>Advisory only</h2><p>{site.company.legalName} ({site.company.license}) provides mortgage advisory services. We are not a bank and do not lend money.</p>
      <h2>No guarantee of approval</h2><p>Approval, rates and terms are decided by the lending bank. We tell you honestly what we think is possible, but the bank&apos;s decision is final.</p>
      <h2>Fees</h2><p>Our service is free for UAE residents and nationals. Any non-resident fee is agreed in writing before we start.</p>
      <h2>Estimates</h2><p>Figures on this site, including the calculators, are estimates based on typical Dubai fees and illustrative rates.</p>
    </LegalPage>
  );
}
