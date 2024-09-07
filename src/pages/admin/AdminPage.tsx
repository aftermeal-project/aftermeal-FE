import { useEffect, useState } from 'react';
import { FetchErrorBoundary } from '../../components/@global';
import ErrorScreen from '../../components/error/ErrorScreen';
import {
  AdminPageSidebar,
  ActivityManagementTab,
  UserManagementTab,
  ActivityLocationManagementTab,
  TabsContainer,
} from '../../components/ui/admin';
import { errorMessages } from '../../constants';
import { Tab } from '../../types';
import { useRecoilValue } from 'recoil';
import { UserAtom } from '../../atoms';

export default function AdminPage() {
  const [selectedTab, setSelectedTab] = useState<Tab>('activities');
  const [roleError, setRoleError] = useState(false);
  const user = useRecoilValue(UserAtom);

  useEffect(() => {
    if (user.roles.includes('ADMIN')) {
      setRoleError(false);
    }
  }, [user]);

  if (roleError) {
    return <ErrorScreen title="권한 오류" description="잘못된 접근입니다." />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminPageSidebar
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <TabsContainer>
        <FetchErrorBoundary
          fallback={
            <ErrorScreen
              title="Oops!"
              description={errorMessages.DEFAULT_ERROR}
            />
          }
        >
          {selectedTab === 'activities' && <ActivityManagementTab />}
          {selectedTab === 'users' && <UserManagementTab />}
          {selectedTab === 'locations' && <ActivityLocationManagementTab />}
        </FetchErrorBoundary>
      </TabsContainer>
    </div>
  );
}
