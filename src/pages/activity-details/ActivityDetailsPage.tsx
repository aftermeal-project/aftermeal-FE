import { Suspense } from 'react';
import { ErrorScreen, FetchErrorBoundary } from '../../components';
import { errorMessages } from '../../constants';
import {
  ActivityDetailsFetcher,
  ActivityDetails,
  ActivityDetailsSkeleton,
} from '../../features/activity-details/component';
import { ActivityDetailResponseDto } from '../../types';

export default function ActivityDetailsPage() {
  return (
    <FetchErrorBoundary
      fallback={
        <ErrorScreen title="Oops!" description={errorMessages.DEFAULT_ERROR} />
      }
    >
      <Suspense fallback={<ActivityDetailsSkeleton />}>
        <ActivityDetailsFetcher>
          {({
            isAdmin,
            activityDetails,
          }: {
            isAdmin: boolean;
            activityDetails: ActivityDetailResponseDto;
          }) => (
            <ActivityDetails isAdmin={isAdmin} activity={activityDetails} />
          )}
        </ActivityDetailsFetcher>
      </Suspense>
    </FetchErrorBoundary>
  );
}
