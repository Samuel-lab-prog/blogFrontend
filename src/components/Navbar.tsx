import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Anchor from './Anchor';

type NavLinkItem = {
  label: string;
  to?: string;
  href?: string;
};

type NavbarProps = {
  logoSrc: string;
  links: NavLinkItem[];
};

export default function Navbar({ logoSrc, links = [] }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const location = useLocation();

  const mainNav = `fixed top-0 left-0 w-full bg-white/70 backdrop-blur-md
    shadow-md z-50 transition-transform duration-300 h-20
    ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`;

  const menu = `fixed top-0 right-0 h-full w-64 md:hidden border-l
    bg-white/90 backdrop-blur-xl shadow-xl border-gray-200
    p-6 z-50 transform transition-transform duration-300 ease-out
    ${open ? 'translate-x-0' : 'translate-x-full'}`;

  // show/hide on scroll (mais suave)
  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const current = window.scrollY;
      setShowNavbar(current < lastY || current < 40);
      lastY = current;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // lock scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className={mainNav}>
        <nav
          className="max-w-6xl mx-auto px-6 flex items-center justify-between h-20"
          aria-label="Main navigation"
        >
          <section className="flex items-center gap-6">
            <img src={logoSrc} alt="Logo" className="h-8 w-auto" />

            <ul className="hidden md:flex items-center gap-6 px-4">
              {links.map((l) => (
                <li key={l.label}>
                  <Anchor to={l.to}>{l.label}</Anchor>
                </li>
              ))}
            </ul>
          </section>

          <button
            type="button"
            aria-label="Open menu"
            className="md:hidden rounded-lg p-2 hover:bg-gray-200 active:scale-95 transition"
            onClick={() => setOpen(true)}
          >
            <Menu size={32} />
          </button>
        </nav>
      </header>

      <aside className={menu} aria-label="Mobile menu">
        <header className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium">Menu</h3>

          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="rounded-lg p-2 hover:bg-gray-200 active:scale-95 transition"
          >
            <X size={32} />
          </button>
        </header>

        <nav>
          <ul className="flex flex-col flex-1 gap-4">
            {links.map((l) => (
              <li key={l.label}>
                <Anchor to={l.to} className="block w-full py-2 text-base">
                  {l.label}
                </Anchor>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {open && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* push-content */}
      <div className="h-20" />
      <Outlet />
    </>
  );
}
