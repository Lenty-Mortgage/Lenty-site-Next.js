/** Renders a trusted HTML string (content markers already converted by lib/rich) — the equivalent of Astro's set:html. */
import { createElement, type HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLElement> & { as?: string; html: string };

export default function Html({ as = 'span', html, ...rest }: Props) {
  return createElement(as, { ...rest, dangerouslySetInnerHTML: { __html: html } });
}
