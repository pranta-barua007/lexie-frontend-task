import { InputHTMLAttributes, FC, forwardRef } from 'react';

export type InputProps = {
  label: string;
  errorMessage?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  ({ label, errorMessage, ...otherProps }, ref) => {
    return (
      <div className="relative">
        <input
          {...otherProps}
          ref={ref}
          name={otherProps.name}
          value={otherProps.value || ''}
          placeholder="something"
          className="peer h-10 w-full border-b-2 border-gray-300 bg-transparent text-gray-900 placeholder-transparent focus:border-purple-600 focus:outline-none"
        />
        <label
          htmlFor={otherProps.name}
          className="absolute left-0 -top-3.5 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-800 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
        >
          {errorMessage ? <span className="text-red-400">{errorMessage}</span> : label}
        </label>
      </div>
    );
  },
);

export default Input;
