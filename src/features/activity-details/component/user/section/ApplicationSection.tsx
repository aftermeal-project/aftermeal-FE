import { FaMapMarkerAlt, FaClipboardList } from 'react-icons/fa';
import RenamingTime from '../time/RemainingTime';
import { formatTime } from '../../../../../utils';
import { Button } from '../../../../../components';

function getFormattedApplicationPeriod(startTime: string, endTime: string) {
  return (
    formatTime({ type: 'readable', time: startTime }) +
    ' ~ ' +
    formatTime({ type: 'readable', time: endTime })
  );
}

interface ApplicationSectionProps {
  location: string;
  applicationStartAt: string;
  applicationEndAt: string;
  isApplicationAllowed: boolean;
  isBeforeApplicationStart: boolean;
  isParticipated: boolean;
  isParticipateLoading: boolean;
  isCancelLoading: boolean;
  onParticipate: () => void;
  onCancel: () => void;
}

export default function ApplicationSection({
  location,
  applicationStartAt,
  applicationEndAt,
  isApplicationAllowed,
  isBeforeApplicationStart,
  isParticipated,
  isParticipateLoading,
  isCancelLoading,
  onParticipate,
  onCancel,
}: ApplicationSectionProps) {
  return (
    <div className="w-full rounded-lg bg-white p-6 shadow-md md:h-[21rem]">
      <h2 className="mb-8 text-2xl font-semibold">신청 정보</h2>
      <div className="flex flex-col">
        <div>
          <div className="flex items-center">
            <FaMapMarkerAlt className="inline-block mr-2 text-red-500" />
            <span className="text-lg font-semibold">장소</span>
          </div>
          <div className="text-gray-700">{location}</div>
        </div>
        <div className="mt-6">
          <div className="flex items-center">
            <FaClipboardList className="inline-block mr-2 text-blue-500" />
            <span className="text-lg font-semibold">신청 기간:</span>
          </div>
          <div className="flex flex-col font-semibold text-gray-700 gap-y-8">
            {getFormattedApplicationPeriod(
              applicationStartAt,
              applicationEndAt,
            )}
            <>
              {isApplicationAllowed ? (
                <>
                  {isParticipated ? (
                    <Button
                      onClick={onCancel}
                      fullWidth
                      variant="danger"
                      disabled={isCancelLoading}
                    >
                      {isCancelLoading ? '취소 중...' : '신청 취소'}
                    </Button>
                  ) : (
                    <Button
                      onClick={onParticipate}
                      fullWidth
                      disabled={isParticipateLoading}
                    >
                      {isParticipateLoading ? '신청 중...' : '신청 하기'}
                    </Button>
                  )}
                </>
              ) : (
                <Button
                  variant="secondary"
                  fullWidth
                  disabled={true}
                  className="cursor-not-allowed"
                >
                  {isBeforeApplicationStart ? '예정됨' : '신청마감'}
                </Button>
              )}
            </>
          </div>
        </div>

        <div className="mx-auto mt-2 w-fit">
          <RenamingTime
            isApplicationAllowed={isApplicationAllowed}
            isBeforeApplicationStart={isBeforeApplicationStart}
            applicationStartAt={applicationStartAt}
            applicationEndAt={applicationEndAt}
            size="small"
          />
        </div>
      </div>
    </div>
  );
}
