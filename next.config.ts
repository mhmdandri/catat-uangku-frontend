import type { NextConfig } from "next";
import type { RemotePattern } from "next/dist/shared/lib/image-config";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const remotePatterns: RemotePattern[] = [
  {
    protocol: "https",
    hostname: "images.unsplash.com",
  },
];

if (apiUrl) {
  try {
    const url = new URL(apiUrl);
    const protocol =
      url.protocol === "http:" ? "http" : url.protocol === "https:" ? "https" : undefined;
    if (protocol) {
      const backendPattern: RemotePattern = {
        protocol,
        hostname: url.hostname,
      };
      if (url.port) backendPattern.port = url.port;
      remotePatterns.push(backendPattern);
    }
  } catch {
    // ignore parse errors
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
  },
};

export default nextConfig;
