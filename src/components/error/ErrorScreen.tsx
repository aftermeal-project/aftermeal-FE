import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { Link, useLocation } from 'react-router-dom';
import Path from '../../routes/path';

type TitleType = 'Oops!' | '404';

interface ErrorScreenProps {
  title: TitleType;
  description: string;
  onRetry?: () => void;
}

export default function ErrorScreen({
  title,
  description,
  onRetry,
}: ErrorScreenProps) {
  const location = useLocation();
  const { reset } = useQueryErrorResetBoundary();

  const handleClickRetry = () => {
    if (onRetry) {
      reset();
      onRetry();
    }
  };

  const isNotAdminDomain = location.pathname !== Path.AdminPage;

  return (
    <main
      className={`min-h-screen-minus-96 flex items-center justify-center ${isNotAdminDomain ? 'bg-gray-100' : 'bg-white'}`}
    >
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-700 mb-7">{title}</h1>
        <p className="text-xl text-gray-600">{description}</p>

        {title === 'Oops!' ? (
          <button
            className="px-4 py-2 mt-5 font-semibold text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 active:bg-blue-700"
            onClick={handleClickRetry}
          >
            다시 시도
          </button>
        ) : (
          <Link
            to="/"
            className="inline-block px-4 py-2 mt-4 font-semibold text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 active:bg-blue-700"
          >
            홈으로 돌아가기
          </Link>
        )}
      </div>
    </main>
  );
}
