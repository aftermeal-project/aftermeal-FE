export default function ActivityListSkeleton() {
  return (
    <>
      {Array.from({ length: 8 }).map(() => (
        <s key={crypto.randomUUID()} />
      ))}
    </>
  );
}
