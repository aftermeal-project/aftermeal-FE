import { Suspense } from 'react';
import { ErrorFallback, ErrorBoundary } from '../../components';
import {
  ActivityDetailsFetcher,
  ActivityDetails,
  ActivityDetailsSkeleton,
} from '../../features/activity-details/component';

export default function ActivityDetailsPage() {
  return (
    <ErrorBoundary Fallback={ErrorFallback}>
      <Suspense fallback={<ActivityDetailsSkeleton />}>
        <ActivityDetailsFetcher>
          {activityDetails => <ActivityDetails activity={activityDetails} />}
        </ActivityDetailsFetcher>
      </Suspense>
    </ErrorBoundary>
  );
}
