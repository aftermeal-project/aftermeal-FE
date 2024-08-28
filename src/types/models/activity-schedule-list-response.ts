/* tslint:disable */
/* eslint-disable */

/**
 *
 * @export
 * @interface ActivityScheduleListResponse
 */
export interface ActivityScheduleListResponse {
  /**
   *
   * @type {number}
   * @memberof ActivityScheduleListResponse
   */
  activityScheduleId?: number;
  /**
   *
   * @type {string}
   * @memberof ActivityScheduleListResponse
   */
  name?: string;
  /**
   *
   * @type {number}
   * @memberof ActivityScheduleListResponse
   */
  maxParticipants?: number;
  /**
   *
   * @type {number}
   * @memberof ActivityScheduleListResponse
   */
  currentParticipants?: number;
  /**
   *
   * @type {string}
   * @memberof ActivityScheduleListResponse
   */
  status?: ActivityScheduleListResponseStatus;
  /**
   *
   * @type {string}
   * @memberof ActivityScheduleListResponse
   */
  type?: ActivityScheduleListResponseType;
  /**
   *
   * @type {string}
   * @memberof ActivityScheduleListResponse
   */
  scheduledDate?: string;
}

export const ActivityScheduleListResponseStatus = {
  Scheduled: 'SCHEDULED',
  InProgress: 'IN_PROGRESS',
  Canceled: 'CANCELED',
  Completed: 'COMPLETED',
} as const;

export type ActivityScheduleListResponseStatus =
  (typeof ActivityScheduleListResponseStatus)[keyof typeof ActivityScheduleListResponseStatus];
export const ActivityScheduleListResponseType = {
  Lunch: 'LUNCH',
  Dinner: 'DINNER',
} as const;

export type ActivityScheduleListResponseType =
  (typeof ActivityScheduleListResponseType)[keyof typeof ActivityScheduleListResponseType];
