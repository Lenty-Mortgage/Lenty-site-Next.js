import Base from '../components/Base';
import HeroC from '../components/HeroC';
import FactsStrip from '../components/FactsStrip';
import SituationCards from '../components/SituationCards';
import CompareTable from '../components/CompareTable';
import Steps from '../components/Steps';
import Advisors from '../components/Advisors';
import Cases from '../components/Cases';
import FAQ from '../components/FAQ';
import Fees from '../components/Fees';
import FinalCTA from '../components/FinalCTA';
import AgentsLine from '../components/AgentsLine';
import { homeFaq } from '../content/faq';
import { site, showGoogleReviews } from '../config/site';
import { faqPageLd } from '../lib/rich';
import { websiteLd } from '../lib/entity';
import { pageMetadata } from '../lib/seo';

export const metadata = pageMetadata({
  title: 'Mortgage broker in Dubai for complex cases | Lenty',
  description: 'Non-resident, business owner or declined? A named Lenty advisor finds the UAE bank that fits and shows the cash you need upfront. Check your chances in 2 min.',
  path: '/',
});

export default function Home() {
  const page = 'Home', slug = 'home';
  const faqLd = faqPageLd(homeFaq.flatMap((g) => g.items));
  return (
    <Base path="/" pageName={page} onHero jsonLd={[websiteLd(), faqLd]}>
      <HeroC page={page} slug={slug} />
      <FactsStrip />
      <SituationCards page={page} slug={slug} />
      <CompareTable />
      <Steps />
      <Advisors page={page} slug={slug} />
      <Cases />
      {showGoogleReviews() && (
        <section className="block" id="reviews"><div className="wrap"><div className="sec-head"><h2>What clients say</h2></div><p><a className="arrow" href={site.google.url!} target="_blank" rel="noopener">All reviews on Google →</a></p></div></section>
      )}
      <FAQ groups={homeFaq} />
      <Fees />
      <FinalCTA page={page} slug={slug} />
      <AgentsLine />
    </Base>
  );
}
