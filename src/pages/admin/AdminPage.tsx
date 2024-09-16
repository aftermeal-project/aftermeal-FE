import { useEffect, useState } from 'react';
import {
  AdminPageSidebar,
  ActivityManagementTab,
  UserManagementTab,
  ActivityLocationManagementTab,
  TabsContainer,
  ErrorFallback,
  ErrorBoundary,
  SEOHelmet,
} from '../../components';
import { Tab } from '../../types';
import { useRecoilValue } from 'recoil';
import { UserAtom } from '../../atoms';

export default function AdminPage() {
  const [selectedTab, setSelectedTab] = useState<Tab>('activities');
  const [roleError, setRoleError] = useState(false);
  const user = useRecoilValue(UserAtom);

  useEffect(() => {
    if (!user.roles.includes('ADMIN')) {
      setRoleError(false);
    }
  }, [user]);

  if (roleError) {
    return <ErrorFallback statusCode={403} />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <SEOHelmet
        title="어드민 페이지"
        description="어드민 페이지에서 사용자와 활동을 관리하고 업데이트하며 시스템 설정을 제어하세요."
        url="/admin"
      />
      <AdminPageSidebar
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <TabsContainer>
        <ErrorBoundary Fallback={ErrorFallback}>
          {selectedTab === 'activities' && <ActivityManagementTab />}
          {selectedTab === 'users' && <UserManagementTab />}
          {selectedTab === 'locations' && <ActivityLocationManagementTab />}
        </ErrorBoundary>
      </TabsContainer>
    </div>
  );
}
