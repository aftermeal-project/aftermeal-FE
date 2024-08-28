/* tslint:disable */
/* eslint-disable */

/**
 *
 * @export
 * @interface ActivityScheduleStatusUpdate
 */
export interface ActivityScheduleStatusUpdate {
  /**
   *
   * @type {string}
   * @memberof ActivityScheduleStatusUpdate
   */
  status?: ActivityScheduleStatusUpdateStatus;
}

export const ActivityScheduleStatusUpdateStatus = {
  Scheduled: 'SCHEDULED',
  InProgress: 'IN_PROGRESS',
  Canceled: 'CANCELED',
  Completed: 'COMPLETED',
} as const;

export type ActivityScheduleStatusUpdateStatus =
  (typeof ActivityScheduleStatusUpdateStatus)[keyof typeof ActivityScheduleStatusUpdateStatus];
