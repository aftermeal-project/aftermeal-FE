import { setupWorker } from 'msw/browser';
import { authHandlers } from './auth/auth.handler';
import { userHandlers } from './users/users.handler';
import { adminUsersHandlers } from './users/admin.users.handlers';
import { activitiesHandlers } from './activities/activities.handlers';
import { adminActivitiesHandlers } from './activities/admin.activities.handlers';
import { adminActivityLocationsHandlers } from './activity-locations/admin.activity-locations.handlers';
import { activityDetailsHandler } from './activity-details/activity-details.handlers';
import { adminActivityDetailsHandler } from './activity-details/admin.activity-details.handlers';

export const worker = setupWorker(
  ...authHandlers,
  ...userHandlers,
  ...adminUsersHandlers,
  ...activitiesHandlers,
  ...adminActivitiesHandlers,
  ...activityDetailsHandler,
  ...adminActivityDetailsHandler,
  ...adminActivityLocationsHandlers,
);
