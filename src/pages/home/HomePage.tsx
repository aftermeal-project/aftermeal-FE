import { Suspense } from 'react';
import ErrorScreen from '../../components/error/ErrorScreen';
import {
  HomePageContainer,
} from '../../components/ui/home';
import { errorMessages } from '../../constants';
import { Activity } from '../../types/activities';
import {
  ActivityListFallback,
  ActivityListFetcher,
  ActivityListContainer,
} from '../../features/activity';
import { FetchErrorBoundary } from '../../components/@global';

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
    </Fet>
  );
}
