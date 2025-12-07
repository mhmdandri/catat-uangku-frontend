"use client";

import { Moon, Sun, Wallet } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

const sections = ["home", "features", "preview", "benefit", "download"];

const NavBar = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          root: null,
          rootMargin: "-40% 0px -40% 0px",
          threshold: 0,
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 border-b
        ${
          isScrolled
            ? "bg-white/70 dark:bg-zinc-950/70 backdrop-blur-md border-zinc-200 dark:border-zinc-800 shadow-sm"
            : "bg-transparent border-transparent"
        }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="#home" className="flex items-center gap-3">
          <div className="rounded-xl bg-emerald-600 p-2.5 shadow-sm">
            <Wallet className="h-7 w-7 text-white" />
          </div>
          <span className="text-2xl font-semibold text-emerald-700 dark:text-emerald-400">
            catatUangku
          </span>
        </Link>
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
          {sections.map((id) => (
            <li key={id}>
              <Link
                href={`#${id}`}
                className={`
                  transition
                  ${
                    activeSection === id
                      ? "text-emerald-600 dark:text-emerald-400 font-semibold"
                      : "text-zinc-900 dark:text-zinc-100 hover:text-emerald-600 dark:hover:text-emerald-400"
                  }
                `}
              >
                {id === "home"
                  ? "Beranda"
                  : id === "features"
                  ? "Fitur"
                  : id === "preview"
                  ? "Preview"
                  : id === "benefit"
                  ? "Benefit"
                  : id === "download"
                  ? "Download"
                  : id}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <button
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-full hover:bg-none transition"
            aria-label="Toggle theme"
          >
            <Sun className="w-5 hidden dark:block" aria-hidden="true" />
            <Moon className="w-5 block dark:hidden" aria-hidden="true" />
          </button>

          <Link
            href="/auth/login"
            className="cursor-pointer bg-transparent hover:bg-transparent hover:text-emerald-600 sm:inline-flex rounded-full px-4 text-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-900"
          >
            Masuk
          </Link>

          <Button className="rounded-full bg-emerald-600 px-5 text-white hover:bg-emerald-700">
            Mulai Sekarang
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
