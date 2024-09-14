import { Suspense } from 'react';
import {
  HomePageContainer,
  ErrorFallback,
  ErrorBoundary,
} from '../../components';
import {
  ActivityList,
  ActivityListFetcher,
  ActivityListSkeleton,
} from '../../features/activities';

export default function HomePage() {
  return (
    <ErrorBoundary Fallback={ErrorFallback}>
      <HomePageContainer>
        <Suspense fallback={<ActivityListSkeleton type="List" />}>
          <ActivityListFetcher>
            {activities => <ActivityList activities={activities} />}
          </ActivityListFetcher>
        </Suspense>
      </HomePageContainer>
    </ErrorBoundary>
  );
}
