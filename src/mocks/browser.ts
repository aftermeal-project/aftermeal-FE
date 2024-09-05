import { setupWorker } from 'msw/browser';
import { authHandlers } from './auth/auth.handler';
import { userHandlers } from './users/users.handler';
import { adminUsersHandlers } from './users/admin.users.handlers';
import { activitiesHandlers } from './activities/activities.handlers';
import { adminActivitiesHandlers } from './activities/admin.activities.handlers';
import { adminActivityLocationsHandlers } from './activity-locations/admin.activity-locations.handlers';

export const worker = setupWorker(
  ...authHandlers,
  ...userHandlers,
  ...adminUsersHandlers,
  ...activitiesHandlers,
  ...adminActivitiesHandlers,
  ...adminActivityLocationsHandlers,
);
