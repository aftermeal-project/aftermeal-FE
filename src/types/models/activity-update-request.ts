/* tslint:disable */
/* eslint-disable */
/**
 * Aftermeal API Docs
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
 * @interface ActivityUpdateRequest
 */
export interface ActivityUpdateRequest {
    /**
     * 
     * @type {string}
     * @memberof ActivityUpdateRequest
     */
    'name'?: string;
    /**
     * 
     * @type {number}
     * @memberof ActivityUpdateRequest
     */
    'maxParticipants'?: number;
    /**
     * 
     * @type {string}
     * @memberof ActivityUpdateRequest
     */
    'location'?: ActivityUpdateRequestLocation;
}

export const ActivityUpdateRequestLocation = {
    Auditorium: 'AUDITORIUM',
    Ground: 'GROUND'
} as const;

export type ActivityUpdateRequestLocation = typeof ActivityUpdateRequestLocation[keyof typeof ActivityUpdateRequestLocation];


