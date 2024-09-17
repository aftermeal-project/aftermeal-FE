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



/**
 * 
 * @export
 * @interface ActivityDetailResponseDtoParticipationsInnerUser
 */
export interface ActivityDetailResponseDtoParticipationsInnerUser {
    /**
     * 
     * @type {number}
     * @memberof ActivityDetailResponseDtoParticipationsInnerUser
     */
    'id': number;
    /**
     * 
     * @type {string}
     * @memberof ActivityDetailResponseDtoParticipationsInnerUser
     */
    'name': string;
    /**
     * 
     * @type {string}
     * @memberof ActivityDetailResponseDtoParticipationsInnerUser
     */
    'type': ActivityDetailResponseDtoParticipationsInnerUserType;
    /**
     * 
     * @type {number}
     * @memberof ActivityDetailResponseDtoParticipationsInnerUser
     */
    'generationNumber'?: number;
}

export const ActivityDetailResponseDtoParticipationsInnerUserType = {
    Student: 'STUDENT',
    Teacher: 'TEACHER'
} as const;

export type ActivityDetailResponseDtoParticipationsInnerUserType = typeof ActivityDetailResponseDtoParticipationsInnerUserType[keyof typeof ActivityDetailResponseDtoParticipationsInnerUserType];


