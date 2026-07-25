"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import { navigatie, whatsappLink } from "@/lib/site";
import { MenuIcon, SluitIcon, WhatsAppIcon } from "@/components/Icons";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [gescrold, setGescrold] = useState(false);

  // Sluit het mobiele menu bij een paginawissel
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Subtiele schaduw zodra de bezoeker scrolt
  useEffect(() => {
    const bijScroll = () => setGescrold(window.scrollY > 8);
    bijScroll();
    window.addEventListener("scroll", bijScroll, { passive: true });
    return () => window.removeEventListener("scroll", bijScroll);
  }, []);

  // Voorkom scrollen achter het geopende menu
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActief = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md transition-all duration-300 ease-zacht ${
        gescrold ? "border-navy-100 shadow-card" : "border-transparent"
      }`}
    >
      <div className="container-page flex h-[72px] items-center justify-between gap-4 sm:h-20">
        <Logo variant="opWit" priority />

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Hoofdnavigatie">
          {navigatie.map((item) => {
            const actief = isActief(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={actief ? "page" : undefined}
                className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                  actief ? "text-navy-950" : "text-navy-600 hover:text-navy-950"
                }`}
              >
                {item.label}
                <span
                  className={`absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-gold-500 transition-transform duration-300 ease-zacht ${
                    actief ? "scale-x-100" : "scale-x-0"
                  }`}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline btn-klein"
          >
            <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
            WhatsApp
          </a>
          <Link href="/umrah-reizen" className="btn-primary btn-klein !text-sm">
            Bekijk onze reizen
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobiel-menu"
          aria-label={open ? "Menu sluiten" : "Menu openen"}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-navy-200 text-navy-800
                     transition-colors hover:border-navy-300 hover:bg-navy-50 lg:hidden"
        >
          {open ? <SluitIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div
          id="mobiel-menu"
          className="animate-fade-in border-t border-navy-100 bg-white lg:hidden"
        >
          <nav className="container-page flex flex-col py-3" aria-label="Mobiele navigatie">
            {navigatie.map((item) => {
              const actief = isActief(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={actief ? "page" : undefined}
                  className={`flex items-center justify-between rounded-xl px-3 py-3.5 text-sm font-medium transition-colors ${
                    actief ? "bg-navy-50 text-navy-950" : "text-navy-700 hover:bg-navy-50"
                  }`}
                >
                  {item.label}
                  {actief && (
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-500" aria-hidden="true" />
                  )}
                </Link>
              );
            })}
            <div className="mt-3 flex flex-col gap-2 border-t border-navy-100 pt-4">
              <Link href="/umrah-reizen" className="btn-primary w-full">
                Bekijk onze reizen
              </Link>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline w-full"
              >
                <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                Stel uw vraag via WhatsApp
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
