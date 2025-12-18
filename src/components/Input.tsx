import React, { forwardRef } from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  error?: string | null;
  hint?: string;
  className?: string;
  options?: { value: string; label: string }[];  type?: 'text' | 'email' | 'password' | 'date' | 'radio';
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ name, label, error, hint, className = '', ...rest }, ref) => {
    const id = `input-${name}`;

    return (
      <div className={`flex flex-col gap-1 ${className}`}>
        <label htmlFor={id} className="text-xs md:text-sm">
          {label}
        </label>
        <input
          id={id}
          name={name}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${id}-error` : hint ? `${id}-hint` : undefined
          }
          className={`input ${
            error
              ? 'input-error'
              : 'input-base'
          }`}
          {...rest}
        />
        {hint && !error && <p id={`${id}-hint`}>{hint}</p>}
        <div className="min-h-5">
          {error && (
            <p
              id={`${id}-error`}
              className="text-red-600 text-xs md:text-sm"
            >
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
