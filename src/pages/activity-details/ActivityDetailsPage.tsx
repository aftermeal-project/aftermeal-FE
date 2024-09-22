import { Suspense } from 'react';
import { ErrorFallback, ErrorBoundary, SEOHelmet } from '../../components';
import {
  ActivityDetailsFetcher,
  ActivityDetails,
  ActivityDetailsSkeleton,
  AdminActivityDetails,
} from '../../features/activity-details/component';
import { useLocation } from 'react-router-dom';

export default function ActivityDetailsPage() {
  const location = useLocation();
  const isAdminPage = location.pathname.includes('/admin');

  return (
    <>
      <SEOHelmet
        title={isAdminPage ? '활동 상세 페이지' : '참가 신청'}
        description={
          isAdminPage
            ? '관리자용 활동 상세 페이지입니다.'
            : '지금 바로 활동 참가 신청을 완료하세요!'
        }
        url={location.pathname}
      />
      <ErrorBoundary Fallback={ErrorFallback}>
        <Suspense fallback={<ActivityDetailsSkeleton />}>
          <ActivityDetailsFetcher>
            {activityDetails => (
              <>
                {isAdminPage ? (
                  <AdminActivityDetails activity={activityDetails} />
                ) : (
                  <ActivityDetails activity={activityDetails} />
                )}
              </>
            )}
          </ActivityDetailsFetcher>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
