/* tslint:disable */
/* eslint-disable */

/**
 *
 * @export
 * @interface UserUpdateRequest
 */
export interface UserUpdateRequest {
  /**
   *
   * @type {string}
   * @memberof UserUpdateRequest
   */
  name?: string;
  /**
   *
   * @type {string}
   * @memberof UserUpdateRequest
   */
  type?: UserUpdateRequestType;
  /**
   *
   * @type {string}
   * @memberof UserUpdateRequest
   */
  status?: UserUpdateRequestStatus;
  /**
   *
   * @type {number}
   * @memberof UserUpdateRequest
   */
  generationNumber?: number;
}

export const UserUpdateRequestType = {
  Student: 'STUDENT',
  Teacher: 'TEACHER',
} as const;

export type UserUpdateRequestType =
  (typeof UserUpdateRequestType)[keyof typeof UserUpdateRequestType];
export const UserUpdateRequestStatus = {
  Activate: 'ACTIVATE',
  Deactivate: 'DEACTIVATE',
} as const;

export type UserUpdateRequestStatus =
  (typeof UserUpdateRequestStatus)[keyof typeof UserUpdateRequestStatus];
