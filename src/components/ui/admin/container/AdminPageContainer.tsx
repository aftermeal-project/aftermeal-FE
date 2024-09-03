import { ReactNode } from 'react';

interface AdminPageContainerProps {
  children: ReactNode;
}

export default function AdminPageContainer({
  children,
}: AdminPageContainerProps) {
  return (
    <main className="flex-1 overflow-hidden bg-white p-6">{children}</main>
  );
}
