import Skeleton from 'react-loading-skeleton';

export default function SkeletonActivityLocation() {
  return (
    <div className="p-4 border rounded-md shadow-md">
      <Skeleton height={30} />
      <Skeleton height={20} width="60%" />
    </div>
  );
}
