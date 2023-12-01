import classNames from 'classnames';
import { ComponentProps } from 'react';

export default function InputTextArea({
  error,
  ...props
}: ComponentProps<'textarea'> & { label?: string; error?: string }) {
  const id = props.id || props.name;
  const errorId = `${id}-error`;

  return (
    <div>
      {props.label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {props.label}
          {!props.required && (
            <span className="ml-1 text-xs text-tarseel-gray-dark">
              (optional)
            </span>
          )}
        </label>
      )}
      <textarea
        id={id}
        className={classNames(
          'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-tarseel-primary sm:text-sm sm:leading-6 resize-none invalid:ring-red-700',
          {
            'invalid:ring-red-700': error
          }
        )}
        rows={5}
        placeholder="Enter more details about the parcel"
        {...props}
      />
      {error && (
        <p id={errorId} className="text-xs text-red-700 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
