import { ReactNode } from 'react';

interface TabsContainerProps {
  children: ReactNode;
}

export default function TabsContainer({ children }: TabsContainerProps) {
  return (
    <main className="flex-1 p-6 overflow-hidden bg-white">{children}</main>
  );
}
