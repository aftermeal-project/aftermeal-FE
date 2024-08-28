import { ReactNode } from 'react';

interface HomePageContainerProps {
  children: ReactNode;
}

export default function HomePageContainer({
  children,
}: HomePageContainerProps) {
  return (
    <main className="w-full px-4 py-8">
      <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {children}
      </div>
    </main>
  );
}
