import { site } from '../config/site';
import { advisorLanguages, langName } from '../content/advisors';

export default function FactsStrip() {
  const langs = advisorLanguages().map(langName);
  const b = site.banks;
  return (
    <section className="facts-strip" aria-label="Key facts">
      <div className="wrap">
        <p className="f">Licensed in Dubai · {site.company.license}</p>
        <p className="f">Free for UAE residents</p>
        {b.count ? <p className="f">{b.phrase === 'access to' ? 'Access to' : 'We work with'} {b.count}+ banks</p> : <p className="f">One named advisor, first message to keys</p>}
        {site.sla.preApprovalResident ? <p className="f">Pre-approval in {site.sla.preApprovalResident}</p> : null}
        <p className="f">Advice in {langs.length > 1 ? `${langs.slice(0, -1).join(', ')} and ${langs[langs.length - 1]}` : langs[0]}</p>
      </div>
      {b.logos.length > 0 && (
        <div className="wrap logos" aria-label="Banks we place cases with">
          <span>Banks we place cases with:</span>
          {b.logos.map((l) => <img key={l.src} src={l.src} alt={l.name} height={28} loading="lazy" />)}
        </div>
      )}
    </section>
  );
}
