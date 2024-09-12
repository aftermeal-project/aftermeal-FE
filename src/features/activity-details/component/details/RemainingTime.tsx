import { useState, useEffect } from 'react';
import moment from 'moment';

interface RenamingTimeProps {
  applicationStartDate: string;
  applicationEndDate: string;
  isApplicationAllowed: boolean;
  isBeforeApplicationStart: boolean;
  size: 'small' | 'large';
}

export default function RenamingTime({
  applicationStartDate,
  applicationEndDate,
  isApplicationAllowed,
  isBeforeApplicationStart,
  size,
}: RenamingTimeProps) {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = moment();
      const endTime = moment(applicationEndDate);
      const duration = moment.duration(endTime.diff(now));
      return Math.max(Math.floor(duration.asSeconds()), 0);
    };

    setTimeRemaining(calculateTimeRemaining());

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
  }, [applicationEndDate]);

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
    <div
      className={`flex items-center gap-x-1 font-normal ${size === 'large' && 'text-lg'}`}
    >
      {timeRemaining > 0 && isApplicationAllowed ? (
        <>
          <p>신청 마감까지</p>
          <p className={`font-bold ${getTimeClass()}`}>
            {formatTime(timeRemaining)}
          </p>
          <p>남음</p>
        </>
      ) : (
        <p className="text-gray-500">
          {isBeforeApplicationStart
            ? '아직 신청할 수 없습니다.'
            : '신청이 마감 되었어요.'}
        </p>
      )}
    </div>
  );
}
