import Base from '../../components/Base';
import Timeline from '../../components/Timeline';
import Tbc from '../../components/Tbc';
import { site } from '../../config/site';
import { url } from '../../lib/url';
import { advisors } from '../../content/advisors';
import { InlineModule } from '../../lib/assets';
import { pageMetadata } from '../../lib/seo';

export const metadata = pageMetadata({ title: 'Received. Your advisor takes it from here | Lenty', description: 'Your request has reached a named Lenty advisor. Here is what happens next.', path: '/thanks/', noindex: true });

export default function Page() {
  const a = advisors[0];
  const sla = site.sla.firstReplyMinutes;
  return (
    <Base path="/thanks/" pageName="Thanks">
      <div className="wrap quiz">
        <section className="qstep">
          <p className="eyebrow">Received</p>
          <h1>That&apos;s it for now<span id="thanksName"></span>. Your advisor takes it from here.</h1>
          <article className="adv" style={{ margin: '24px 0' }}>
            <div className="avatar" aria-hidden="true">{a.initial}</div>
            <h2>{a.name}</h2>
            <p className="small muted">{a.role}</p>
            <p className="small">will write to you on <span id="thanksChannel">WhatsApp</span> within {sla ?? <Tbc label="X" />} min (working hours {site.company.hours ?? <Tbc label="hours" />})</p>
          </article>
          <Timeline />
          <p className="small muted" style={{ marginTop: 24 }}>Nothing to prepare for the call. If you want a head start:</p>
          <div className="hero-ctas" style={{ marginTop: 12 }}>
            <a className="btn btn-ghost" href={url('/calculators/cash-to-close/')}>Calculate my cash</a>
          </div>
        </section>
      </div>
      <InlineModule name="thanks" />
    </Base>
  );
}
