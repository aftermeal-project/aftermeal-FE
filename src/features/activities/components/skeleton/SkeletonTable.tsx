import Skeleton from 'react-loading-skeleton';

export default function SkeletonTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1600px] table-auto border-collapse border border-gray-200 shadow-md">
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
                <Skeleton width={120} height={29} />
              </td>
              <td className="px-2 py-2 border border-gray-200">
                <Skeleton width={120} height={29} />
              </td>
              <td className="px-2 py-2 border border-gray-200">
                <Skeleton width={120} height={29} />
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
              <td className="px-2 py-2 border border-gray-200">
                <Skeleton width={120} height={29} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
