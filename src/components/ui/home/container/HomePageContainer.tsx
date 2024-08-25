import { ReactNode } from 'react';

interface HomePageContainerProps {
  children: ReactNode;
}

export default function HomePageContainer({
  children,
}: HomePageContainerProps) {
  return (
    <main className="w-full px-4 py-8">
      <div className="grid max-w-screen-xl grid-cols-1 gap-6 mx-auto sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {children}
      </div>
    </main>
  );
}
