import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  /** Use this app’s directory as tracing root when a parent folder has another lockfile. */
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/_next/static/media/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      /** GSC 404 on /$ — regex-anchor typo or RSC `$` marker misparsed as URL */
      {
        source: "/\\$",
        destination: "/",
        permanent: true,
      },
      {
        source: "/%24",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
