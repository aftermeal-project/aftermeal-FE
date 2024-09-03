import { setupWorker } from 'msw/browser';
import { authHandlers } from './auth.handler';
import { userHandlers } from './users.handler';
import { activitiesHandlers } from './activities.handlers';
import { adminActivitiesHandlers } from './admin.activities.handlers';
import { adminActivityLocationsHandlers } from './admin.activity-locations.handlers';

export const worker = setupWorker(
  ...authHandlers,
  ...userHandlers,
  ...activitiesHandlers,
  ...adminActivitiesHandlers,
  ...adminActivityLocationsHandlers,
);
