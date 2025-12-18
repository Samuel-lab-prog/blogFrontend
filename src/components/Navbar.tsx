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
    shadow-md z-50 transition-transform duration-300
    ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`;
  const menu = `fixed top-0 right-0 h-full w-46 md:hidden border-l-2
     bg-white/80 backdrop-blur-xl shadow-xl border-l-gray-400
       p-6 z-60 transform transition-transform duration-300 ease-out
      ${open ? 'translate-x-0' : 'translate-x-full'}`

  // show/hide on scroll
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const current = window.scrollY;
      setShowNavbar(current < lastY);
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
  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <>
      <header className={mainNav}>
        <nav
          className="max-w-6xl mx-auto px-8 flex items-center justify-between h-20"
          aria-label="Main navigation"
        >
          <section className="flex items-center gap-6">
            <img src={logoSrc} alt="Logo" />

            <ul className="hidden md:flex items-center gap-6 px-4">
              {links.map(l => (
                <li key={l.label} className=''>
                  <Anchor to={l.to}>{l.label}</Anchor>
                </li>
              ))}
            </ul>
          </section>

          <button
            aria-label="Open menu"
            className="md:hidden rounded-lg hover:bg-gray-200 active:scale-95 transition cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <Menu size={60} />
          </button>
        </nav>
      </header>

      <aside
        className={menu}
        aria-label="Mobile menu"
      >
        <header className="flex items-center justify-between mb-6">
          <h3>Menu</h3>

          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="rounded-l active:scale-95 transition cursor-pointer hover:bg-gray-300"
          >
            <X size={60} />
          </button>
        </header>

        <nav className=''>
          <ul className="flex flex-col flex-10 gap-5">
            {links.map(l => (
              <li key={l.label} className=''>
                <Anchor to={l.to} className='text-base w-full'>{l.label}</Anchor>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {open && (
        <div
          role="button"
          aria-label="Close menu"
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* push-content */}
      <div className="h-20" />
      <Outlet />
    </>
  );
}
