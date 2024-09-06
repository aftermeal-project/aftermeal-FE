import Skeleton from 'react-loading-skeleton';

export default function SkeletonUser() {
  return (
    <li className="flex items-center py-3 border-b border-gray-200">
      <div className="flex-1 min-w-0 pr-4">
        <Skeleton className="mb-2 font-bold text-md" />
        <Skeleton className="mb-1 font-medium text-md" />
        <Skeleton className="text-sm text-gray-500" />
      </div>
      <div className="flex flex-col items-end my-auto space-y-2 text-md">
        <Skeleton className="inline-flex items-center rounded-full px-4 py-[6px] text-xs font-medium" />
        <Skeleton className="inline-flex items-center rounded-full px-4 py-[6px] text-xs font-medium" />
      </div>
      <Skeleton className="w-5 h-5 ml-4" />
    </li>
  );
}
