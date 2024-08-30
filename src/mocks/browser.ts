import { setupWorker } from 'msw/browser';
import { authHandlers } from './auth.handler';
import { userHandlers } from './user.handler';
import { activitiesHandlers } from './activities';
import { activitySchedulesHandlers } from './activity-schedules';

export const worker = setupWorker(
  ...authHandlers,
  ...userHandlers,
  ...activitiesHandlers,
  ...activitySchedulesHandlers,
);
