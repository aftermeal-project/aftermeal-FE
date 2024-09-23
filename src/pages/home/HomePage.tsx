import { Suspense } from 'react';
import {
  HomePageContainer,
  ErrorFallback,
  ErrorBoundary,
  SEOHelmet,
} from '../../components';
import {
  ActivityList,
  ActivityListFetcher,
  ActivityListSkeleton,
} from '../../features/activities';

export default function HomePage() {
  return (
    <>
      <SEOHelmet
        title="교내 식후 활동 참여"
        description="다양한 교내 활동을 손쉽게 참여해보세요."
      />
      <ErrorBoundary Fallback={ErrorFallback}>
        <HomePageContainer>
          <Suspense fallback={<ActivityListSkeleton type="List" />}>
            <ActivityListFetcher>
              {activities => <ActivityList activities={activities} />}
            </ActivityListFetcher>
          </Suspense>
        </HomePageContainer>
      </ErrorBoundary>
    </>
  );
}
