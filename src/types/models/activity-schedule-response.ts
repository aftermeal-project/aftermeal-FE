/* tslint:disable */
/* eslint-disable */

// May contain unused imports in some cases
// @ts-ignore
import type { ActivityScheduleResponseParticipantsInner } from './activity-schedule-response-participants-inner';

/**
 *
 * @export
 * @interface ActivityScheduleResponse
 */
export interface ActivityScheduleResponse {
  /**
   *
   * @type {number}
   * @memberof ActivityScheduleResponse
   */
  activityScheduleId?: number;
  /**
   *
   * @type {string}
   * @memberof ActivityScheduleResponse
   */
  name?: string;
  /**
   *
   * @type {number}
   * @memberof ActivityScheduleResponse
   */
  maxParticipants?: number;
  /**
   *
   * @type {string}
   * @memberof ActivityScheduleResponse
   */
  status?: ActivityScheduleResponseStatus;
  /**
   *
   * @type {string}
   * @memberof ActivityScheduleResponse
   */
  type?: ActivityScheduleResponseType;
  /**
   *
   * @type {string}
   * @memberof ActivityScheduleResponse
   */
  scheduledDate?: string;
  /**
   *
   * @type {Array<ActivityScheduleResponseParticipantsInner>}
   * @memberof ActivityScheduleResponse
   */
  participants?: Array<ActivityScheduleResponseParticipantsInner>;
}

export const ActivityScheduleResponseStatus = {
  Scheduled: 'SCHEDULED',
  InProgress: 'IN_PROGRESS',
  Canceled: 'CANCELED',
  Completed: 'COMPLETED',
} as const;

export type ActivityScheduleResponseStatus =
  (typeof ActivityScheduleResponseStatus)[keyof typeof ActivityScheduleResponseStatus];
export const ActivityScheduleResponseType = {
  Lunch: 'LUNCH',
  Dinner: 'DINNER',
} as const;

export type ActivityScheduleResponseType =
  (typeof ActivityScheduleResponseType)[keyof typeof ActivityScheduleResponseType];
