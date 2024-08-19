import { ButtonHTMLAttributes } from 'react';

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export default function AuthButton({ text, ...props }: AuthButtonProps) {
  return (
    <button
      {...props}
      className="w-full p-3 font-medium text-white transition duration-300 bg-indigo-600 rounded-md hover:bg-indigo-500"
    >
      {text}
    </button>
  );
}
