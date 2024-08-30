import { ReactNode } from 'react';

interface AdminPageContainerProps {
  children: ReactNode;
}

export default function AdminPageContainer({
  children,
}: AdminPageContainerProps) {
  return (
    <main className="flex-1 overflow-hidden bg-gray-100 p-6">{children}</main>
  );
}
