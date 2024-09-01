import Skeleton from 'react-loading-skeleton';

export default function SkeletonTable() {
  return (
    <div className="h-full overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">활동 관리</h1>
        <button className="rounded-md bg-green-500 px-3 py-[0.4rem] text-white">
          활동 추가
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[950px] table-auto border-collapse border border-gray-200 shadow-md">
          <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index}>
                <td className="px-2 py-2 border border-gray-200">
                  <Skeleton width={60} height={29} />
                </td>
                <td className="px-2 py-2 border border-gray-200">
                  <Skeleton width={120} height={29} />
                </td>
                <td className="px-2 py-2 border border-gray-200">
                  <Skeleton width={100} height={29} />
                </td>
                <td className="px-2 py-2 border border-gray-200">
                  <Skeleton width={150} height={29} />
                </td>
                <td className="px-2 py-2 border border-gray-200">
                  <Skeleton width={200} height={29} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
