import { Fragment } from 'react';
import { url } from '../lib/url';
import { advisors, type Advisor } from '../content/advisors';
import { situations } from '../content/situations';
import Tbc from './Tbc';
import WhatsAppLink from './WhatsAppLink';

interface Props { page: string; slug: string; all?: boolean; list?: Advisor[]; heading?: boolean; showSituations?: boolean }

export default function Advisors({ page, slug, all = false, list, heading = true, showSituations = false }: Props) {
  const items = list ?? (all ? advisors : advisors.slice(0, 4));
  return (
    <section className="block" id="advisors" aria-labelledby="adv-h2">
      <div className="wrap">
        {!heading && <h2 id="adv-h2" className="sr-only">Advisors</h2>}
        {heading && (
          <div className="sec-head">
            <p className="eyebrow">Your advisors</p>
            <h2 id="adv-h2">Real people, with names and languages</h2>
            <p className="lead">You speak with the same advisor from the first message to the keys.</p>
          </div>
        )}
        <div className="adv-grid">
          {items.map((a) => (
            <article key={a.slug} className="adv" id={a.slug}>
              <div className="avatar" aria-hidden="true">{a.initial}</div>
              <h3>{a.name ?? <Tbc label={a.tbcLabel ?? 'Advisor'} />}</h3>
              <p className="small muted">{a.role}</p>
              <div className="langs" aria-label="Languages">{a.languages.map((l) => <span key={l}>{l}</span>)}{a.languagesTbc && <span className="tbc">+ languages</span>}</div>
              <p className="small">{a.specialisation ?? <Tbc label="specialisation to confirm" />}</p>
              {showSituations && a.bio && <p className="small muted">{a.bio}</p>}
              {showSituations && (
                <p className="small muted">Situations: {a.situations.map((s, j) => <Fragment key={s}><a href={url(`/situations/${s}/`)}>{situations.find((x) => x.slug === s)?.nav}</a>{j < a.situations.length - 1 ? ', ' : ''}</Fragment>)}</p>
              )}
              <div className="acts">
                <WhatsAppLink cta="advisor_card" page={page} slug={slug} className="btn btn-ghost btn-sm" />
              </div>
            </article>
          ))}
        </div>
        {!all && <p className="sec-foot"><a className="arrow" href={url('/advisors/')}>All advisors →</a></p>}
      </div>
    </section>
  );
}
