import { statusOptions } from '../features/activities/constants/options';

export default function getStatusLabel(status: string) {
  const statusOption = statusOptions.find(option => option.value === status);
  return statusOption ? statusOption.label : status;
}
