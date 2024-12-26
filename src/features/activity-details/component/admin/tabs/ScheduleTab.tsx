import { formatDate, formatTime } from '../../../../../utils';

interface ScheduleTabProps {
  scheduledDate: string;
  applicationStartAt: string;
  applicationEndAt: string;
}

export default function ScheduleTab({
  scheduledDate,
  applicationStartAt,
  applicationEndAt,
}: ScheduleTabProps) {
  return (
    <div className="grid grid-cols-1 gap-y-2">
      <div className="mt-[8px] rounded-lg bg-white">
        <p className="font-semibold">일정</p>
        <span className="text-gray-700">{formatDate(scheduledDate)}</span>
        <hr className="my-2" />
      </div>
      <div className="bg-white rounded-lg">
        <p className="font-semibold">신청 시작 시간</p>
        <span className="text-gray-700">
          {formatTime({
            type: 'readable',
            time: applicationStartAt,
          })}
        </span>
        <hr className="my-2" />
      </div>
      <div className="bg-white rounded-lg">
        <p className="font-semibold">신청 마감 시간</p>
        <span className="text-gray-700">
          {formatTime({
            type: 'readable',
            time: applicationEndAt,
          })}
        </span>
      </div>
    </div>
  );
}
