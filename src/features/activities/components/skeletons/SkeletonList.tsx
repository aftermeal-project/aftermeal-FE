import SkeletonCard from './SkeletonCard';

export default function SkeletonList() {
  return (
    <>
      {Array.from({ length: 8 }).map(() => (
        <SkeletonCard key={crypto.randomUUID()} />
      ))}
    </>
  );
}
