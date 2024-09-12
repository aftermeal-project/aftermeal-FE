import { typeOptions } from '../features/activities/constants/options';

export default function getTypeLabel(type: string) {
  const typeOption = typeOptions.find(option => option.value === type);
  return typeOption ? typeOption.label : type;
}
