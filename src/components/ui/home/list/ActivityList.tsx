import { Activity } from '../../../../types/activities';
import { ActivityCard } from '../card';

interface ActivityListProps {
  list: Activity[];
}

export default function ActivityList({ list }: ActivityListProps) {
  return (
    <>
      {list.map(activity => (
        //    <ActivityCard/>
        <div />
      ))}
    </>
  );
}
