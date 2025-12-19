import { NavLink } from 'react-router-dom';

type AnchorProps = {
  children: React.ReactNode;
  to?: string;
  href?: string;
  className?: string;
  variant?: 'btn-primary' | 'btn-secondary' | 'btn-ghost' | 'link';
};

const variants: Record<string, string> = {
  link: 'link',
  'btn-primary': 'btn btn-primary',
  'btn-secondary': 'btn btn-secondary',
  'btn-ghost': 'btn btn-ghost',
};

export default function Anchor({
  children,
  to,
  href,
  className = '',
  variant = 'link',
}: AnchorProps) {
  const classes = variants[variant] + ' ' + className;

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <NavLink
      to={to || '#'}
      className={({ isActive }) =>
        isActive ? `${classes} active-link` : classes
      }
    >
      {children}
    </NavLink>
  );
}
