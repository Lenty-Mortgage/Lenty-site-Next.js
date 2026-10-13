import LegalPage, { legalMetadata } from '../../components/LegalPage';
import Tbc from '../../components/Tbc';
import { site } from '../../config/site';

export const metadata = legalMetadata('Privacy Policy | Lenty', 'What Lenty collects, why, for how long, who sees it, and your rights under the UAE PDPL.', '/privacy/');

export default function Page() {
  return (
    <LegalPage path="/privacy/" h1="Privacy Policy">
      <p className="muted">Under the UAE Personal Data Protection Law (Federal Decree-Law 45/2021). <Tbc label="to be reviewed by a lawyer" /></p>
      <h2>What we collect</h2><p>The details you type into our forms (name, phone, email, your answers about your situation) and anonymous analytics about how the site is used.</p>
      <h2>Why</h2><p>To contact you about your mortgage enquiry, to match you with suitable banks, and to improve the site.</p>
      <h2>How long</h2><p>For as long as your enquiry or mortgage is active, and afterwards as required by UAE law. <Tbc label="retention period" /></p>
      <h2>Who sees it</h2><p>Lenty advisors; Salesforce as our data processor; a bank only when you instruct us to submit your file.</p>
      <h2>Your rights</h2><p>You can ask what we hold about you, ask us to correct or delete it, and withdraw consent at any time.</p>
      <h2>Contact</h2><p>{site.company.email ?? <Tbc label="email" />} · {site.company.legalName}, {site.company.address ?? <Tbc label="address" />}.</p>
    </LegalPage>
  );
}
