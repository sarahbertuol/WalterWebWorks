import type { NextConfig } from "next";

/**
 * Hosts whose root serves the baby-shower invitation instead of the WWW home.
 * convitelorena.vercel.app is the temporary address; LORENA_HOST adds a
 * definitive one later (e.g. "lorena.seudominio.com.br").
 */
const lorenaHosts = ["convitelorena.vercel.app", process.env.LORENA_HOST].filter((h): h is string => Boolean(h));

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      // beforeFiles: "/" is also the WWW home page, so the host rule must win first
      beforeFiles: lorenaHosts.map((host) => ({ source: "/", has: [{ type: "host" as const, value: host }], destination: "/lorena" })),
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
