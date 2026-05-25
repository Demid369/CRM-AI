import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Критично: WordPress использует trailing slash
  trailingSlash: true,

  images: {
    // Медиа остаются на legacy-пути до полной миграции uploads
    remotePatterns: [
      {
        protocol: "https",
        hostname: "delsnab.ru",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },

  async redirects() {
    return [
      // WooCommerce utility pages → контакты (настройте под себя)
      { source: "/cart/", destination: "/contacts/", permanent: true },
      { source: "/checkout/", destination: "/contacts/", permanent: true },
      { source: "/my-account/", destination: "/contacts/", permanent: true },
      { source: "/shop/", destination: "/metallokonstrukcii/", permanent: true },
    ];
  },
};

export default nextConfig;
