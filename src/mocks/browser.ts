import { setupWorker } from 'msw/browser';
import { authHandlers } from './auth.handler';
import { userHandlers } from './users.handler';
import { activityDetailsHandler } from './activity-details.handlers';
import { participationsHandlers } from './participations.handlers';
import { adminParticipationsHandlers } from './admin.participations.handlers';
import { activityHandlers } from './activities.handlers';

export const worker = setupWorker(
  ...authHandlers,
  ...userHandlers,
  ...activityHandlers,
  ...activityDetailsHandler,
  ...participationsHandlers,
  ...adminParticipationsHandlers,
);
