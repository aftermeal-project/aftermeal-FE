import { Suspense } from 'react';
import {
  ActivityListFetcher,
  ActivityListSkeleton,
  ActivitiyListTableContainer,
} from '../../../../features/activities';

export default function ActivityManagementTab() {
  return (
    <Suspense fallback={<ActivityListSkeleton type="Table" />}>
      <ActivityListFetcher>
        {activities => <ActivitiyListTableContainer activities={activities} />}
      </ActivityListFetcher>
    </Suspense>
  );
}
