import SkeletonActivityCard from './SkeletonActivityCard';

export default function ActivityListSkeleton() {
  return (
    <>
      {Array.from({ length: 8 }).map(() => (
        <SkeletonActivityCard key={crypto.randomUUID()} />
      ))}
    </>
  );
}
