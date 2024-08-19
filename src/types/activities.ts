import { BaseResponse } from './base';

export interface GetActivitiesResponse extends BaseResponse {
  data: {
    activities: Activity[];
  };
}

export interface Activity {
  id: number;
  name: string;
  maxParticipants: number;
  currentParticipants: number;
}
