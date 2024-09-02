import { IconType } from 'react-icons';

interface HeaderCellProps {
  icon: IconType;
  text: string;
}

export default function HeaderCell({ icon: Icon, text }: HeaderCellProps) {
  return (
    <th className="border border-gray-200 px-2 py-2 text-left">
      <div className="flex items-center">
        {Icon && <Icon className="mr-2" />}
        {text}
      </div>
    </th>
  );
}
