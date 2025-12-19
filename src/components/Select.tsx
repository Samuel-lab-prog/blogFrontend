import React, { forwardRef } from 'react';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  name: string;
  label: string;
  error?: string | null;
  hint?: string;
  className?: string;
  options: { value: string; label: string }[];
  hintClassName?: string;
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { name, label, error, hint, className = '', options, hintClassName, ...rest },
    ref
  ) => {
    const id = `select-${name}`;

    return (
      <div className={`flex flex-col gap-1 ${className}`}>
        <label htmlFor={id} className="text-xs md:text-sm">
          {label}
        </label>
        <select
          id={id}
          name={name}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${id}-error` : hint ? `${id}-hint` : undefined
          }
          className={`input ${error ? 'input-error' : 'input-base'}`}
          {...rest}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Hint só aparece se não houver erro */}
        {hint && !error && (
          <i id={`${id}-hint`} className={hintClassName || ''}>
            {hint}
          </i>
        )}

        {/* Espaço para erro */}
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

Select.displayName = 'Select';
export default Select;
