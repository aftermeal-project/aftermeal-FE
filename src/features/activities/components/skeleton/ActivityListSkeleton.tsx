import { SkeletonList, SkeletonTable } from '../skeleton';

type SkeletonType = 'List' | 'Table';

interface ActivityListSkeletonProps {
  type: SkeletonType;
}

export default function ActivityListSkeleton({
  type,
}: ActivityListSkeletonProps) {
  return (
    <>
      {type === 'List' && <SkeletonList />}
      {type === 'Table' && <SkeletonTable />}
    </>
  );
}
