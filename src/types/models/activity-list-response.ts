/* tslint:disable */
/* eslint-disable */

/**
 *
 * @export
 * @interface ActivityListResponse
 */
export interface ActivityListResponse {
  /**
   *
   * @type {number}
   * @memberof ActivityListResponse
   */
  id?: number;
  /**
   *
   * @type {string}
   * @memberof ActivityListResponse
   */
  name?: string;
  /**
   *
   * @type {string}
   * @memberof ActivityListResponse
   */
  location?: ActivityListResponseLocation;
  /**
   *
   * @type {number}
   * @memberof ActivityListResponse
   */
  maxParticipants?: number;
}

export const ActivityListResponseLocation = {
  Auditorium: 'AUDITORIUM',
  Ground: 'GROUND',
} as const;

export type ActivityListResponseLocation =
  (typeof ActivityListResponseLocation)[keyof typeof ActivityListResponseLocation];
