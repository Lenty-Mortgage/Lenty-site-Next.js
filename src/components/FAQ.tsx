import { url } from '../lib/url';
import { rich } from '../lib/rich';
import type { FaqGroup } from '../content/faq';
import Html from './Html';

interface Props { groups: FaqGroup[]; title?: string; eyebrow?: string; link?: boolean; id?: string; cols?: boolean; groupTag?: 'h2' | 'h3'; block?: boolean }

export default function FAQ({ groups, title = 'What clients ask before the first call', eyebrow = 'Questions', link = true, id = 'faq', cols = true, groupTag = 'h3', block = true }: Props) {
  const GT = groupTag;
  return (
    <section className={block ? 'block' : ''} id={id} aria-labelledby={`${id}-h2`}>
      <div className={block ? 'wrap' : ''}>
        {title && (
          <div className="sec-head">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h2 id={`${id}-h2`}>{title}</h2>
          </div>
        )}
        <div className={cols ? 'faq-cols' : 'stack-lg'}>
          {groups.map((g) => (
            <div key={g.id} className="faq-group" id={`faq-${g.id}`}>
              <GT>{g.title}</GT>
              {g.items.map((it) => (
                <details key={it.q} className="qa">
                  <summary>{it.q}</summary>
                  <Html as="p" className="ans" html={rich(it.a)} />
                </details>
              ))}
            </div>
          ))}
        </div>
        {link && <p className="sec-foot"><a className="arrow" href={url('/faq/')}>All questions →</a></p>}
      </div>
    </section>
  );
}
