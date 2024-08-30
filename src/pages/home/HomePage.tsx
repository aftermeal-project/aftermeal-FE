import { Suspense } from 'react';
import ErrorScreen from '../../components/error/ErrorScreen';
import {
  ActivitySchedulesListSkeleton,
  HomePageContainer,
} from '../../components/ui/home';
import { errorMessages } from '../../constants';
import {
  ActivitySchedulesListFetcher,
  ActivitySchedulesListContainer,
} from '../../features/activity-schedules';
import { FetchErrorBoundary } from '../../components/@global';

export default function HomePage() {
  return (
    <FetchErrorBoundary
      fallback={
        <ErrorScreen title="Oops!" description={errorMessages.DEFAULT_ERROR} />
      }
    >
      <HomePageContainer>
        <Suspense fallback={<ActivitySchedulesListSkeleton />}>
          <ActivitySchedulesListFetcher>
            {activitySchedules => (
              <ActivitySchedulesListContainer
                activitySchedules={activitySchedules}
              />
            )}
          </ActivitySchedulesListFetcher>
        </Suspense>
      </HomePageContainer>
    </FetchErrorBoundary>
  );
}
