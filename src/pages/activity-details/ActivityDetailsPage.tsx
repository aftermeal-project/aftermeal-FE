import { Suspense } from 'react';
import { ErrorFallback, ErrorBoundary, SEOHelmet } from '../../components';
import {
  ActivityDetailsFetcher,
  ActivityDetails,
  ActivityDetailsSkeleton,
} from '../../features/activity-details/component';
import { useLocation } from 'react-router-dom';

export default function ActivityDetailsPage() {
  const location = useLocation();

  return (
    <>
      <SEOHelmet
        title="참가 신청"
        description="지금 바로 활동 참가 신청을 완료하세요!"
        url={location.pathname}
      />
      <ErrorBoundary Fallback={ErrorFallback}>
        <Suspense fallback={<ActivityDetailsSkeleton />}>
          <ActivityDetailsFetcher>
            {activityDetails => <ActivityDetails activity={activityDetails} />}
          </ActivityDetailsFetcher>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
