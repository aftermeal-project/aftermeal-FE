import { ActivityListResponseDto } from '../../../../types';
import BodyCell from './BodyCell';
import { useNavigate } from 'react-router-dom';

interface TableBodyProps {
  activities: ActivityListResponseDto[];
}

export default function TableBody({ activities }: TableBodyProps) {
  const navigate = useNavigate();

  const handleActivityClick = (activityId: number) => {
    navigate('/admin/activity/' + String(activityId));
  };

  const calculatePercentage = (part: number, whole: number): string => {
    return '(' + ((part / whole) * 100).toFixed(2) + '%)';
  };

  return (
    <tbody>
      {Array.isArray(activities) &&
        activities.map(activity => (
          <tr
            key={activity.id}
            onClick={() => handleActivityClick(activity.id)}
            className="cursor-pointer border-b border-gray-200 hover:bg-gray-100"
          >
            <td className="px-4 py-2">
              <BodyCell title="scheduledDate" value={activity.scheduledDate} />
            </td>
            <td className="px-4 py-2">
              <BodyCell title="title" value={activity.title} />
            </td>
            <td className="px-4 py-2">
              <BodyCell title="location" value={String(activity.location)} />
            </td>
            <td className="px-4 py-2">
              <BodyCell title="type" value={activity.type} />
            </td>
            <td className="px-4 py-2">
              <BodyCell title="status" value={activity.status} />
            </td>
            <td className="px-4 py-2">
              <BodyCell
                title="applicationStartDate"
                value={activity.applicationStartDate}
              />
            </td>
            <td className="px-4 py-2">
              <BodyCell
                title="applicationEndDate"
                value={activity.applicationEndDate}
              />
            </td>
            <td className="px-4 py-2">
              <BodyCell
                title="maxParticipants"
                value={
                  activity.currentParticipants +
                  '/' +
                  activity.maxParticipants +
                  '명 ' +
                  calculatePercentage(
                    activity.currentParticipants,
                    activity.maxParticipants,
                  )
                }
              />
            </td>
          </tr>
        ))}
    </tbody>
  );
}
