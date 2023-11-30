import { ComponentProps } from 'react';

export default function InputTextArea(
  props: ComponentProps<'textarea'> & { label?: string }
) {
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
      <textarea
        id={id}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-tarseel-primary sm:text-sm sm:leading-6 resize-none"
        rows={5}
        placeholder="Enter more details about the parcel"
        {...props}
      />
    </div>
  );
}
