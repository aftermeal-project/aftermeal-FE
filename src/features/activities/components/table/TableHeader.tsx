import {
  FaUsers,
  FaMapMarkerAlt,
  FaCog,
  FaCalendar,
  FaCalendarDay,
  FaCheckCircle,
  FaClock,
  FaSocks,
} from 'react-icons/fa';
import HeaderCell from '../cell/HeaderCell';

export default function TableHeader() {
  return (
    <thead>
      <tr className="w-fit bg-gray-100">
        <HeaderCell icon={FaSocks} text="활동명" />
        <HeaderCell icon={FaMapMarkerAlt} text="장소" />
        <HeaderCell icon={FaUsers} text="참여 현황" />
        <HeaderCell icon={FaUsers} text="최대 참가자" />
        <HeaderCell icon={FaCheckCircle} text="진행 상태" />
        <HeaderCell icon={FaCalendar} text="세션 유형" />
        <HeaderCell icon={FaCalendarDay} text="일정" />
        <HeaderCell icon={FaClock} text="신청 시작" />
        <HeaderCell icon={FaClock} text="신청 마감" />
        <HeaderCell icon={FaCog} text="관리" />
      </tr>
    </thead>
  );
}
