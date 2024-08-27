type Activity = {
  id: number;
  name: string;
  participants: number;
  maxParticipants: number;
  status: 'planned' | 'ongoing' | 'completed';
};

type ActivityManagementProps = {
  activities: Activity[];
};

function ActivityManagement({ activities }: ActivityManagementProps) {
  const handleEdit = (id: number) => {
    console.log(`활동 수정 ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    console.log(`활동 삭제 ID: ${id}`);
  };

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">활동 관리</h1>
      <div className="space-y-4">
        {activities.map(activity => (
          <div
            key={activity.id}
            className="rounded-lg border border-gray-200 bg-white p-5 shadow-md"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">
                {activity.name}
              </h2>
              <div className="flex items-center gap-x-4">
                <button
                  onClick={() => handleEdit(activity.id)}
                  className="rounded-md bg-yellow-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-yellow-600"
                >
                  수정
                </button>
                <button
                  onClick={() => handleEdit(activity.id)}
                  className="rounded-md bg-yellow-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-yellow-600"
                >
                  상세 조회
                </button>
                <button
                  onClick={() => handleDelete(activity.id)}
                  className="rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-red-600"
                >
                  삭제
                </button>
              </div>
            </div>
            <div className="mt-2">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-lg font-bold text-gray-800">
                  {activity.participants} / {activity.maxParticipants}
                </span>
                <span
                  className={`text-lg font-semibold ${
                    activity.participants === activity.maxParticipants
                      ? 'text-red-500'
                      : 'text-green-500'
                  }`}
                >
                  {(
                    (activity.participants / activity.maxParticipants) *
                    100
                  ).toFixed(0)}
                  %
                </span>
              </div>
              <div className="relative h-4 w-full rounded-full bg-gray-200">
                <div
                  className={`absolute left-0 top-0 h-4 rounded-full ${
                    activity.participants === activity.maxParticipants
                      ? 'bg-red-500'
                      : 'bg-blue-500'
                  }`}
                  style={{
                    width: `${
                      (activity.participants / activity.maxParticipants) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <button className="mt-4 rounded-md bg-green-500 px-4 py-2 text-white">
          활동 추가
        </button>
      </div>
    </div>
  );
}

export default ActivityManagement;
