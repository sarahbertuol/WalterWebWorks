import type { NextConfig } from "next";

/**
 * LORENA_HOST — optional subdomain for the baby-shower invitation
 * (e.g. "lorena.seudominio.com.br"). When set, the root of that host serves
 * /lorena, so the link guests receive is just the subdomain.
 */
const lorenaHost = process.env.LORENA_HOST;

const nextConfig: NextConfig = {
  async rewrites() {
    if (!lorenaHost) return [];
    return {
      // beforeFiles: "/" is also the WWW home page, so the host rule must win first
      beforeFiles: [{ source: "/", has: [{ type: "host", value: lorenaHost }], destination: "/lorena" }],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
