import { Fragment } from 'react';
import { url } from '../lib/url';
import { advisors, type Advisor } from '../content/advisors';
import { situations } from '../content/situations';
import Tbc from './Tbc';
import WhatsAppLink from './WhatsAppLink';

interface Props { page: string; slug: string; all?: boolean; list?: Advisor[]; heading?: boolean; showSituations?: boolean }

export default function Advisors({ page, slug, all = false, list, heading = true, showSituations = false }: Props) {
  // under the section h2 the card titles are h3; on /advisors/ (no section heading) they follow the h1
  const H = heading ? 'h3' : 'h2';
  const items = list ?? (all ? advisors : advisors.slice(0, 4));
  /* Test 1 only: repeat the home-page advisors as placeholders (.t1-dup, hidden in Original/Test) so the carousel fills the screen */
  const cards = [...items.map((a) => ({ a, dup: false })), ...(all ? [] : Array.from({ length: 3 }, () => items.map((a) => ({ a, dup: true }))).flat())];
  return (
    <section className="block" id="advisors" aria-labelledby="adv-h2">
      <div className="wrap">
        {heading && (
          <div className="sec-head">
            <p className="eyebrow">Your advisors</p>
            <h2 id="adv-h2">Real people, with names and languages</h2>
            <p className="lead">You speak with the same advisor from the first message to the keys.</p>
          </div>
        )}
        <div className={all ? 'adv-grid' : 'adv-grid carousel'} data-carousel={!all ? '' : undefined}>
          {cards.map(({ a, dup }, i) => (
            <article key={i} className={dup ? 'adv t1-dup' : 'adv'} id={dup ? undefined : a.slug}>
              <div className="avatar" aria-hidden="true">{a.initial}</div>
              <H>{a.name ?? <Tbc label={a.tbcLabel ?? 'Advisor'} />}</H>
              <p className="small muted">{a.role}</p>
              <div className="langs" aria-label="Languages">{a.languages.map((l) => <span key={l}>{l}</span>)}{a.languagesTbc && <span className="tbc">+ languages</span>}</div>
              <p className="small">{a.specialisation ?? <Tbc label="specialisation to confirm" />}</p>
              {showSituations && a.bio && <p className="small muted">{a.bio}</p>}
              {showSituations && (
                <p className="small muted">Situations: {a.situations.map((s, j) => <Fragment key={s}><a href={url(`/situations/${s}/`)}>{situations.find((x) => x.slug === s)?.nav}</a>{j < a.situations.length - 1 ? ', ' : ''}</Fragment>)}</p>
              )}
              <div className="acts">
                <WhatsAppLink page={page} slug={slug} className="btn btn-ghost btn-sm" />
              </div>
            </article>
          ))}
        </div>
        {!all && <div className="car-dots" aria-hidden="true"></div>}
        {!all && <p className="sec-foot"><a className="arrow" href={url('/advisors/')}>All advisors →</a></p>}
      </div>
    </section>
  );
}
