import { useState, useEffect } from 'react';

export default function WaitingScreen() {
  const [timeRemaining, setTimeRemaining] = useState<number>(3599);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(prevTime => {
        if (prevTime <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function formatTime(seconds: number): string {
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}분 ${s.toString().padStart(2, '0')}초`;
  }

  function getTimeClass(): string {
    if (timeRemaining <= 20) {
      return 'text-red-600 animate-shake animate-pulse ';
    } else if (timeRemaining <= 600) {
      return 'text-yellow-500 animate-pulse ';
    } else {
      return 'text-blue-600';
    }
  }

  return (
    <div className="flex flex-col items-center justify-center max-w-screen-xl mx-auto bg-white min-h-screen-minus-96-plus-4rem py-9">
      <div>
        <div className="flex flex-col text-center gap-y-2">
          <h1 className="text-3xl font-bold">Not Yet!</h1>
          <p className="text-lg text-gray-700">아직 신청시간이 아닙니다.</p>
        </div>
        <div className="mt-8 rounded-lg shadow-md bg-gray-50 p-9">
          <div className="text-center">
            <p className="mb-2 text-sm font-medium text-green-500">
              기회를 놓치지 마세요!
            </p>
            <div className="items-center justify-center">
              <span className="text-5xl">🧐</span>
              <p className="mt-4 mb-2 text-lg">신청 오픈까지</p>
              <p
                className={`rounded-md border-2 border-blue-300 bg-white p-2 text-4xl font-extrabold shadow-sm ${getTimeClass()}`}
              >
                {formatTime(timeRemaining)} 남음
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
