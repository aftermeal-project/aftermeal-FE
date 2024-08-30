import { Suspense } from 'react';
import {
  ActivityListFetcher,
  ActivityListContainer,
} from '../../../../features/activities';
import { ActivityListSkeleton } from '../skeleton';

export default function ActivityManagementTab() {
  return (
    <Suspense fallback={<ActivityListSkeleton />}>
      <ActivityListFetcher>
        {activities => <ActivityListContainer activities={activities} />}
      </ActivityListFetcher>
    </Suspense>
  );
}
