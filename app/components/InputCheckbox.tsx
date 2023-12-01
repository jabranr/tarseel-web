import { ComponentProps } from 'react';

export default function InputCheckbox({
  children,
  helperText,
  error,
  ...props
}: ComponentProps<'input'> & {
  label?: string;
  helperText?: string;
  error?: string;
}) {
  return (
    <label className="text-sm flex items-start">
      <input
        type="checkbox"
        className="h-4 w-4 rounded border-gray-300 text-tarseel-primary focus:ring-tarseel-primary mr-2 mt-[2px]"
        {...props}
      />
      <div>
        <p className="font-medium">{children}</p>
        <p className="text-tarseel-gray-dark mt-1">{helperText}</p>
        {error && <p className="text-xs text-red-700 mt-1">{error}</p>}
      </div>
    </label>
  );
}
