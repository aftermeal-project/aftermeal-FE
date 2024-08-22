import { useEffect, useState } from 'react';

interface AuthLoadingSpinnerProps {
  loading: boolean;
  text: string;
}

export default function AuthLoadingSpinner({
  loading,
  text,
}: AuthLoadingSpinnerProps) {
  const [loadingText, setLoadingText] = useState<string>(text);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (loading) {
      intervalId = setInterval(() => {
        if (loadingText === text + '....') {
          setLoadingText(text);
        } else {
          setLoadingText(prev => {
            return prev + '.';
          });
        }
      }, 500);
    } else {
      setLoadingText(text);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [loading, loadingText, text]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-lg">
          <div className="w-6 h-6 border-4 border-blue-500 border-solid rounded-full animate-spin border-t-transparent" />
          <p className="text-lg font-semibold">{loadingText}</p>
        </div>
      </div>
    );
  }

  return <></>;
}
