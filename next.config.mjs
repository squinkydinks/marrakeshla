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
    // Serve images as-is. The photos in public/images/redesign are already
    // resized and compressed, and Vercel's optimizer returns 402 once the
    // plan's monthly transformation quota is spent, which blanks every image.
    unoptimized: true,
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
  async redirects() {
    return [
      // The old /reserve page took catering enquiries, never table bookings.
      // Table reservations go to OpenTable; event enquiries live on /catering.
      { source: "/reserve", destination: "/catering", permanent: true },
      // /contact was folded into the catering inquiry form.
      { source: "/contact", destination: "/catering#inquire", permanent: true },
    ]
  },
}

export default nextConfig
