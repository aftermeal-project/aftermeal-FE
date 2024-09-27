export default function AdminActivityDetailsSkeleton() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="spinner-border inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        <p className="mt-2 text-gray-600">활동 상세 정보를 가져오는 중...</p>
      </div>
    </div>
  );
}
