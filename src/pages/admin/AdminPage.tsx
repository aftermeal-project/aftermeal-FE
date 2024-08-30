import { Suspense, useState } from 'react';
import {
  ActivityListSkeleton,
  AdminPageContainer,
  AdminPageSidebar,
} from '../../components/ui/admin';
import { Tab } from '../../types';
import { FetchErrorBoundary } from '../../components/@global';
import ErrorScreen from '../../components/error/ErrorScreen';
import { errorMessages } from '../../constants';
import {
  ActivityListFetcher,
  ActivityListContainer,
} from '../../features/activities';

export default function AdminPage() {
  const [selectedTab, setSelectedTab] = useState<Tab>('activities');

  return (
    <div className="flex h-screen">
      <AdminPageSidebar
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <AdminPageContainer>
        <FetchErrorBoundary
          fallback={
            <ErrorScreen
              title="Oops!"
              description={errorMessages.DEFAULT_ERROR}
            />
          }
        >
          {selectedTab === 'activities' && (
            <Suspense fallback={<ActivityListSkeleton />}>
              <ActivityListFetcher>
                {activities => (
                  <ActivityListContainer activities={activities} />
                )}
              </ActivityListFetcher>
            </Suspense>
          )}
          {selectedTab === 'activity-schedules' && <></>}
          {selectedTab === 'users' && <></>}
        </FetchErrorBoundary>
      </AdminPageContainer>
    </div>
  );
}
