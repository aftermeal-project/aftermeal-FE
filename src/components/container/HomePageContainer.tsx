import { ReactNode } from 'react';

interface HomePageContainerProps {
  children: ReactNode;
}

export default function HomePageContainer({
  children,
}: HomePageContainerProps) {
  return (
    <main className="relative flex items-center w-full px-4">
      <div className="mx-auto w-full max-w-[1000px]">{children}</div>
    </main>
  );
}
