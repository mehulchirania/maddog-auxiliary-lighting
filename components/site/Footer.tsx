import Link from "next/link";
import Image from "next/image";

const FOOTER_LINKS = [
  { href: "/lights/", label: "Range" },
  { href: "/technology/", label: "Technology" },
  { href: "/fit/", label: "Fitment" },
  { href: "/proof/", label: "Reviews" },
  { href: "/warranty/", label: "Warranty" },
  { href: "/install/", label: "Installation" },
  { href: "/dealers/", label: "Dealers" },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--color-night-950)] border-t border-[var(--glass-stroke)] mt-auto">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16">
          {/* Col 1: Wordmark + location line */}
          <div>
            <Link href="/" className="inline-block" aria-label="Maddog Home">
              <Image
                src="/media/brand/maddog-logo-white.png"
                alt="Maddog"
                width={2547}
                height={501}
                className="h-6 w-auto"
              />
            </Link>
            <p className="mt-4 text-[var(--color-grey-300)] text-sm leading-relaxed max-w-xs">
              Auxiliary lighting. Made in Bengaluru.
            </p>
          </div>

          {/* Col 2: Links */}
          <div>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-6">
              {FOOTER_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--color-grey-300)] hover:text-[var(--color-white)] transition-colors duration-[var(--dur-fast)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact & Socials */}
          <div className="text-sm text-[var(--color-grey-300)] space-y-2">
            <p className="text-[var(--color-white)] font-medium">Maddog Industries</p>
            <p>Peenya 2nd Phase, Bangalore 560058</p>
            <p className="pt-2">
              <a
                href="mailto:support@maddog.co.in"
                className="hover:text-[var(--color-white)] transition-colors"
              >
                support@maddog.co.in
              </a>
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://www.instagram.com/maddoglights/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-grey-500)] hover:text-[var(--color-white)] transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://www.youtube.com/@maddoglights"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-grey-500)] hover:text-[var(--color-white)] transition-colors"
              >
                YouTube
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-16 pt-8 border-t border-[var(--glass-stroke)] flex items-center justify-between">
          <p className="readout">
            © 2026 Maddog Industries · Bengaluru, India
          </p>
        </div>
      </div>
    </footer>
  );
}
