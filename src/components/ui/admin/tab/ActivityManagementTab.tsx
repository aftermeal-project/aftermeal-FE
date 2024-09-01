import { Suspense } from 'react';
import {
  ActivityListFetcher,
  ActivityListContainer,
  ActivityListSkeleton,
} from '../../../../features/activities';

export default function ActivityManagementTab() {
  return (
    <Suspense fallback={<ActivityListSkeleton type="Table" />}>
      <ActivityListFetcher>
        {activities => <ActivityListContainer activities={activities} />}
      </ActivityListFetcher>
    </Suspense>
  );
}
