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
import type { ActivityDetailResponseDtoParticipationsInnerUser } from './activity-detail-response-dto-participations-inner-user';

/**
 * 
 * @export
 * @interface ActivityDetailResponseDtoParticipationsInner
 */
export interface ActivityDetailResponseDtoParticipationsInner {
    /**
     * 
     * @type {number}
     * @memberof ActivityDetailResponseDtoParticipationsInner
     */
    'id': number;
    /**
     * 
     * @type {ActivityDetailResponseDtoParticipationsInnerUser}
     * @memberof ActivityDetailResponseDtoParticipationsInner
     */
    'user': ActivityDetailResponseDtoParticipationsInnerUser;
}

