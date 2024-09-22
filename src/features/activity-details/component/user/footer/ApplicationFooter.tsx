import { Button } from '../../../../../components';
import { RenamingTime } from '../time';

interface ApplicationFooterProps {
  applicationStartDate: string;
  applicationEndDate: string;
  isApplicationAllowed: boolean;
  isBeforeApplicationStart: boolean;
  isParticipated: boolean;
  isParticipateLoading: boolean;
  isCancelLoading: boolean;
  onParticipate: () => void;
  onCancel: () => void;
}

export default function ApplicationFooter({
  applicationStartDate,
  applicationEndDate,
  isApplicationAllowed,
  isBeforeApplicationStart,
  isParticipated,
  isParticipateLoading,
  isCancelLoading,
  onParticipate,
  onCancel,
}: ApplicationFooterProps) {
  return (
    <div className="fixed bottom-0 left-0 w-full rounded-t-lg border-t border-gray-200 bg-white bg-gradient-to-r from-white to-gray-100 p-4 shadow-lg">
      {isApplicationAllowed ? (
        <div className="flex w-full items-center justify-between font-semibold">
          <RenamingTime
            applicationEndDate={applicationEndDate}
            applicationStartDate={applicationStartDate}
            isApplicationAllowed={isApplicationAllowed}
            isBeforeApplicationStart={isBeforeApplicationStart}
            size="large"
          />
          <>
            {isParticipated ? (
              <Button
                onClick={onCancel}
                variant="danger"
                disabled={isCancelLoading}
              >
                {isCancelLoading ? '취소 중...' : '신청 취소'}
              </Button>
            ) : (
              <Button onClick={onParticipate} disabled={isParticipateLoading}>
                {isParticipateLoading ? '신청 중...' : '신청 하기'}
              </Button>
            )}
          </>
        </div>
      ) : (
        <div className="flex w-full items-center justify-between font-semibold">
          <p className="text-gray-500">
            {isBeforeApplicationStart
              ? '아직 신청할 수 없습니다.'
              : '신청이 마감 되었어요.'}
          </p>
          <Button
            variant="secondary"
            disabled={true}
            className="cursor-not-allowed bg-gray-200 px-8 text-gray-600 shadow-inner"
          >
            {isBeforeApplicationStart ? '예정됨' : '신청마감'}
          </Button>
        </div>
      )}
    </div>
  );
}
