import type { Metadata } from "next";
import { Analytics } from "@/components/Analytics";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://delsnab.ru",
  ),
  other: {
    "yandex-verification":
      "e25c1286ab672529,0af563b0fb916f0c,0510ca571ac80afd,fb6dfc93d54c1b3d",
    "google-site-verification":
      "tdWzIarFYUX-1GNJZDD84QT8AsRgB8dz_HJzWYTkXNM,JE_R33MxHebo49y6ovUFUJp0KfsWG7LpwPmjnoqqeaM",
    "geo.region": "RU",
    "geo.placename": "Москва",
    "geo.position": "55.857161;37.698603",
    ICBM: "55.857161, 37.698603",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru-RU">
      <body>
        <header className="site-header">
          <a href="/">ДЕЛСНАБ</a>
        </header>
        {children}
        <footer className="site-footer">
          <p>© ДЕЛСНАБ — завод металлоконструкций</p>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
