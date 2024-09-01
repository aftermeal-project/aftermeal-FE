import { Suspense } from 'react';
import ErrorScreen from '../../components/error/ErrorScreen';
import { HomePageContainer } from '../../components/ui/home';
import { errorMessages } from '../../constants';
import { FetchErrorBoundary } from '../../components/@global';
import {
  ActivityListContainer,
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
            {activities => <ActivityListContainer activities={activities} />}
          </ActivityListFetcher>
        </Suspense>
      </HomePageContainer>
    </FetchErrorBoundary>
  );
}
