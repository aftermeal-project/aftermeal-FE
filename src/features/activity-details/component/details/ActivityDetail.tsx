import { ActivityDetailResponseDto } from '../../../../types';
import 'moment/locale/ko';
import { useState, useEffect } from 'react';
import {
  InformationSection,
  ParticipantsListSection,
  ApplicationSection,
  ApplicationFooter,
} from '../details';

interface ActivityDetailProps {
  activity: ActivityDetailResponseDto;
}

export default function ActivityDetail({ activity }: ActivityDetailProps) {
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

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

  return (
    <div className="mx-auto grid w-full max-w-screen-xl grid-cols-1 rounded-lg max-[1000px]:mb-[5.5rem] min-[1000px]:grid-cols-3 min-[1000px]:gap-x-4 min-[1000px]:px-4 min-[1000px]:py-8">
      <div className="space-y-4 md:col-span-2">
        <InformationSection activity={activity} isSmallScreen={isSmallScreen} />
        <ParticipantsListSection participants={activity.participants} />
      </div>
      {!isSmallScreen && (
        <ApplicationSection
          location={activity.location}
          status={activity.status}
          type={activity.type}
          applicationStartDate={activity.applicationStartDate}
          applicationEndDate={activity.applicationEndDate}
          isApplicationAllowed={isApplicationAllowed(
            activity.status,
            activity.participants.length,
            activity.maxParticipants,
            activity.applicationStartDate,
            activity.applicationEndDate,
          )}
        />
      )}
      {isSmallScreen && (
        <ApplicationFooter
          isApplicationAllowed={isApplicationAllowed(
            activity.status,
            activity.participants.length,
            activity.maxParticipants,
            activity.applicationEndDate,
            activity.applicationStartDate,
          )}
        />
      )}
    </div>
  );
}
