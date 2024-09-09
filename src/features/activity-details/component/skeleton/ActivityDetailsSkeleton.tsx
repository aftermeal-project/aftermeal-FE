import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function ActivityDetailSkeleton() {
  return (
    <div className="grid w-full max-w-screen-xl grid-cols-1 gap-6 px-4 py-8 mx-auto rounded-lg md:grid-cols-3">
      <div className="p-6 bg-white rounded-md shadow-md md:col-span-2">
        <div className="flex items-center justify-between mb-9">
          <h1 className="text-3xl font-bold">
            <Skeleton width={200} />
          </h1>
          <span className="px-4 py-2 rounded-full">
            <Skeleton width={100} height={40} />
          </span>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex items-center space-x-3">
            <Skeleton circle width={24} height={24} />
            <Skeleton width={150} />
          </div>
          <div className="flex items-center space-x-3">
            <Skeleton circle width={24} height={24} />
            <Skeleton width={150} />
          </div>
          <div className="flex items-center space-x-3">
            <Skeleton circle width={24} height={24} />
            <Skeleton width={150} />
          </div>
          <div className="flex items-center space-x-3">
            <Skeleton circle width={24} height={24} />
            <Skeleton width={150} />
          </div>
        </div>
        <div className="mt-20">
          <h2 className="mb-3 text-xl font-semibold">
            <Skeleton width={150} />
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="flex items-center p-4 space-x-4 bg-white border rounded-lg shadow-sm"
                >
                  <Skeleton circle width={40} height={40} />
                  <div>
                    <p className="text-lg font-medium">
                      <Skeleton width={100} />
                    </p>
                    <p className="text-sm text-gray-500">
                      <Skeleton width={80} />
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="h-80 rounded-lg bg-white p-6 shadow-md md:h-[23rem]">
        <h2 className="mb-3 text-xl font-semibold">
          <Skeleton width={150} />
        </h2>
        <div className="flex flex-col space-y-4">
          <div>
            <Skeleton width={200} />
            <div>
              <Skeleton width={250} />
            </div>
          </div>
          <div>
            <Skeleton width={200} />
            <Skeleton width={250} />
          </div>
          <div className="mt-11">
            <Skeleton width="100%" height={40} />
          </div>
        </div>
      </div>
    </div>
  );
}
