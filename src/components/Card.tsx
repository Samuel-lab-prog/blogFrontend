import type { JSX } from "react/jsx-dev-runtime";

type CardVariants =
  | 'default'
  | 'outlined'
  | 'elevated'
  | 'ghost'
  | 'hover'
  | 'gradient'
  | 'invisible';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  variant?: CardVariants;
};

const cardBaseClasses = 'p-4'; // 🔥 removi overflow-hidden

const variants: Record<CardVariants, string> = {
  default: 'bg-white rounded-xl shadow-sm border border-gray-200',
  outlined: 'bg-white rounded-xl border border-gray-300',
  elevated: 'bg-white rounded-xl shadow-md',
  ghost: 'bg-transparent rounded-xl border border-gray-200',
  hover:
    'bg-white rounded-xl shadow-sm border border-gray-200 transition hover:shadow-md hover:-translate-y-0.5',
  gradient:
    'rounded-xl text-white bg-linear-to-br from-gray-900 to-gray-700 shadow-md',
  invisible: 'bg-transparent',
};


export default function Card({
  children,
  className = '',
  variant = 'default',
}: CardProps) {
  return (
    <div className={`flex flex-col ${variants[variant]} ${cardBaseClasses} ${className}`}>
      {children}
    </div>
  );
}

Card.Title = function CardTitle({
  as: Component = 'h4',
  children,
  className = '',
}: {
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  className?: string;
}) {
  return <Component className={className}>{children}</Component>;
};


Card.Title = function CardTitle({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <h4 className={`${className}`}>{children}</h4>;
};

Card.Description = function CardDescription({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={`${className}`}>{children}</p>;
};

Card.Content = function CardContent({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`${className}`}>{children}</div>;
};

Card.Footer = function CardFooter({ children, className = '' }: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`pt-4 ${className}`}>
      {children}
    </div>
  );
};

