export function resolveAvatarUrl(avatar?: string | null): string | null {
  if (!avatar) return null;

  if (avatar.startsWith("http://") || avatar.startsWith("https://")) {
    return avatar;
  }

  const apiBase =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

  try {
    const { origin } = new URL(apiBase);
    const path = avatar.startsWith("/") ? avatar : `/${avatar}`;

    return `${origin}${path}`;
  } catch {
    return avatar;
  }
}
