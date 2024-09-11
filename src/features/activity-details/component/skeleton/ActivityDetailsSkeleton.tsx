import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function ActivityDetailSkeleton() {
  return (
    <div className="mx-auto grid w-full max-w-screen-xl grid-cols-1 gap-x-4 gap-y-6 rounded-lg px-4 py-8 max-[1000px]:gap-x-0 max-[1000px]:gap-y-6 min-[1000px]:grid-cols-3">
      <div className="space-y-4 md:col-span-2">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-10">
            <h1 className="text-xl font-bold min-[530px]:text-2xl sm:text-3xl">
              <Skeleton width={300} />
            </h1>
            <span
              className={`rounded-full bg-gray-100 px-2 py-2 text-sm font-bold text-gray-800 min-[530px]:px-4`}
            >
              <Skeleton width={100} />
            </span>
          </div>
          <div className="grid grid-cols-1 gap-6 min-[1000px]:grid-cols-2">
            <div className="flex items-center space-x-3">
              <Skeleton
                circle={true}
                height={20}
                width={20}
                className="text-xl text-blue-500"
              />
              <span className="text-lg font-semibold">
                장소: <Skeleton width={150} />
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Skeleton
                circle={true}
                height={20}
                width={20}
                className="text-xl text-purple-500"
              />
              <span className="text-lg font-semibold">
                참가자: <Skeleton width={100} />
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-2xl font-semibold">
            <Skeleton width={120} />
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center p-4 space-x-4 border rounded-lg shadow-sm bg-gray-50"
              >
                <Skeleton circle={true} height={40} width={40} />
                <Skeleton width={100} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`h-[21rem] w-full rounded-lg bg-white p-6 shadow-md`}>
        <h2 className="mb-8 text-2xl font-semibold">
          <Skeleton width={120} />
        </h2>
        <div className="flex flex-col">
          <div>
            <div className="flex items-center">
              <Skeleton
                circle={true}
                height={20}
                width={20}
                className="inline-block mr-2 text-red-500"
              />
              <span className="text-lg font-semibold">장소</span>
            </div>
            <div className="text-gray-700">
              <Skeleton width={150} />
            </div>
          </div>
          <div className="mt-6">
            <div className="flex items-center">
              <Skeleton
                circle={true}
                height={20}
                width={20}
                className="inline-block mr-2 text-blue-500"
              />
              <span className="text-lg font-semibold">신청 기간:</span>
            </div>
            <div className="font-semibold text-gray-700">
              <Skeleton width={200} />
            </div>
          </div>

          <div className="mt-14">
            <Skeleton height={40} className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
