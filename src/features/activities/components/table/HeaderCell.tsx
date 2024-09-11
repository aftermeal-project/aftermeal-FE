import { IconType } from 'react-icons';

interface HeaderCellProps {
  icon?: IconType;
  text: string;
}

export default function HeaderCell({ icon: Icon, text }: HeaderCellProps) {
  return (
    <th className="px-4 py-3 text-left text-gray-700">
      <div className="flex items-center">
        {Icon && <Icon className="mr-2" />}
        {text}
      </div>
    </th>
  );
}
