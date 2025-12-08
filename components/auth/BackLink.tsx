import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const BackLink: React.FC = () => (
  <Link
    href="/"
    className="mb-8 flex items-center gap-2 text-gray-600 dark:text-zinc-400 transition hover:text-emerald-600 hover:no-underline"
  >
    <ArrowLeft className="w-5" />
    Kembali ke Beranda
  </Link>
);

export default BackLink;
