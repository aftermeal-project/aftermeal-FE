import { ActivityResponseDto } from '../../../../types';
import { ActivityCard } from '..';

interface ActivityListContainerProps {
  activities: ActivityResponseDto[];
}

export default function ActivityListContainer({
  activities,
}: ActivityListContainerProps) {
  return (
    <>
      {activities.map(activity => (
        <ActivityCard
          key={activity.id}
          id={activity.id}
          title={activity.title}
          maxParticipants={activity.maxParticipants}
          currentParticipants={activity.currentParticipants}
          location={activity.location}
          status={activity.status}
          type={activity.type}
          scheduledDate={activity.scheduledDate}
          applicationStartDate={activity.applicationStartDate}
          applicationEndDate={activity.applicationEndDate}
        />
      ))}
    </>
  );
}
