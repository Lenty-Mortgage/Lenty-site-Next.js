import type { NextConfig } from 'next';
import { normaliseBase } from './src/lib/env';

const basePath = normaliseBase(process.env.PUBLIC_BASE ?? '/');

const nextConfig: NextConfig = {
  output: 'export',          // static HTML in out/, no server
  trailingSlash: true,       // /about/ → out/about/index.html, same URLs as the Astro build
  basePath: basePath || undefined,
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
