import { useLocation, useNavigate } from 'react-router-dom';
import Path from '../../routes/path';
import { Button } from '../button';
import { HTTP_ERROR_MESSAGE } from './constants/errorMessage';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

export const hasKeyInObject = <T extends object>(
  obj: T,
  key: string | number | symbol,
): key is keyof T => {
  return Object.hasOwn(obj, key);
};

export interface ErrorProps {
  statusCode?: number;
  resetError?: () => void;
}

export default function ErrorFallback({
  statusCode = 404,
  resetError,
}: ErrorProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const currentStatusCode = statusCode;
  const isHTTPError = hasKeyInObject(HTTP_ERROR_MESSAGE, currentStatusCode);

  const isNotAdminDomain = location.pathname !== Path.AdminPage;
  const { reset } = useQueryErrorResetBoundary();

  if (!isHTTPError) return null;

  const handleClickRetry = () => {
    if (resetError) {
      reset();
      resetError();
    }
  };

  const handleClickGoBackHome = () => {
    navigate('/');
  };

  return (
    <main
      className={`flex items-center justify-center ${isNotAdminDomain ? 'min-h-screen-minus-96 bg-gray-100' : 'min-h-screen bg-white'}`}
    >
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-700 mb-7">
          {HTTP_ERROR_MESSAGE[currentStatusCode].HEADING}
        </h1>
        <p className="text-xl text-gray-600">
          {HTTP_ERROR_MESSAGE[currentStatusCode].BODY}
        </p>
        {HTTP_ERROR_MESSAGE[currentStatusCode].BUTTON === '홈으로 돌아가기' ? (
          <Button onClick={handleClickGoBackHome} className="mx-auto mt-5">
            {HTTP_ERROR_MESSAGE[currentStatusCode].BUTTON}
          </Button>
        ) : (
          <Button onClick={handleClickRetry} className="mx-auto mt-5">
            {HTTP_ERROR_MESSAGE[currentStatusCode].BUTTON}
          </Button>
        )}
      </div>
    </main>
  );
}
