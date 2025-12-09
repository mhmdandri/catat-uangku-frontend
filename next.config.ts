import type { NextConfig } from "next";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
let backendPattern:
  | {
      protocol: string;
      hostname: string;
      port?: string;
      pathname?: string;
    }
  | undefined;

if (apiUrl) {
  try {
    const url = new URL(apiUrl);
    backendPattern = {
      protocol: url.protocol.replace(":", ""),
      hostname: url.hostname,
    };
    if (url.port) backendPattern.port = url.port;
  } catch {
    // ignore parse errors
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      ...(backendPattern ? [backendPattern] : []),
    ],
  },
};

export default nextConfig;
