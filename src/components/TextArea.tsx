import React, { forwardRef } from 'react';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: string;
  label: string;
  error?: string | null;
  hint?: string;
  className?: string;
  rows?: number; 
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ name, label, error, hint, className = '', rows = 6, ...rest }, ref) => {
    const id = `textarea-${name}`;

    return (
      <div className={`flex flex-col gap-1 ${className}`}>
        <label htmlFor={id} className="text-xs md:text-sm">
          {label}
        </label>
        <textarea
          id={id}
          name={name}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${id}-error` : hint ? `${id}-hint` : undefined
          }
          rows={rows} 
          className={`input ${
            error ? 'input-error' : 'input-base'
          } resize-none`}
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

Textarea.displayName = 'Textarea';
export default Textarea;
