import moment from 'moment';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { UserAtom } from '../../../../../atoms';
import { ActivityDetailResponseDto } from '../../../../../types';
import { useCancelParticipation } from '../../../../participations/api/cancel-participation';
import { useParticipation } from '../../../../participations/api/participation';
import { ApplicationFooter } from '../footer';
import {
  InformationSection,
  ParticipationsListSection,
  ApplicationSection,
} from '../section';

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
    participantsCount: number,
    maxParticipants: number,
    applicationStartAt: string,
    applicationEndAt: string,
  ) => {
    const hasSpaceAvailable = participantsCount < maxParticipants;
    const isWithinApplicationPeriod =
      new Date() >= new Date(applicationStartAt) &&
      new Date() <= new Date(applicationEndAt);

    return hasSpaceAvailable && isWithinApplicationPeriod;
  };

  const isParticipated = activity.participations.some(
    participant => participant.id === Number(user.id),
  );

  const isBeforeApplicationStart = () => {
    const now = moment();
    const startTime = moment(activity.applicationStartAt);
    const duration = moment.duration(startTime.diff(now));
    return Math.max(Math.floor(duration.asSeconds()), 0) > 0;
  };

  const handleParticipate = (activityId: number) => {
    participation.mutate(String(activityId));
  };

  const handleCancel = (participationId: number) => {
    cancelParticipation.mutate(String(participationId));
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
          applicationStartAt={activity.applicationStartAt}
          applicationEndAt={activity.applicationEndAt}
          isApplicationAllowed={isApplicationAllowed(
            activity.participations.length,
            activity.maxParticipants,
            activity.applicationStartAt,
            activity.applicationEndAt,
          )}
          isBeforeApplicationStart={isBeforeApplicationStart()}
          isParticipated={isParticipated}
          onParticipate={() => handleParticipate(activity.id)}
          onCancel={() => handleCancel(activity.participations[0].id)}
          isParticipateLoading={isParticipateLoading}
          isCancelLoading={isCancelLoading}
        />
      ) : (
        <ApplicationFooter
          applicationStartAt={activity.applicationStartAt}
          applicationEndAt={activity.applicationEndAt}
          isApplicationAllowed={isApplicationAllowed(
            activity.participations.length,
            activity.maxParticipants,
            activity.applicationEndAt,
            activity.applicationStartAt,
          )}
          isBeforeApplicationStart={isBeforeApplicationStart()}
          isParticipated={isParticipated}
          onParticipate={() => handleParticipate(activity.id)}
          onCancel={() => handleCancel(activity.participations[0].id)}
          isParticipateLoading={isParticipateLoading}
          isCancelLoading={isCancelLoading}
        />
      )}
    </div>
  );
}
