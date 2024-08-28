/* tslint:disable */
/* eslint-disable */

/**
 *
 * @export
 * @interface ActivityUpdateRequest
 */
export interface ActivityUpdateRequest {
  /**
   *
   * @type {string}
   * @memberof ActivityUpdateRequest
   */
  name?: string;
  /**
   *
   * @type {number}
   * @memberof ActivityUpdateRequest
   */
  maxParticipants?: number;
  /**
   *
   * @type {string}
   * @memberof ActivityUpdateRequest
   */
  location?: ActivityUpdateRequestLocation;
}

export const ActivityUpdateRequestLocation = {
  Auditorium: 'AUDITORIUM',
  Ground: 'GROUND',
} as const;

export type ActivityUpdateRequestLocation =
  (typeof ActivityUpdateRequestLocation)[keyof typeof ActivityUpdateRequestLocation];
