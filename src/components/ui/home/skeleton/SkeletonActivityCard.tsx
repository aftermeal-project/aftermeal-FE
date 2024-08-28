import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function SkeletonActivityCard() {
  return (
    <div className="overflow-hidden rounded-lg border bg-white shadow-md">
      <div className="p-4">
        <Skeleton height={24} width="100%" className="mb-4" />
        <Skeleton height={16} width="60%" className="mb-3" />
        <div className="relative mb-3 h-2 w-full rounded-full bg-gray-200">
          <Skeleton
            className="absolute left-0 top-0 h-2 rounded-full bg-gray-300"
            width="100%"
          />
        </div>
        <Skeleton height={24} width="100%" />
      </div>
    </div>
  );
}
