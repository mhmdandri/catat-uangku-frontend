const DEFAULT_SITE_URL = "http://localhost:3000";

export function getSiteUrl() {
  const envUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : DEFAULT_SITE_URL);

  if (!envUrl) {
    return DEFAULT_SITE_URL;
  }

  return envUrl.endsWith("/") ? envUrl.slice(0, -1) : envUrl;
}

export const siteConfig = {
  name: "catatUangku",
  title: "catatUangku - Aplikasi pencatat keuangan pribadi",
  tagline: "Kelola Keuangan Lebih Mudah dan Terorganisir",
  description:
    "Catat pemasukan dan pengeluaran, pantau anggaran, dan capai tujuan finansial dengan catatUangku.",
  locale: "id_ID",
  keywords: [
    "catat keuangan",
    "pencatat keuangan",
    "keuangan pribadi",
    "budgeting",
    "aplikasi keuangan",
  ],
  ogImage: "/opengraph-image",
  twitterImage: "/twitter-image",
  url: getSiteUrl(),
};
