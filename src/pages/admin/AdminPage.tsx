import { useState } from 'react';
import { FetchErrorBoundary } from '../../components/@global';
import ErrorScreen from '../../components/error/ErrorScreen';
import {
  AdminPageSidebar,
  AdminPageContainer,
  ActivityManagementTab,
} from '../../components/ui/admin';
import { errorMessages } from '../../constants';
import { Tab } from '../../types';

export default function AdminPage() {
  const [selectedTab, setSelectedTab] = useState<Tab>('activities');

  return (
    <div className="flex h-screen bg-gray-100">
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
          {selectedTab === 'activities' && <ActivityManagementTab />}
          {selectedTab === 'activity-schedules' && <></>}
          {selectedTab === 'users' && <></>}
        </FetchErrorBoundary>
      </AdminPageContainer>
    </div>
  );
}
