import { setupWorker } from 'msw/browser';
import { authHandlers } from './auth.handler';
import { userHandlers } from './users.handler';
import { activitiesHandlers } from './activities.handlers';
import { activityLocationsHandlers } from './activity-locations.handlers';

export const worker = setupWorker(
  ...authHandlers,
  ...userHandlers,
  ...activitiesHandlers,
  ...activityLocationsHandlers,
);
