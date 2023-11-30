import classNames from 'classnames';
import { ComponentProps } from 'react';

export default function InputText({
  children,
  className,
  ...props
}: ComponentProps<'input'> & { label?: string }) {
  const id = props.id || props.name;

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
      <div className="mt-1 relative">
        <input
          id={id}
          className={classNames(
            'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-tarseel-primary sm:text-sm sm:leading-6',
            {
              'pl-9': Boolean(children)
            },
            className
          )}
          {...props}
        />
        {children && (
          <div className="absolute left-2 top-1/2 -translate-y-1/2 text-tarseel-gray-dark">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

function Group({
  children,
  required = false,
  label
}: ComponentProps<'div'> & { label?: string; required?: boolean }) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium leading-6 text-gray-900">
          {label}
          {!required && (
            <span className="ml-1 text-xs text-tarseel-gray-dark">
              (optional)
            </span>
          )}
        </label>
      )}
      <div className="flex items-center justify-between space-x-2">
        {children}
      </div>
    </div>
  );
}

InputText.Group = Group;
