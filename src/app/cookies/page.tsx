import LegalPage, { legalMetadata } from '../../components/LegalPage';

export const metadata = legalMetadata('Cookies | Lenty', 'Lenty uses essential cookies and anonymous analytics (GA4, Microsoft Clarity). You choose in the consent bar.', '/cookies/');

export default function Page() {
  return (
    <LegalPage path="/cookies/" h1="Cookies">
      <h2>Essential</h2><p>Needed for the site to work: remembering your cookie choice, keeping your form progress on this device.</p>
      <h2>Analytics</h2><p>Google Analytics 4 and Microsoft Clarity, anonymised, to understand which pages help and which don&apos;t. These run only if you choose &quot;Accept&quot; in the consent bar.</p>
      <h2>Your choice</h2><p>Use &quot;Essential only&quot; in the consent bar to switch analytics off. Clearing your browser storage shows the bar again.</p>
    </LegalPage>
  );
}
