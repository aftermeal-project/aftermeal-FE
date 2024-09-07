import Skeleton from 'react-loading-skeleton';
import SkeletonActivityLocation from './SkeletonActivityLocation';

export default function ActivityLocationListSkeleton() {
  return (
    <section>
      <Skeleton width="full" height={42} className="mb-4" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array(6)
          .fill(0)
          .map(() => (
            <SkeletonActivityLocation key={crypto.randomUUID()} />
          ))}
      </div>
    </section>
  );
}
