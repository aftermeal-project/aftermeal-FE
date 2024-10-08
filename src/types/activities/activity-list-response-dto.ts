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
 * @interface ActivityListResponseDto
 */
export interface ActivityListResponseDto {
  /**
   *
   * @type {number}
   * @memberof ActivityListResponseDto
   */
  id: number;
  /**
   *
   * @type {string}
   * @memberof ActivityListResponseDto
   */
  title: string;
  /**
   *
   * @type {number}
   * @memberof ActivityListResponseDto
   */
  activityLocationId?: number;
  /**
   *
   * @type {string}
   * @memberof ActivityListResponseDto
   */
  location?: string;
  /**
   *
   * @type {number}
   * @memberof ActivityListResponseDto
   */
  maxParticipants: number;
  /**
   *
   * @type {number}
   * @memberof ActivityListResponseDto
   */
  currentParticipants: number;
  /**
   *
   * @type {string}
   * @memberof ActivityListResponseDto
   */
  status: ActivityListResponseDtoStatus;
  /**
   *
   * @type {string}
   * @memberof ActivityListResponseDto
   */
  type: ActivityListResponseDtoType;
  /**
   *
   * @type {string}
   * @memberof ActivityListResponseDto
   */
  scheduledDate: string;
  /**
   *
   * @type {string}
   * @memberof ActivityListResponseDto
   */
  applicationStartDate: string;
  /**
   *
   * @type {string}
   * @memberof ActivityListResponseDto
   */
  applicationEndDate: string;
}

export const ActivityListResponseDtoStatus = {
  Scheduled: 'SCHEDULED',
  InProgress: 'IN_PROGRESS',
  Canceled: 'CANCELED',
  Completed: 'COMPLETED',
} as const;

export type ActivityListResponseDtoStatus =
  (typeof ActivityListResponseDtoStatus)[keyof typeof ActivityListResponseDtoStatus];
export const ActivityListResponseDtoType = {
  Lunch: 'LUNCH',
  Dinner: 'DINNER',
} as const;

export type ActivityListResponseDtoType =
  (typeof ActivityListResponseDtoType)[keyof typeof ActivityListResponseDtoType];
