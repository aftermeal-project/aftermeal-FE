import {
  FaMapMarkerAlt,
  FaUserFriends,
  FaChartBar,
  FaCalendarAlt,
  FaClock,
  FaTags,
} from 'react-icons/fa';
import { HeaderCell } from '../';

export default function TableHeader() {
  return (
    <thead>
      <tr className="border-b border-gray-200">
        <HeaderCell text="일정일" icon={FaTags} />
        <HeaderCell text="활동명" icon={FaMapMarkerAlt} />
        <HeaderCell text="장소" icon={FaUserFriends} />
        <HeaderCell text="활동 유형" icon={FaChartBar} />
        <HeaderCell text="진행 상태" icon={FaTags} />
        <HeaderCell text="신청 시작" icon={FaCalendarAlt} />
        <HeaderCell text="신청 마감" icon={FaClock} />
        <HeaderCell text="참여 현황" icon={FaClock} />
      </tr>
    </thead>
  );
}
