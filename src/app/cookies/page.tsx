import LegalPage, { legalMetadata } from '../../components/LegalPage';

export const metadata = legalMetadata('Cookies | Lenty', 'Lenty uses essential cookies and, only with your consent, analytics (GA4, Microsoft Clarity) and advertising cookies (Google Ads, Meta). You choose in the consent bar.', '/cookies/');

export default function Page() {
  return (
    <LegalPage path="/cookies/" h1="Cookies">
      <h2>Essential</h2><p>Needed for the site to work: remembering your cookie choice, keeping your form progress on this device.</p>
      <h2>Analytics</h2><p>Google Analytics 4 and Microsoft Clarity, to understand which pages help and which don&apos;t. These run only if you choose &quot;Accept all&quot; in the consent bar.</p>
      <h2>Advertising</h2><p>Google Ads and the Meta Pixel (Facebook, Instagram), to measure which ads bring enquiries and to show our ads to people who visited the site. These run only if you choose &quot;Accept all&quot;.</p>
      <h2>Your choice</h2><p>Use &quot;Essential only&quot; in the consent bar to switch analytics and advertising off. You can change your choice at any time with &quot;Cookie settings&quot; at the bottom of every page.</p>
    </LegalPage>
  );
}
