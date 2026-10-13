
export default function Chat() {
  return (
    <div className="chat" aria-label="Example WhatsApp conversation">
      <div className="bubble them">Hi Sara, this is your Lenty advisor. I&apos;ve read your request: non-resident, AED 2.4M apartment in Dubai Hills, salary in EUR.<span className="t">09:14</span></div>
      <div className="bubble them">Two of our banks accept EUR income for non-residents. Can we do a 15-minute call today? I&apos;m free 13:00 or 17:00 Dubai time.<span className="t">09:14</span></div>
      <div className="bubble me">17:00 works, thanks!<span className="t">09:31</span></div>
      <div className="bubble them">Booked. I&apos;ll send you the cash-to-close estimate before the call.<span className="t">09:32</span></div>
      <p className="small muted">Illustrative conversation.</p>
    </div>
  );
}
