import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { Link, useLocation } from 'react-router-dom';
import Path from '../../routes/path';
import { Button } from '../button';

type TitleType = 'Oops!' | '404' | '권한 오류';

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
      className={`flex items-center justify-center ${isNotAdminDomain ? 'min-h-screen-minus-96 bg-gray-100' : 'min-h-screen bg-white'}`}
    >
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-700 mb-7">{title}</h1>
        <p className="text-xl text-gray-600">{description}</p>

        {title === 'Oops!' ? (
          <Button
            type="button"
            onClick={handleClickRetry}
            size="large"
            className="mx-auto mt-5"
          >
            다시 시도
          </Button>
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
