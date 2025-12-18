type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  onClick?: () => void;
  htmlType?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

const variants: Record<string, string> = {
  primary: 'btn btn-primary',
  secondary: 'btn btn-secondary',
  ghost: 'btn btn-ghost',
};

export default function Button({
  children,
  className = '',
  variant = 'primary',
  onClick,
  htmlType = 'button',
  disabled,
}: ButtonProps) {
  return (
    <button
      className={variants[variant] + ' ' + className}
      onClick={onClick}
      type={htmlType}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
