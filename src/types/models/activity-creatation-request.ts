/* tslint:disable */
/* eslint-disable */

/**
 *
 * @export
 * @interface ActivityCreatationRequest
 */
export interface ActivityCreatationRequest {
  /**
   *
   * @type {string}
   * @memberof ActivityCreatationRequest
   */
  name?: string;
  /**
   *
   * @type {number}
   * @memberof ActivityCreatationRequest
   */
  maxParticipants?: number;
  /**
   *
   * @type {string}
   * @memberof ActivityCreatationRequest
   */
  location?: ActivityCreatationRequestLocation;
}

export const ActivityCreatationRequestLocation = {
  Auditorium: 'AUDITORIUM',
  Ground: 'GROUND',
} as const;

export type ActivityCreatationRequestLocation =
  (typeof ActivityCreatationRequestLocation)[keyof typeof ActivityCreatationRequestLocation];
