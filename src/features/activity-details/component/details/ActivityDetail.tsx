import { ActivityDetailResponseDto } from '../../../../types';
import 'moment/locale/ko';
import { useState, useEffect } from 'react';
import {
  InformationSection,
  ParticipantsListSection,
  ApplicationSection,
  ApplicationFooter,
} from '../details';
import { useRecoilValue } from 'recoil';
import { UserAtom } from '../../../../atoms';
import { useParticipate } from '../../../participate/api/participate';
import useCancelParticipate from '../../../participate/api/cancel-participate';
import moment from 'moment';

interface ActivityDetailProps {
  activity: ActivityDetailResponseDto;
}

export default function ActivityDetail({ activity }: ActivityDetailProps) {
  const user = useRecoilValue(UserAtom);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  const { participate, isParticipateLoading } = useParticipate();
  const { cancelParticipate, isCancelLoading } = useCancelParticipate();

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1000);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isApplicationAllowed = (
    status: string,
    participantsCount: number,
    maxParticipants: number,
    applicationEndDate: string,
    applicationStartDate: string,
  ) => {
    const isStatusValid = status === 'SCHEDULED';
    const hasSpaceAvailable = participantsCount < maxParticipants;
    const isWithinApplicationPeriod =
      new Date() >= new Date(applicationStartDate) &&
      new Date() <= new Date(applicationEndDate);

    return isStatusValid && hasSpaceAvailable && isWithinApplicationPeriod;
  };

  const isParticipating = activity.participants.some(
    participant => participant.displayName === user.name,
  );

  const isBeforeApplicationStart = () => {
    const now = moment();
    const startTime = moment(activity.applicationStartDate);
    const duration = moment.duration(startTime.diff(now));
    return (
      Math.max(Math.floor(duration.asSeconds()), 0) > 0 &&
      activity.status === 'SCHEDULED'
    );
  };

  const handleParticipate = (activityId: number) => {
    participate.mutate(String(activityId));
  };

  const handleCancel = (activityId: number) => {
    cancelParticipate.mutate(String(activityId));
  };

  return (
    <div className="mx-auto grid w-full max-w-[1000px] grid-cols-1 rounded-lg max-[1000px]:mb-[5.5rem] min-[1000px]:grid-cols-3 min-[1000px]:gap-x-4 min-[1000px]:py-8">
      <div className="space-y-4 md:col-span-2">
        <InformationSection activity={activity} isSmallScreen={isSmallScreen} />
        <ParticipantsListSection participants={activity.participants} />
      </div>
      {!isSmallScreen ? (
        <ApplicationSection
          location={activity.location}
          applicationStartDate={activity.applicationStartDate}
          applicationEndDate={activity.applicationEndDate}
          isApplicationAllowed={isApplicationAllowed(
            activity.status,
            activity.participants.length,
            activity.maxParticipants,
            activity.applicationStartDate,
            activity.applicationEndDate,
          )}
          isBeforeApplicationStart={isBeforeApplicationStart()}
          isParticipating={isParticipating}
          onParticipate={() => handleParticipate(activity.id)}
          onCancel={() => handleCancel(activity.id)}
          isParticipateLoading={isParticipateLoading}
          isCancelLoading={isCancelLoading}
        />
      ) : (
        <ApplicationFooter
          applicationStartDate={activity.applicationStartDate}
          applicationEndDate={activity.applicationEndDate}
          isApplicationAllowed={isApplicationAllowed(
            activity.status,
            activity.participants.length,
            activity.maxParticipants,
            activity.applicationEndDate,
            activity.applicationStartDate,
          )}
          isBeforeApplicationStart={isBeforeApplicationStart()}
          isParticipating={isParticipating}
          onParticipate={() => handleParticipate(activity.id)}
          onCancel={() => handleCancel(activity.id)}
          isParticipateLoading={isParticipateLoading}
          isCancelLoading={isCancelLoading}
        />
      )}
    </div>
  );
}
