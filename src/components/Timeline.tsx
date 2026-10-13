import { site } from '../config/site';
import Tbc from './Tbc';

export default function Timeline() {
  const sla = site.sla.firstReplyMinutes;
  return (
    <ol className="timeline">
      <li><span className="t">Within {sla ?? <Tbc label="X" />} min</span><span><b>Your advisor writes on WhatsApp</b> and introduces themselves by name.</span></li>
      <li><span className="t">Same day</span><span><b>15-minute call</b> at a time that suits your time zone.</span></li>
      <li><span className="t">After the call</span><span><b>Written summary</b>: suitable banks, cash needed, document list.</span></li>
      <li><span className="t">Every step</span><span><b>Status updates</b> without you having to chase.</span></li>
    </ol>
  );
}
