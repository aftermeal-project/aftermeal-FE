import {
  FaUsers,
  FaMapMarkerAlt,
  FaCog,
  FaCalendar,
  FaCalendarDay,
  FaCheckCircle,
  FaClock,
  FaUser,
} from 'react-icons/fa';
import HeaderCell from './HeaderCell';

export default function TableHeader() {
  return (
    <thead>
      <tr className="bg-gray-100">
        <HeaderCell icon={FaUser} text="이름" />
        <HeaderCell icon={FaMapMarkerAlt} text="장소" />
        <HeaderCell icon={FaUsers} text="참여 현황" />
        <HeaderCell icon={FaCheckCircle} text="진행 상태" />
        <HeaderCell icon={FaCalendar} text="세션 유형" />
        <HeaderCell icon={FaCalendarDay} text="일정 날짜" />
        <HeaderCell icon={FaClock} text="시작 시간" />
        <HeaderCell icon={FaClock} text="종료 시간" />
        <HeaderCell icon={FaCog} text="관리" />
      </tr>
    </thead>
  );
}
