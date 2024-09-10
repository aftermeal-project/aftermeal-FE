import { Suspense } from 'react';
import { ErrorScreen, FetchErrorBoundary } from '../../components';
import { errorMessages } from '../../constants';
import {
  ActivityDetailsFetcher,
  ActivityDetails,
  ActivityDetailsSkeleton,
} from '../../features/activity-details/component';

export default function ActivityDetailsPage() {
  return (
    <FetchErrorBoundary
      fallback={
        <ErrorScreen title="Oops!" description={errorMessages.DEFAULT_ERROR} />
      }
    >
      <Suspense fallback={<ActivityDetailsSkeleton />}>
        <ActivityDetailsFetcher>
          {activityDetails => <ActivityDetails activity={activityDetails} />}
        </ActivityDetailsFetcher>
      </Suspense>
    </FetchErrorBoundary>
  );
}
