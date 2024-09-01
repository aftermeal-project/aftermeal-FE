import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function SkeletonCard() {
  return (
    <div className="overflow-hidden bg-white border rounded-lg shadow-md">
      <div className="p-4">
        <Skeleton height={24} width="100%" className="mb-4" />
        <Skeleton height={16} width="60%" className="mb-3" />
        <div className="relative w-full h-2 mb-3 bg-gray-200 rounded-full">
          <Skeleton
            className="absolute top-0 left-0 h-2 bg-gray-300 rounded-full"
            width="100%"
          />
        </div>
        <Skeleton height={24} width="100%" />
      </div>
    </div>
  );
}
