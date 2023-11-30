import { ComponentProps } from 'react';

export default function InputTextArea(
  props: ComponentProps<'textarea'> & { label?: string }
) {
  return (
    <div>
      {props.label && (
        <label
          htmlFor={props.id || props.name}
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
        id="email"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-tarseel-primary sm:text-sm sm:leading-6 resize-none"
        rows={5}
        placeholder="Enter more details about the parcel"
        {...props}
      />
    </div>
  );
}
