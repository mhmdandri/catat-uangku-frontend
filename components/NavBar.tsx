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
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
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
            if (entry.isIntersecting) setActiveSection(id);
          });
        },
        { root: null, rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const nav = document.getElementById("site-nav");
    const navH = nav?.getBoundingClientRect().height ?? 72;
    const y = el.getBoundingClientRect().top + window.scrollY - navH - 0;

    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
  };
  const labelFor = (id: string) =>
    id === "home"
      ? "Beranda"
      : id === "features"
      ? "Fitur"
      : id === "preview"
      ? "Preview"
      : id === "benefit"
      ? "Benefit"
      : id === "download"
      ? "Download"
      : id;
  return (
    <nav
      id="site-nav"
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
          <span className="text-xl sm:text-2xl font-semibold text-emerald-700 dark:text-emerald-400">
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
                {labelFor(id)}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2 sm:gap-4">
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
            href="/auth?sign=login"
            className="hidden sm:inline-flex cursor-pointer bg-transparent hover:bg-transparent hover:text-emerald-600 rounded-full px-4 text-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-900"
          >
            Masuk
          </Link>
          <Button
            onClick={() => (window.location.href = "#download")}
            className="hidden sm:inline-flex rounded-full bg-emerald-600 px-5 text-white hover:bg-emerald-700"
          >
            Mulai Sekarang
          </Button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden w-10 h-10 inline-flex items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-950/60 backdrop-blur"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <span className="sr-only">Menu</span>
            <div className="flex flex-col gap-1.5">
              <span className="h-0.5 w-5 bg-zinc-900 dark:bg-zinc-100" />
              <span className="h-0.5 w-5 bg-zinc-900 dark:bg-zinc-100" />
              <span className="h-0.5 w-5 bg-zinc-900 dark:bg-zinc-100" />
            </div>
          </button>
        </div>
      </div>
      <div
        className={`md:hidden fixed inset-0 z-50 transition ${
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
          className={`absolute inset-0 bg-black/30 transition-opacity ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute right-3 top-3 left-3 rounded-2xl border border-zinc-200 dark:border-zinc-800
            bg-white dark:bg-zinc-950 shadow-lg p-4 transition-all duration-200
            ${
              mobileOpen
                ? "translate-y-0 opacity-100"
                : "-translate-y-2 opacity-0"
            }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Menu
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              className="w-9 h-9 inline-flex items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <ul className="mt-3 grid gap-2 text-sm font-medium">
            {sections.map((id) => (
              <li key={id}>
                <Link
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileOpen(false);
                    requestAnimationFrame(() => {
                      requestAnimationFrame(() => {
                        scrollToId(id);
                      });
                    });
                  }}
                  className={`block rounded-xl px-3 py-2 transition
                    ${
                      activeSection === id
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                        : "text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                    }`}
                >
                  {labelFor(id)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Link
              href="/auth?sign=login"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 px-4 py-2 text-sm text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900"
            >
              Masuk
            </Link>
            <Button
              onClick={() => {
                setMobileOpen(false);
                requestAnimationFrame(() => {
                  requestAnimationFrame(() => {
                    scrollToId("download");
                  });
                });
              }}
              className="rounded-full bg-emerald-600 text-white hover:bg-emerald-700"
            >
              Mulai
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
