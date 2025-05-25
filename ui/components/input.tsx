import { type InputHTMLAttributes } from 'react';
import kebabCase from 'kebab-case';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = ({
  label,
  id = kebabCase(label),
  ...props
}: InputProps) => {
  return (
    <label className="flex flex-col gap-1 w-full" htmlFor={id}>
      <span className="flex gap-2 items-center text-sm/6 font-medium text-gray-900 has-[+:required]:after:content-[' '] has-[+:required]:after:bg-red-500 has-[+:required]:after:w-1.5 has-[+:required]:after:h-1.5 has-[+:required]:after:rounded-full">
        {label}
      </span>
      <input
        required
        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        {...props}
      />
    </label>
  );
};
