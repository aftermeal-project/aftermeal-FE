import {
  FaIdBadge,
  FaTools,
  FaUsers,
  FaMapMarkerAlt,
  FaCog,
} from 'react-icons/fa';

export default function TableHeader() {
  return (
    <thead>
      <tr className="bg-gray-100">
        <th className="w-20 px-2 py-2 text-left border border-gray-200">
          <div className="flex items-center">
            <FaIdBadge className="mr-1" />
            ID
          </div>
        </th>
        <th className="px-2 py-2 text-left border border-gray-200 w-60 min-w-36">
          <div className="flex items-center">
            <FaTools className="mr-2" />
            이름
          </div>
        </th>
        <th className="px-2 py-2 text-left border border-gray-200 w-60">
          <div className="flex items-center">
            <FaUsers className="mr-2" />
            최대 참가자 수
          </div>
        </th>
        <th className="w-56 px-2 py-2 text-left border border-gray-200 min-w-40">
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
  );
}
