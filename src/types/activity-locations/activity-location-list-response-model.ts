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

// May contain unused imports in some cases
// @ts-ignore
import type { ActivityLocationListResponseDto } from './activity-location-list-response-dto';

/**
 *
 * @export
 * @interface ActivityLocationListResponseModel
 */
export interface ActivityLocationListResponseModel {
  /**
   *
   * @type {boolean}
   * @memberof ActivityLocationListResponseModel
   */
  success?: boolean;
  /**
   *
   * @type {Array<ActivityLocationListResponseDto>}
   * @memberof ActivityLocationListResponseModel
   */
  data?: Array<ActivityLocationListResponseDto>;
}
