import { Suspense } from 'react';
import { errorMessages } from '../../constants';
import {
  HomePageContainer,
  ErrorScreen,
  FetchErrorBoundary,
} from '../../components';
import {
  ActivityList,
  ActivityListFetcher,
  ActivityListSkeleton,
} from '../../features/activities';

export default function HomePage() {
  return (
    <FetchErrorBoundary
      fallback={
        <ErrorScreen title="Oops!" description={errorMessages.DEFAULT_ERROR} />
      }
    >
      <HomePageContainer>
        <Suspense fallback={<ActivityListSkeleton type="List" />}>
          <ActivityListFetcher>
            {activities => <ActivityList activities={activities} />}
          </ActivityListFetcher>
        </Suspense>
      </HomePageContainer>
    </FetchErrorBoundary>
  );
}
