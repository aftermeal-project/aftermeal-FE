import { ActivityDetailResponseDto } from '../../../../types';
import 'moment/locale/ko';
import { useState, useEffect } from 'react';
import {
  InformationSection,
  ParticipationsListSection,
  ApplicationSection,
  ApplicationFooter,
} from '../details';
import { useRecoilValue } from 'recoil';
import { UserAtom } from '../../../../atoms';
import moment from 'moment';
import { useParticipation } from '../../../participations/api/participation';
import { useCancelParticipation } from '../../../participations/api/cancel-participation';

interface ActivityDetailProps {
  activity: ActivityDetailResponseDto;
}

export default function ActivityDetail({ activity }: ActivityDetailProps) {
  const user = useRecoilValue(UserAtom);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  const { participation, isParticipateLoading } = useParticipation();
  const { cancelParticipation, isCancelLoading } = useCancelParticipation();

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

  const isParticipated = activity.participations.some(
    participant => participant.id === Number(user.id),
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
    participation.mutate(String(activityId));
  };

  const handleCancel = (activityId: number) => {
    cancelParticipation.mutate(String(activityId));
  };

  return (
    <div className="mx-auto grid w-full max-w-[1000px] grid-cols-1 rounded-lg max-[1000px]:mb-[5.5rem] min-[1000px]:grid-cols-3 min-[1000px]:gap-x-4 min-[1000px]:py-8">
      <div className="space-y-4 md:col-span-2">
        <InformationSection activity={activity} isSmallScreen={isSmallScreen} />
        <ParticipationsListSection participations={activity.participations} />
      </div>
      {!isSmallScreen ? (
        <ApplicationSection
          location={String(activity.location)}
          applicationStartDate={activity.applicationStartDate}
          applicationEndDate={activity.applicationEndDate}
          isApplicationAllowed={isApplicationAllowed(
            activity.status,
            activity.participations.length,
            activity.maxParticipants,
            activity.applicationStartDate,
            activity.applicationEndDate,
          )}
          isBeforeApplicationStart={isBeforeApplicationStart()}
          isParticipated={isParticipated}
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
            activity.participations.length,
            activity.maxParticipants,
            activity.applicationEndDate,
            activity.applicationStartDate,
          )}
          isBeforeApplicationStart={isBeforeApplicationStart()}
          isParticipated={isParticipated}
          onParticipate={() => handleParticipate(activity.id)}
          onCancel={() => handleCancel(activity.id)}
          isParticipateLoading={isParticipateLoading}
          isCancelLoading={isCancelLoading}
        />
      )}
    </div>
  );
}
