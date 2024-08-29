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
 * @interface ActivityScheduleStatusUpdate
 */
export interface ActivityScheduleStatusUpdate {
    /**
     * 
     * @type {string}
     * @memberof ActivityScheduleStatusUpdate
     */
    'status'?: ActivityScheduleStatusUpdateStatus;
}

export const ActivityScheduleStatusUpdateStatus = {
    Scheduled: 'SCHEDULED',
    InProgress: 'IN_PROGRESS',
    Canceled: 'CANCELED',
    Completed: 'COMPLETED'
} as const;

export type ActivityScheduleStatusUpdateStatus = typeof ActivityScheduleStatusUpdateStatus[keyof typeof ActivityScheduleStatusUpdateStatus];


