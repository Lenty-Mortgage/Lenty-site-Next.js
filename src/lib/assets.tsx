/**
 * Browser scripts produced by scripts/build-client.mjs. These are the only JavaScript the pages load:
 * no React runtime is shipped (see scripts/postbuild.mjs).
 */
import manifest from '../generated/client-manifest.json';
import { url } from './url';

type ScriptName = keyof typeof manifest.scripts;
type InlineName = keyof typeof manifest.inline;

/** <script type="module" src> for a bundled script (site / calculator / check-form). */
export function ModuleScript({ name }: { name: ScriptName }) {
  return <script type="module" src={url(manifest.scripts[name])} />;
}

/** Small page script, inlined like Astro inlines short <script> blocks. */
export function InlineModule({ name }: { name: InlineName }) {
  return <script type="module" dangerouslySetInnerHTML={{ __html: manifest.inline[name] }} />;
}

export const fonts = manifest.fonts;
