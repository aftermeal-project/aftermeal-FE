import moment from 'moment';

export default function SkeletonList() {
  const getToday = () => {
    return moment().format('YYYY년 MM월 DD일 dddd');
  };

  return (
    <div>
      <div className="flex items-center justify-between mt-5 mb-40">
        <div className="p-2 bg-green-400 rounded-md w-fit">
          <h1 className="text-[19px] font-bold tracking-tighter text-white">
            {getToday()}
          </h1>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="inline-block w-8 h-8 border-4 border-blue-500 rounded-full spinner-border animate-spin border-t-transparent"></div>
        <p className="mt-2 text-gray-600">활동을 가져오는 중...</p>
      </div>
    </div>
  );
}
