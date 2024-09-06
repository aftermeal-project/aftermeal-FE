import Skeleton from 'react-loading-skeleton';

export default function SkeletonUser() {
  return (
    <li className="flex items-center py-3 border-b border-gray-200">
      <div className="flex-1 min-w-0 pr-4">
        <Skeleton width={120} height={18} className="mb-2" />
        <Skeleton width={200} height={18} className="mb-1" />
        <Skeleton width={150} height={13} />
      </div>
      <div className="flex flex-col items-end my-auto space-y-2 text-md">
        <Skeleton width={80} height={18} />
        <Skeleton width={80} height={18} />
      </div>
    </li>
  );
}
