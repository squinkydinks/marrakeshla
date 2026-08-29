/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Still ignored: ESLint is not a dependency of this project and there is no
    // flat/legacy config file. With this set to false, `next build` tries to
    // bootstrap ESLint and fails in a non-interactive environment (Vercel).
    // To turn this off, first add `eslint` + `eslint-config-next` and a config.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Type errors now fail the build. `npx tsc --noEmit` is clean, so anything
    // that trips this is a genuine regression rather than pre-existing debt.
    ignoreBuildErrors: false,
  },
  images: {
    // Every remote image on the site is served from the Vercel blob bucket the
    // v0 export wrote into the markup.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
        pathname: "/**",
      },
    ],
  },
}

export default nextConfig
