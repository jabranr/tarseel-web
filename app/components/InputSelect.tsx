import classNames from 'classnames';
import { ComponentProps } from 'react';

export default function InputSelect({
  children,
  placeholder = 'Select an option',
  label,
  error,
  ...props
}: ComponentProps<'select'> & { label?: string; error?: string }) {
  const id = props.id || props.name;
  const errorId = `${id}-error`;

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
          {!props.required && (
            <span className="ml-1 text-xs text-tarseel-gray-dark">
              (optional)
            </span>
          )}
        </label>
      )}
      <select
        id={id}
        defaultValue=""
        className={classNames(
          'relative w-full cursor-default mt-1 rounded-md bg-white py-1.5 pl-3 pr-10 text-left shadow-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-tarseel-primary sm:text-sm sm:leading-6 border-none',
          {
            'invalid:ring-red-700': error
          }
        )}
        {...props}
      >
        <option
          disabled
          value=""
          dangerouslySetInnerHTML={{ __html: placeholder }}
        />
        {children}
      </select>
      {error && (
        <p id={errorId} className="text-xs text-red-700 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}

function Option({ value, label, ...props }: ComponentProps<'option'>) {
  return (
    <option
      key={value as string}
      value={value}
      dangerouslySetInnerHTML={{ __html: label! }}
      {...props}
    />
  );
}

InputSelect.Option = Option;
