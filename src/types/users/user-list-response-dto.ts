/* tslint:disable */
/* eslint-disable */
/**
 * AfterMeal API Docs
 * 에프터밀 API 엔드포인트(Endpoint)와 객체 정보, 파라미터, 요청 및 응답 예제를 살펴보세요.
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

/**
 *
 * @export
 * @interface UserListResponseDto
 */
export interface UserListResponseDto {
  /**
   *
   * @type {number}
   * @memberof UserListResponseDto
   */
  id: number;
  /**
   *
   * @type {string}
   * @memberof UserListResponseDto
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof UserListResponseDto
   */
  email?: string;
  /**
   *
   * @type {Array<string>}
   * @memberof UserListResponseDto
   */
  roles?: Array<UserListResponseDtoRoles>;
  /**
   *
   * @type {string}
   * @memberof UserListResponseDto
   */
  type: UserListResponseDtoType;
  /**
   *
   * @type {string}
   * @memberof UserListResponseDto
   */
  status?: UserListResponseDtoStatus;
  /**
   *
   * @type {number}
   * @memberof UserListResponseDto
   */
  generationNumber?: number;
}

export const UserListResponseDtoRoles = {
  User: 'USER',
  Admin: 'ADMIN',
} as const;

export type UserListResponseDtoRoles =
  (typeof UserListResponseDtoRoles)[keyof typeof UserListResponseDtoRoles];
export const UserListResponseDtoType = {
  Student: 'STUDENT',
  Teacher: 'TEACHER',
} as const;

export type UserListResponseDtoType =
  (typeof UserListResponseDtoType)[keyof typeof UserListResponseDtoType];
export const UserListResponseDtoStatus = {
  Activate: 'ACTIVATE',
  Deactivate: 'DEACTIVATE',
} as const;

export type UserListResponseDtoStatus =
  (typeof UserListResponseDtoStatus)[keyof typeof UserListResponseDtoStatus];
