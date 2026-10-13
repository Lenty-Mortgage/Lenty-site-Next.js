/** Placeholder chip for a fact Lenty still has to confirm (prototype .tbc). */
export default function Tbc({ label = 'to confirm' }: { label?: string }) {
  return <span className="tbc">{label}</span>;
}
