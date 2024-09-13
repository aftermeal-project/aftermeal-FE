import { ReactNode } from 'react';

interface AuthFormContainerProps {
  title: string;
  children: ReactNode;
}

export default function AuthFormContainer({
  title,
  children,
}: AuthFormContainerProps) {
  return (
    <main className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-300 to-indigo-600">
      <section className="p-8 text-center bg-white shadow-lg w-96 rounded-xl">
        <header>
          <h1 className="mb-5 text-2xl font-bold text-gray-800">{title}</h1>
        </header>
        {children}
      </section>
    </main>
  );
}
