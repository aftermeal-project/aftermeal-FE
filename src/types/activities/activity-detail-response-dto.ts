/* tslint:disable */
/* eslint-disable */
/**
 * AfterMeal API Admin Docs
 * 에프터밀 관리자 API 엔드포인트(Endpoint)와 객체 정보, 파라미터, 요청 및 응답 예제를 살펴보세요.
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

// May contain unused imports in some cases
// @ts-ignore
import type { ActivityDetailResponseDtoParticipationsInner } from './activity-detail-response-dto-participations-inner';

/**
 *
 * @export
 * @interface ActivityDetailResponseDto
 */
export interface ActivityDetailResponseDto {
  /**
   *
   * @type {number}
   * @memberof ActivityDetailResponseDto
   */
  id: number;
  /**
   *
   * @type {string}
   * @memberof ActivityDetailResponseDto
   */
  title: string;
  /**
   *
   * @type {number}
   * @memberof ActivityDetailResponseDto
   */
  maxParticipants: number;
  /**
   *
   * @type {string}
   * @memberof ActivityDetailResponseDto
   */
  location?: string;
  /**
   *
   * @type {string}
   * @memberof ActivityDetailResponseDto
   */
  type: ActivityDetailResponseDtoType;
  /**
   *
   * @type {string}
   * @memberof ActivityDetailResponseDto
   */
  scheduledDate: string;
  /**
   *
   * @type {string}
   * @memberof ActivityDetailResponseDto
   */
  applicationStartAt: string;
  /**
   *
   * @type {string}
   * @memberof ActivityDetailResponseDto
   */
  applicationEndAt: string;
  /**
   *
   * @type {Array<ActivityDetailResponseDtoParticipationsInner>}
   * @memberof ActivityDetailResponseDto
   */
  participations: Array<ActivityDetailResponseDtoParticipationsInner>;
}

export const ActivityDetailResponseDtoType = {
  Lunch: 'LUNCH',
  Dinner: 'DINNER',
} as const;

export type ActivityDetailResponseDtoType =
  (typeof ActivityDetailResponseDtoType)[keyof typeof ActivityDetailResponseDtoType];
