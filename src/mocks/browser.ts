import { setupWorker } from 'msw/browser';
import { authHandlers } from './auth.handler';

export const worker = setupWorker(...authHandlers);
