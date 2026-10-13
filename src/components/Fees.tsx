import { site } from '../config/site';
import Tbc from './Tbc';

export default function Fees() {
  return (
    <section className="block" id="fees" aria-labelledby="fees-h2">
      <div className="wrap">
        <div className="sec-head">
          <p className="eyebrow">Fees</p>
          <h2 id="fees-h2">What our service costs</h2>
        </div>
        <div className="fees">
          <div className="fee"><span className="eyebrow">UAE residents and nationals</span><span className="price">{site.fees.resident}</span><p className="muted">Banks pay us after your mortgage completes. Your rate is the bank&apos;s rate. You only pay the standard bank and government fees shown in the calculator.</p></div>
          <div className="fee"><span className="eyebrow">Non-residents</span><span className="price">{site.fees.nonResident ?? <Tbc label="fee" />}</span><p className="muted">Non-resident files take more work across banks and borders. The fee is agreed in writing before we start, so there are no surprises.</p></div>
        </div>
      </div>
    </section>
  );
}
