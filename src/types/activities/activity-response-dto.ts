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
 * @interface ActivityResponseDto
 */
export interface ActivityResponseDto {
  /**
   *
   * @type {number}
   * @memberof ActivityResponseDto
   */
  id: number;
  /**
   *
   * @type {string}
   * @memberof ActivityResponseDto
   */
  title: string;
  /**
   *
   * @type {string}
   * @memberof ActivityResponseDto
   */
  location: string;
  /**
   *
   * @type {number}
   * @memberof ActivityResponseDto
   */
  maxParticipants: number;
  /**
   *
   * @type {number}
   * @memberof ActivityResponseDto
   */
  currentParticipants: number;
  /**
   *
   * @type {string}
   * @memberof ActivityResponseDto
   */
  status: ActivityResponseDtoStatus;
  /**
   *
   * @type {string}
   * @memberof ActivityResponseDto
   */
  type: ActivityResponseDtoType;
  /**
   *
   * @type {string}
   * @memberof ActivityResponseDto
   */
  scheduledDate: string;
  /**
   *
   * @type {string}
   * @memberof ActivityResponseDto
   */
  applicationStartDate: string;
  /**
   *
   * @type {string}
   * @memberof ActivityResponseDto
   */
  applicationEndDate: string;
}

export const ActivityResponseDtoStatus = {
  Scheduled: 'SCHEDULED',
  InProgress: 'IN_PROGRESS',
  Canceled: 'CANCELED',
  Completed: 'COMPLETED',
} as const;

export type ActivityResponseDtoStatus =
  (typeof ActivityResponseDtoStatus)[keyof typeof ActivityResponseDtoStatus];
export const ActivityResponseDtoType = {
  Lunch: 'LUNCH',
  Dinner: 'DINNER',
} as const;

export type ActivityResponseDtoType =
  (typeof ActivityResponseDtoType)[keyof typeof ActivityResponseDtoType];
