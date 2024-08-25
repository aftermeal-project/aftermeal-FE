import { Suspense } from 'react';
import ErrorScreen from '../../components/error/ErrorScreen';
import {
  FetchErrorBoundary,
  HomePageContainer,
} from '../../components/ui/home';
import { errorMessages } from '../../constants';
import ActivityListContainer from '../../features/activity/components/ActivityListContainer';
import ActivityListFetcher from '../../features/activity/components/ActivityListFetcher';
import { Activity } from '../../types/activities';
import ActivityListFallback from '../../features/activity/components/ActivityListFallback';

export default function HomePage() {
  return (
    <FetchErrorBoundary
      fallback={
        <ErrorScreen title="Oops!" description={errorMessages.DEFAULT_ERROR} />
      }
    >
      <HomePageContainer>
        <Suspense fallback={<ActivityListFallback />}>
          <ActivityListFetcher>
            {(activities: Activity[]) => (
              <ActivityListContainer activities={activities} />
            )}
          </ActivityListFetcher>
        </Suspense>
      </HomePageContainer>
    </FetchErrorBoundary>
  );
}
