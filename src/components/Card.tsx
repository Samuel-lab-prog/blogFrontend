type CardProps = {
  children: React.ReactNode;
  className?: string;
  variant?:
    | 'default'
    | 'outlined'
    | 'elevated'
    | 'ghost'
    | 'hover'
    | 'gradient'
    | 'invisible';
};
const cardBaseClasses = 'overflow-hidden p-4';

const variants: Record<string, string> = {
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
    <div
      className={`${variants[variant]} ${cardBaseClasses} ${className}`}
    >
      {children}
    </div>
  );
}

Card.Header = function CardHeader({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {children}
    </div>
  );
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
  return <strong className={`${className}`}>{children}</strong>;
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

Card.Footer = function CardFooter({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`border-t border-gray-200 ${className}`}>
      {children}
    </div>
  );
};
