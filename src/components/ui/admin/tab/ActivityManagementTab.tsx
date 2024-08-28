import React, { useState } from 'react';
import {
  FaIdBadge,
  FaMapMarkerAlt,
  FaUsers,
  FaTools,
  FaCog,
  FaEdit,
  FaTrashAlt,
} from 'react-icons/fa';

type Activity = {
  id: number;
  name: string;
  location: string;
  participants: number;
  maxParticipants: number;
  status: 'planned' | 'ongoing' | 'completed';
};

type ActivityManagementTabProps = {
  activities: Activity[];
};

export default function ActivityManagementTab({
  activities,
}: ActivityManagementTabProps) {
  const [activeId, setActiveId] = useState<number | null>(null);

  const handleManage = (id: number) => {
    // Toggle the activeId to show/hide management options
    setActiveId(prevId => (prevId === id ? null : id));
  };

  const handleEdit = (id: number) => {
    console.log(`활동 수정 ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    console.log(`활동 삭제 ID: ${id}`);
  };

  return (
    <div className="h-full overflow-hidden">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">활동 관리</h1>
        <button className="rounded-md bg-green-500 px-3 py-[0.4rem] text-white">
          활동 추가
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[950px] table-auto border-collapse border border-gray-200 shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="w-20 border border-gray-200 px-2 py-2 text-left">
                <div className="flex items-center">
                  <FaIdBadge className="mr-2" />
                  ID
                </div>
              </th>
              <th className="w-60 min-w-36 border border-gray-200 px-4 py-2 text-left">
                <div className="flex items-center">
                  <FaTools className="mr-2" />
                  이름
                </div>
              </th>
              <th className="w-60 border border-gray-200 px-2 py-2 text-left">
                <div className="flex items-center">
                  <FaUsers className="mr-2" />
                  최대 참가자 수
                </div>
              </th>
              <th className="w-56 min-w-40 border border-gray-200 px-4 py-2 text-left">
                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-2" />
                  장소
                </div>
              </th>
              <th className="min-w-[270px] border border-gray-200 px-4 py-2 text-left">
                <div className="flex items-center">
                  <FaCog className="mr-2" />
                  관리
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {activities.map(activity => (
              <tr key={activity.id}>
                <td className="border border-gray-200 px-2 py-2">
                  {activity.id}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {activity.name}
                </td>
                <td className="border border-gray-200 px-4 py-2 text-left">
                  {activity.maxParticipants}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {activity.location}
                </td>

                <td className="border border-gray-200 px-4 py-2 text-center">
                  <div className="flex items-center gap-x-2">
                    <button
                      onClick={() => handleManage(activity.id)}
                      className="flex items-center justify-center gap-x-2 rounded-md bg-gray-500 px-3 py-1 text-sm font-semibold text-white shadow hover:bg-gray-600"
                    >
                      <FaCog className="text-white" />
                      관리
                    </button>
                    {activeId === activity.id && (
                      <>
                        <button
                          onClick={() => handleEdit(activity.id)}
                          className="flex items-center gap-x-2 rounded-md bg-yellow-500 px-3 py-1 text-sm font-semibold text-white shadow hover:bg-yellow-600"
                        >
                          <FaEdit className="text-white" />
                          수정
                        </button>
                        <button
                          onClick={() => handleDelete(activity.id)}
                          className="flex items-center gap-x-2 rounded-md bg-red-500 px-3 py-1 text-sm font-semibold text-white shadow hover:bg-red-600"
                        >
                          <FaTrashAlt className="text-white" />
                          삭제
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
