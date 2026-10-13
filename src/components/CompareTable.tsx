import { site } from '../config/site';
import Tbc from './Tbc';

export default function CompareTable() {
  return (
    <section className="block" id="bank" aria-labelledby="cmp-h2">
      <div className="wrap">
        <div className="sec-head">
          <p className="eyebrow">Broker or your bank?</p>
          <h2 id="cmp-h2">Your bank can only offer its own mortgage</h2>
        </div>
        <div className="cmp-wrap">
          <table className="cmp">
            <thead><tr><th scope="col"><span className="sr-only">Criterion</span></th><th scope="col">Going to your bank directly</th><th scope="col">With a Lenty advisor</th></tr></thead>
            <tbody>
              <tr><td className="crit">Choice of lenders</td><td data-label="Your bank">One bank, one policy</td><td data-label="With Lenty">{site.banks.count ? `${site.banks.count}+` : <Tbc label="N" />} banks, each with its own niche</td></tr>
              <tr><td className="crit">Non-standard income</td><td data-label="Your bank">Fits their checklist or it doesn&apos;t</td><td data-label="With Lenty">We pick the bank whose rules fit your income</td></tr>
              <tr><td className="crit">After a decline</td><td data-label="Your bank">Usually the end of the road</td><td data-label="With Lenty">We find the reason, and the bank that accepts it</td></tr>
              <tr><td className="crit">Who you talk to</td><td data-label="Your bank">A relationship manager with 100+ clients</td><td data-label="With Lenty">One named advisor from first call to keys</td></tr>
              <tr><td className="crit">Cost to you</td><td data-label="Your bank">Bank fees</td><td data-label="With Lenty">Bank fees. Our service is free for UAE residents.</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
