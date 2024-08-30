import SkeletonActivityScheduleCard from './SkeletonActivityScheduleCard';

export default function ActivitySchedulesList() {
  return (
    <>
      {Array.from({ length: 8 }).map(() => (
        <SkeletonActivityScheduleCard key={crypto.randomUUID()} />
      ))}
    </>
  );
}
