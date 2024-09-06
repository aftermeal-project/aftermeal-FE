import Skeleton from 'react-loading-skeleton';
import SkeletonUser from './SkeletonUser';

export default function UserListSkeleton() {
  return (
    <section>
      <Skeleton width="full" height={42} className="mb-4" />
      <div className="w-full px-6 py-3 bg-white border border-gray-200 rounded-lg shadow">
        <div className="flow-root">
          <ul className="divide-y divide-gray-200">
            {Array.from({ length: 8 }).map(() => (
              <SkeletonUser key={crypto.randomUUID()} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
